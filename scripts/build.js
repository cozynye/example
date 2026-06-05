#!/usr/bin/env node

/**
 * build.js - 마크다운 리서치 데이터를 site/data.json으로 컴파일
 *
 * Usage: node scripts/build.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function readMd(filePath) {
  try {
    return fs.readFileSync(path.join(ROOT, filePath), 'utf-8');
  } catch {
    return null;
  }
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)/m);
  return match ? match[1] : 'Untitled';
}

function extractScoreTable(content) {
  const lines = content.split('\n');
  const scores = {};
  let totalLine = null;

  for (const line of lines) {
    // Match: | 기준명 (XX%) | N | 메모 |
    const scoreMatch = line.match(/\|\s*(.+?)\s*\((\d+)%\)\s*\|\s*(\d+)\s*\|/);
    if (scoreMatch) {
      scores[scoreMatch[1].trim()] = {
        weight: parseInt(scoreMatch[2]),
        score: parseInt(scoreMatch[3])
      };
    }
    // Match weighted total
    const totalMatch = line.match(/\*\*가중 총점\*\*\s*\|\s*\*\*([0-9.]+)\*\*/);
    if (totalMatch) {
      totalLine = parseFloat(totalMatch[1]);
    }
  }

  return { criteria: scores, total: totalLine };
}

function extractSection(content, heading) {
  const regex = new RegExp(`^##\\s+${heading}\\s*$`, 'm');
  const match = content.match(regex);
  if (!match) return '';

  const start = match.index + match[0].length;
  const nextHeading = content.indexOf('\n## ', start);
  const end = nextHeading === -1 ? content.length : nextHeading;
  return content.slice(start, end).trim();
}

function extractDecision(content) {
  if (content.includes('[x] **진행**') || content.includes('[x] 진행')) return '진행';
  if (content.includes('[x] **보류**') || content.includes('[x] 보류')) return '보류';
  if (content.includes('[x] **폐기**') || content.includes('[x] 폐기')) return '폐기';
  return '미정';
}

function extractWeeklyTracker(content) {
  const lines = content.split('\n');
  const weeks = [];

  for (const line of lines) {
    const match = line.match(/\|\s*(W\d+)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|/);
    if (match && match[1] !== '주차') {
      weeks.push({
        week: match[1].trim(),
        date: match[2].trim(),
        revenue: match[3].trim(),
        channel: match[4].trim(),
        rate: match[5].trim(),
        cumulative: match[6].trim()
      });
    }
  }

  return weeks;
}

function parseIdea(filePath) {
  const content = readMd(filePath);
  if (!content) return null;

  return {
    file: filePath,
    title: extractTitle(content),
    summary: extractSection(content, '한줄 요약'),
    problem: extractSection(content, '문제 정의'),
    solution: extractSection(content, '솔루션'),
    scores: extractScoreTable(content),
    revenue: extractSection(content, '수익 모델'),
    decision: extractDecision(content),
    techStack: extractSection(content, '기술 스택'),
    mvp: extractSection(content, 'MVP 범위'),
    risks: extractSection(content, '리스크'),
    nextSteps: extractSection(content, '다음 단계')
  };
}

function parseResearch(filePath) {
  const content = readMd(filePath);
  if (!content) return null;

  return {
    file: filePath,
    title: extractTitle(content),
    content: content
  };
}

