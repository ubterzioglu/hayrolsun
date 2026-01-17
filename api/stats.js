const { tursoClient } = require('./_lib/turso');

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  // Cache for a short time since stats don't change often
  res.setHeader('cache-control', 's-maxage=300, stale-while-revalidate=600');
  res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });

  const client = tursoClient();
  try {
    const results = await Promise.all([
      client.execute('SELECT COUNT(*) as c FROM dreams'),
      client.execute('SELECT COUNT(*) as c FROM articles'),
    ]);

    const dreams = results[0];
    const articles = results[1];

    const out = {
      dreamCount: Number((dreams.rows[0] && dreams.rows[0].c) || 0),
      articleCount: Number((articles.rows[0] && articles.rows[0].c) || 0),
    };

    return json(res, 200, out);
  } catch (e) {
    return json(res, 500, { error: 'DB error', detail: (e && e.message) || String(e) });
  } finally {
    await client.close();
  }
};