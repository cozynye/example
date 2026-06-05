#!/usr/bin/env node

/**
 * research.js - 자동 리서치 수집 스크립트
 *
 * 무료 API/RSS에서 SaaS/인디해커 관련 콘텐츠를 수집하여
 * research/collected/{날짜}/ 에 마크다운으로 저장합니다.
 *
 * 데이터 소스:
 * - HackerNews (Firebase API, 무료)
 * - Reddit r/SaaS, r/indiehackers (JSON, 무료)
 * - IndieHackers (RSS, 무료)
 * - ProductHunt (RSS, 무료)
 *
 * Usage: node scripts/research.js
 * Env:   RESEARCH_KEYWORDS="saas,indie" (선택)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ROOT = path.resolve(__dirname, '..');
const COLLECTED_DIR = path.join(ROOT, 'research', 'collected');
const INDEX_FILE = path.join(COLLECTED_DIR, '_index.json');

// 키워드 필터
const KEYWORDS = (process.env.RESEARCH_KEYWORDS ||
  'saas,micro-saas,indie,solo,revenue,side project,bootstrap,startup,' +
  'subscription,mrr,solopreneur,maker,ship,launch,profit,earning,' +
  'small business,freelance,automation,chrome extension,telegram bot'
).toLowerCase().split(',').map(k => k.trim());

const KOREAN_KEYWORDS = '소상공인,자영업,사이드프로젝트,수익화,구독,예약,자동화,1인개발,부업'.split(',');

// ─── Utilities ───

function today() {
  return new Date().toISOString().split('T')[0];
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
}

function httpGet(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const handler = url.startsWith('https') ? https : http;
    const req = handler.get(url, {
      headers: {
        'User-Agent': 'money-1-research/1.0 (github.com)',
        'Accept': 'application/json, text/xml, text/html'
      },
      timeout: 10000
    }, (res) => {
      // Follow redirects (최대 5회)
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        if (redirects >= 5) return reject(new Error('Too many redirects'));
        return httpGet(res.headers.location, redirects + 1).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function matchesKeywords(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return KEYWORDS.some(k => lower.includes(k));
}

function loadIndex() {
  try {
    return JSON.parse(fs.readFileSync(INDEX_FILE, 'utf-8'));
  } catch {
    return { urls: {}, lastRun: null };
  }
}

function pruneIndex(index) {
  const cutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  for (const [url, meta] of Object.entries(index.urls)) {
    if (meta.date < cutoff) delete index.urls[url];
  }
}

function saveIndex(index) {
  pruneIndex(index);
  index.lastRun = new Date().toISOString();
  fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2), 'utf-8');
}

function ensureDateDir() {
  const dir = path.join(COLLECTED_DIR, today());
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

// ─── HackerNews ───

async function fetchHackerNews() {
  console.log('📡 HackerNews 수집 중...');
  const items = [];

  try {
    const res = await httpGet('https://hacker-news.firebaseio.com/v0/topstories.json');
    if (res.status !== 200) return items;

    const ids = JSON.parse(res.data).slice(0, 50);

    // Fetch items in batches of 10
    for (let i = 0; i < ids.length; i += 10) {
      const batch = ids.slice(i, i + 10);
      const results = await Promise.allSettled(
        batch.map(id => httpGet(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
      );

      for (const result of results) {
        if (result.status !== 'fulfilled' || result.value.status !== 200) continue;
        try {
          const item = JSON.parse(result.value.data);
          if (item && item.title && matchesKeywords(item.title)) {
            items.push({
              title: item.title,
              url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
              score: item.score || 0,
              comments: item.descendants || 0,
              source: 'hackernews'
            });
          }
        } catch { /* skip malformed */ }
      }
    }
  } catch (e) {
    console.log(`  ⚠️ HN 수집 실패: ${e.message}`);
  }

  console.log(`  ✅ HN: ${items.length}개 관련 항목`);
  return items;
}

// ─── Reddit ───

async function fetchReddit() {
  console.log('📡 Reddit 수집 중...');
  const items = [];
  const subreddits = ['SaaS', 'indiehackers', 'smallbusiness', 'Entrepreneur', 'microsaas'];

  for (const sub of subreddits) {
    try {
      const res = await httpGet(`https://www.reddit.com/r/${sub}/hot.json?limit=25`);
      if (res.status !== 200) continue;

      const data = JSON.parse(res.data);
      if (!data.data || !data.data.children) continue;

      for (const child of data.data.children) {
        const post = child.data;
        if (!post || post.stickied) continue;

        const text = `${post.title} ${post.selftext || ''}`;
        if (matchesKeywords(text)) {
          items.push({
            title: post.title,
            url: `https://reddit.com${post.permalink}`,
            score: post.score || 0,
            comments: post.num_comments || 0,
            subreddit: sub,
            source: 'reddit'
          });
        }
      }
    } catch (e) {
      console.log(`  ⚠️ r/${sub} 실패: ${e.message}`);
    }

    // Rate limit: 1초 대기
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log(`  ✅ Reddit: ${items.length}개 관련 항목`);
  return items;
}

// ─── IndieHackers RSS ───

async function fetchIndieHackers() {
  console.log('📡 IndieHackers 수집 중...');
  const items = [];

  try {
    const res = await httpGet('https://www.indiehackers.com/feed.xml');
    if (res.status !== 200) return items;

    // Simple XML parsing (no deps)
    const entries = res.data.match(/<item>([\s\S]*?)<\/item>/g) || [];

    for (const entry of entries.slice(0, 15)) {
      const title = (entry.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/) || [])[1];
      const link = (entry.match(/<link>(.*?)<\/link>/) || [])[1];
      const desc = (entry.match(/<description>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/description>/) || [])[1];

      if (title) {
        items.push({
          title: title.trim(),
          url: link || '',
          description: desc ? desc.replace(/<[^>]+>/g, '').slice(0, 200) : '',
          source: 'indiehackers'
        });
      }
    }
  } catch (e) {
    console.log(`  ⚠️ IH 수집 실패: ${e.message}`);
  }

  console.log(`  ✅ IndieHackers: ${items.length}개 항목`);
  return items;
}

