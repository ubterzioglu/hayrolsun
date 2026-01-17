const { tursoClient } = require('./_lib/turso');

function json(res, status, body, cache = false) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', cache ? 's-maxage=60, stale-while-revalidate=300' : 'no-store');
  res.end(JSON.stringify(body));
}

function generateUserId() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

module.exports = async function handler(req, res) {
  const client = tursoClient();

  try {
    // GET - onaylanmış rüyaları listele
    if (req.method === 'GET') {
      const result = await client.execute({
        sql: `SELECT id, user_id, content, created_at
              FROM user_dreams
              WHERE status = 'approved'
              ORDER BY created_at DESC
              LIMIT 50`,
        args: []
      });

      return json(res, 200, { items: result.rows }, true);
    }

    // POST - yeni rüya paylaş
    if (req.method === 'POST') {
      let body = '';
      for await (const chunk of req) body += chunk;

      let data;
      try {
        data = JSON.parse(body);
      } catch {
        return json(res, 400, { error: 'Invalid JSON' });
      }

      const content = (data.content || '').trim();
      if (!content || content.length < 10) {
        return json(res, 400, { error: 'Rüya en az 10 karakter olmalı' });
      }
      if (content.length > 2000) {
        return json(res, 400, { error: 'Rüya en fazla 2000 karakter olabilir' });
      }

      const userId = generateUserId();

      await client.execute({
        sql: `INSERT INTO user_dreams (user_id, content, status) VALUES (?, ?, 'pending')`,
        args: [userId, content]
      });

      return json(res, 201, {
        success: true,
        message: 'Rüyanız gönderildi. Onaylandıktan sonra yayınlanacak.',
        userId
      });
    }

    return json(res, 405, { error: 'Method not allowed' });
  } catch (e) {
    return json(res, 500, { error: 'DB error', detail: (e && e.message) || String(e) });
  } finally {
    await client.close();
  }
};
