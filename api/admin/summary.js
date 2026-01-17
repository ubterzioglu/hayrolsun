const { requireAdmin } = require('../_lib/adminAuth');
const { tursoClient } = require('../_lib/turso');

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });
  if (!requireAdmin(req, res)) return;

  const client = tursoClient();
  try {
    const results = await Promise.all([
      client.execute('SELECT COUNT(*) as c FROM dreams'),
      client.execute('SELECT COUNT(*) as c FROM categories'),
      client.execute('SELECT COUNT(*) as c FROM tags'),
      client.execute('SELECT COUNT(*) as c FROM articles'),
      client.execute(
        'SELECT COALESCE(SUM(views),0) as views, COALESCE(SUM(likes),0) as likes, COALESCE(SUM(dislikes),0) as dislikes FROM dreams'
      ),
    ]);

    const dreams = results[0];
    const categories = results[1];
    const tags = results[2];
    const articles = results[3];
    const totals = results[4];

    const out = {
      dreamCount: Number((dreams.rows[0] && dreams.rows[0].c) || 0),
      categoryCount: Number((categories.rows[0] && categories.rows[0].c) || 0),
      tagCount: Number((tags.rows[0] && tags.rows[0].c) || 0),
      articleCount: Number((articles.rows[0] && articles.rows[0].c) || 0),
      totalViews: Number((totals.rows[0] && totals.rows[0].views) || 0),
      totalLikes: Number((totals.rows[0] && totals.rows[0].likes) || 0),
      totalDislikes: Number((totals.rows[0] && totals.rows[0].dislikes) || 0),
    };

    return json(res, 200, out);
  } catch (e) {
    return json(res, 500, { error: 'DB error', detail: (e && e.message) || String(e) });
  } finally {
    await client.close();
  }
};