// ─── ProductHunt RSS ───

async function fetchProductHunt() {
  console.log('📡 ProductHunt 수집 중...');
  const items = [];

  try {
    const res = await httpGet('https://www.producthunt.com/feed');
    if (res.status !== 200) return items;

    const entries = res.data.match(/<entry>([\s\S]*?)<\/entry>/g) ||
                    res.data.match(/<item>([\s\S]*?)<\/item>/g) || [];

    for (const entry of entries.slice(0, 15)) {
      const title = (entry.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/) || [])[1];
      const link = (entry.match(/<link[^>]*href="([^"]*)"/) ||
                    entry.match(/<link>(.*?)<\/link>/) || [])[1];
      const summary = (entry.match(/<summary>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/summary>/) ||
                       entry.match(/<description>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/description>/) || [])[1];

      if (title) {
        items.push({
          title: title.trim(),
          url: link || '',
          description: summary ? summary.replace(/<[^>]+>/g, '').slice(0, 200) : '',
          source: 'producthunt'
        });
      }
    }
  } catch (e) {
    console.log(`  ⚠️ PH 수집 실패: ${e.message}`);
  }

  console.log(`  ✅ ProductHunt: ${items.length}개 항목`);
  return items;
}

// ─── Save to files ───

function saveCollected(items, source, index) {
  if (items.length === 0) return 0;

  const dir = ensureDateDir();
  let newCount = 0;
  const newItems = [];

  for (const item of items) {
    if (!item.url || index.urls[item.url]) continue;
    index.urls[item.url] = { date: today(), source: item.source };
    newItems.push(item);
    newCount++;
  }

  if (newItems.length === 0) return 0;

  // Save as markdown
  const filePath = path.join(dir, `${source}.md`);
  let content = '';

  if (fs.existsSync(filePath)) {
    content = fs.readFileSync(filePath, 'utf-8');
  } else {
    content = `# ${source.toUpperCase()} 수집 (${today()})\n\n`;
    content += `수집 시각: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}\n\n---\n\n`;
  }

  for (const item of newItems) {
    content += `## ${item.title}\n`;
    content += `- **URL**: ${item.url}\n`;
    if (item.score) content += `- **Score**: ${item.score}`;
    if (item.comments) content += ` | **Comments**: ${item.comments}`;
    if (item.score || item.comments) content += '\n';
    if (item.subreddit) content += `- **Subreddit**: r/${item.subreddit}\n`;
    if (item.description) content += `- **요약**: ${item.description}\n`;
    content += `- **Source**: ${item.source}\n\n`;
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  return newCount;
}

// ─── Summary to log ───

function writeSummaryLog(stats) {
  const now = new Date();
  const weekNum = getWeekNumber(now);
  const logFile = path.join(ROOT, 'logs', `2026-W${weekNum}.md`);

  let content = '';
  if (fs.existsSync(logFile)) {
    content = fs.readFileSync(logFile, 'utf-8');
  } else {
    content = `# 2026-W${weekNum} 주간 로그\n\n`;
  }

  const totalNew = Object.values(stats).reduce((a, b) => a + b, 0);
  if (totalNew === 0) {
    console.log('📝 새 콘텐츠 없음 — 로그 스킵');
    return;
  }

  content += `\n## 자동 수집 (${today()} ${now.toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul' })})\n\n`;
  content += `| 소스 | 새 항목 |\n|------|--------|\n`;
  for (const [src, count] of Object.entries(stats)) {
    content += `| ${src} | ${count} |\n`;
  }
  content += `| **합계** | **${totalNew}** |\n\n`;

  fs.writeFileSync(logFile, content, 'utf-8');
  console.log(`📝 로그 업데이트: logs/2026-W${weekNum}.md (+${totalNew})`);
}

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

// ─── Main ───

async function main() {
  console.log(`\n🔍 리서치 자동수집 시작 — ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}\n`);

  const index = loadIndex();
  const stats = {};

  // 1. HackerNews
  const hnItems = await fetchHackerNews();
  stats.hackernews = saveCollected(hnItems, 'hackernews', index);

  // 2. Reddit
  const redditItems = await fetchReddit();
  stats.reddit = saveCollected(redditItems, 'reddit', index);

  // 3. IndieHackers
  const ihItems = await fetchIndieHackers();
  stats.indiehackers = saveCollected(ihItems, 'indiehackers', index);

  // 4. ProductHunt
  const phItems = await fetchProductHunt();
  stats.producthunt = saveCollected(phItems, 'producthunt', index);

  // 5. Save index & log
  saveIndex(index);
  writeSummaryLog(stats);

  const total = Object.values(stats).reduce((a, b) => a + b, 0);
  console.log(`\n✅ 수집 완료: 총 ${total}개 새 항목 저장 → research/collected/${today()}/\n`);
}

main().catch(err => {
  console.error('❌ 수집 실패:', err);
  process.exit(1);
});