// Main build
function build() {
  const data = {
    buildTime: new Date().toISOString(),

    // Ideas
    ideas: [],

    // Research
    research: {
      global: null,
      korean: null,
      channels: []
    },

    // Weekly tracker
    tracker: null,

    // Marketing strategies
    marketing: [],

    // Latest log
    latestLog: null,

    // Collected feed (자동 수집 데이터)
    collected: []
  };

  // Parse ideas
  const ideasDir = path.join(ROOT, 'ideas');
  if (fs.existsSync(ideasDir)) {
    const files = fs.readdirSync(ideasDir).filter(f => !f.startsWith('_') && f.endsWith('.md'));
    data.ideas = files.map(f => parseIdea(`ideas/${f}`)).filter(Boolean);
    data.ideas.sort((a, b) => (b.scores.total || 0) - (a.scores.total || 0));
  }

  // Parse research
  data.research.global = parseResearch('research/global-trends-2026.md');
  data.research.korean = parseResearch('research/korean-market-2026.md');

  const channelsDir = path.join(ROOT, 'research/channels');
  if (fs.existsSync(channelsDir)) {
    const files = fs.readdirSync(channelsDir).filter(f => f.endsWith('.md'));
    data.research.channels = files.map(f => parseResearch(`research/channels/${f}`)).filter(Boolean);
  }

  // Parse tracker
  const trackerContent = readMd('dashboard/weekly-tracker.md');
  if (trackerContent) {
    data.tracker = {
      weeks: extractWeeklyTracker(trackerContent),
      content: trackerContent
    };
  }

  // Parse marketing
  const stratDir = path.join(ROOT, 'marketing/strategies');
  if (fs.existsSync(stratDir)) {
    const files = fs.readdirSync(stratDir).filter(f => f.endsWith('.md'));
    data.marketing = files.map(f => parseResearch(`marketing/strategies/${f}`)).filter(Boolean);
  }

  // Parse latest log
  const logsDir = path.join(ROOT, 'logs');
  if (fs.existsSync(logsDir)) {
    const files = fs.readdirSync(logsDir)
      .filter(f => !f.startsWith('_') && f.endsWith('.md'))
      .sort()
      .reverse();
    if (files.length > 0) {
      data.latestLog = parseResearch(`logs/${files[0]}`);
    }
  }

  // Parse collected feed (최근 7일)
  const collectedDir = path.join(ROOT, 'research/collected');
  if (fs.existsSync(collectedDir)) {
    const now = new Date();
    const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

    const dateDirs = fs.readdirSync(collectedDir)
      .filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d) && new Date(d) >= sevenDaysAgo)
      .sort()
      .reverse();

    for (const dateDir of dateDirs) {
      const fullDir = path.join(collectedDir, dateDir);
      if (!fs.statSync(fullDir).isDirectory()) continue;

      const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.md'));
      for (const file of files) {
        const content = fs.readFileSync(path.join(fullDir, file), 'utf-8');
        const source = file.replace('.md', '');

        // Extract items from markdown
        const itemBlocks = content.split(/^## /m).slice(1);
        for (const block of itemBlocks) {
          const lines = block.split('\n');
          const title = lines[0].trim();
          const urlMatch = block.match(/\*\*URL\*\*:\s*(.+)/);
          const scoreMatch = block.match(/\*\*Score\*\*:\s*(\d+)/);
          const commentsMatch = block.match(/\*\*Comments\*\*:\s*(\d+)/);
          const subMatch = block.match(/\*\*Subreddit\*\*:\s*r\/(\w+)/);
          const descMatch = block.match(/\*\*요약\*\*:\s*(.+)/);

          if (title) {
            data.collected.push({
              date: dateDir,
              source,
              title,
              url: urlMatch ? urlMatch[1].trim() : '',
              score: scoreMatch ? parseInt(scoreMatch[1]) : 0,
              comments: commentsMatch ? parseInt(commentsMatch[1]) : 0,
              subreddit: subMatch ? subMatch[1] : null,
              description: descMatch ? descMatch[1].trim() : ''
            });
          }
        }
      }
    }

    // Sort by score descending
    data.collected.sort((a, b) => (b.score || 0) - (a.score || 0));
  }

  // Write output
  const outPath = path.join(ROOT, 'site', 'data.json');
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅ Built site/data.json (${data.ideas.length} ideas, ${data.research.channels.length} channels, ${data.collected.length} collected)`);
}

build();
