const { tursoClient } = require('./_lib/turso');

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'public, max-age=300');
  res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });

  const client = tursoClient();
  try {
    const r = await client.execute({
      sql: `SELECT id, title, slug, 
                   substr(body, 1, 200) as excerpt,
                   views, likes, dislikes,
                   created_at, updated_at
            FROM articles 
            ORDER BY created_at DESC`,
    });

    const articles = r.rows.map((row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      views: row.views || 0,
      likes: row.likes || 0,
      dislikes: row.dislikes || 0,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    return json(res, 200, { articles });
  } catch (e) {
    return json(res, 500, { error: 'DB error', detail: (e && e.message) || String(e) });
  } finally {
    await client.close();
  }
};
