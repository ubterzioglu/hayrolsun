const { tursoClient } = require('../_lib/turso');
const { requireAdmin } = require('../_lib/adminAuth');

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  const client = tursoClient();

  try {
    // GET - tüm rüyaları listele (pending, approved, rejected)
    if (req.method === 'GET') {
      const url = new URL(req.url || '/', `http://${req.headers.host}`);
      const status = url.searchParams.get('status') || 'pending';

      const result = await client.execute({
        sql: `SELECT id, user_id, content, status, created_at
              FROM user_dreams
              WHERE status = ?
              ORDER BY created_at DESC
              LIMIT 100`,
        args: [status]
      });

      return json(res, 200, { items: result.rows });
    }

    // PATCH - durumu güncelle (approve/reject)
    if (req.method === 'PATCH') {
      let body = '';
      for await (const chunk of req) body += chunk;

      let data;
      try {
        data = JSON.parse(body);
      } catch {
        return json(res, 400, { error: 'Invalid JSON' });
      }

      const { id, status } = data;
      if (!id || !['approved', 'rejected', 'pending'].includes(status)) {
        return json(res, 400, { error: 'id ve status (approved/rejected/pending) gerekli' });
      }

      await client.execute({
        sql: `UPDATE user_dreams SET status = ? WHERE id = ?`,
        args: [status, id]
      });

      return json(res, 200, { success: true, id, status });
    }

    // DELETE - sil
    if (req.method === 'DELETE') {
      let body = '';
      for await (const chunk of req) body += chunk;

      let data;
      try {
        data = JSON.parse(body);
      } catch {
        return json(res, 400, { error: 'Invalid JSON' });
      }

      const { id } = data;
      if (!id) {
        return json(res, 400, { error: 'id gerekli' });
      }

      await client.execute({
        sql: `DELETE FROM user_dreams WHERE id = ?`,
        args: [id]
      });

      return json(res, 200, { success: true, deleted: id });
    }

    return json(res, 405, { error: 'Method not allowed' });
  } catch (e) {
    return json(res, 500, { error: 'DB error', detail: (e && e.message) || String(e) });
  } finally {
    await client.close();
  }
};
