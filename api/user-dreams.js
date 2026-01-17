const { tursoClient } = require('./_lib/turso');

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-cache');
  res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    // Get approved dreams
    const client = tursoClient();
    try {
      const result = await client.execute({
        sql: `
          SELECT user_id, content, created_at
          FROM user_dreams
          WHERE status = 'approved'
          ORDER BY created_at DESC
          LIMIT 50
        `,
      });

      const dreams = result.rows.map((row) => ({
        userId: row.user_id,
        content: row.content,
        createdAt: row.created_at,
      }));

      return json(res, 200, { dreams });
    } catch (e) {
      return json(res, 500, { error: 'DB error', detail: (e && e.message) || String(e) });
    } finally {
      await client.close();
    }
  }

  if (req.method === 'POST') {
    // Submit new dream
    try {
      const { userId, content, status } = JSON.parse(req.body || '{}');

      if (!userId || !content) {
        return json(res, 400, { error: 'Missing required fields' });
      }

      const client = tursoClient();
      try {
        await client.execute({
          sql: 'INSERT INTO user_dreams (user_id, content, status) VALUES (?, ?, ?)',
          args: [userId, content, status || 'pending'],
        });

        return json(res, 200, { success: true });
      } finally {
        await client.close();
      }
    } catch (e) {
      return json(res, 500, { error: 'DB error', detail: (e && e.message) || String(e) });
    }
  }

  return json(res, 405, { error: 'Method not allowed' });
};