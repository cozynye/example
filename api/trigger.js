/**
 * Vercel Serverless Function — GitHub Actions 워크플로 트리거
 *
 * 보안:
 * - GITHUB_TOKEN: Vercel 환경변수 (코드에 노출 안 됨)
 * - API_SECRET: 요청 인증용 (x-api-key 헤더로 검증)
 * - POST만 허용
 */

const https = require('https');

function githubRequest(token) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ ref: 'main' });

    const req = https.request({
      hostname: 'api.github.com',
      path: '/repos/cozynye/money-1/actions/workflows/research.yml/dispatches',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'money-1-trigger',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // API_SECRET 검증
  const apiSecret = process.env.API_SECRET;
  const requestKey = req.headers['x-api-key'];

  if (!apiSecret || !requestKey || requestKey !== apiSecret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // GitHub Token 확인
  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    return res.status(500).json({ error: 'Server config error: GITHUB_TOKEN not set' });
  }

  // GitHub Actions 트리거
  try {
    const result = await githubRequest(githubToken);

    if (result.status === 204) {
      return res.status(200).json({ success: true, message: '재조사가 시작되었습니다' });
    } else {
      return res.status(result.status).json({
        error: 'GitHub API error',
        status: result.status,
        detail: result.body
      });
    }
  } catch (e) {
    return res.status(500).json({ error: 'Failed to trigger workflow', detail: e.message });
  }
};
