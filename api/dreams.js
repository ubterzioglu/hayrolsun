const { tursoClient } = require('./_lib/turso');

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  // cache read-heavy responses a bit (Vercel edge/CDN)
  res.setHeader('cache-control', 's-maxage=60, stale-while-revalidate=300');
  res.end(JSON.stringify(body));
}

function getUrl(req) {
  // Vercel provides host; in dev this is also fine.
  const host = req.headers.host || 'localhost';
  const proto = req.headers['x-forwarded-proto'] || 'http';
  return new URL(req.url || '/', `${proto}://${host}`);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });

  const url = getUrl(req);
  const query = (url.searchParams.get('query') || '').trim();
  const tag = (url.searchParams.get('tag') || '').trim();
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '30', 10) || 30, 1), 100);
  const offset = Math.max(parseInt(url.searchParams.get('offset') || '0', 10) || 0, 0);

  const client = tursoClient();

  try {
    // Build SQL with optional filters; keep it simple and safe with positional args.
    const where = [];
    const args = [];
    const orderByArgs = [];

    let from = 'dreams d';
    const select =
      'd.id, d.title, d.slug, d.body, d.views, d.rating, d.created_at, d.updated_at';
    let orderBy = 'd.views DESC, d.id DESC';

    if (query.length > 0) {
      // Simple LIKE-based search for Turkish text - reliable and works well
      // Search in both title and body, case-insensitive
      const searchPattern = `%${query.toLowerCase()}%`;
      where.push('(LOWER(d.title) LIKE ? OR LOWER(d.body) LIKE ?)');
      args.push(searchPattern, searchPattern);
      
      // When searching, prioritize relevance: title matches first, then by views
      orderBy = `CASE WHEN LOWER(d.title) LIKE ? THEN 0 ELSE 1 END ASC, d.views DESC, d.id DESC`;
      orderByArgs.push(searchPattern);
    }

    if (tag.length > 0) {
      from += ' JOIN dream_tags dt ON dt.dream_id = d.id';
      where.push('dt.tag_slug = ?');
      args.push(tag);
    }

    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const sql = `
      SELECT ${select}
      FROM ${from}
      ${whereSql}
      GROUP BY d.id
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
    `;
    
    // Combine all args in correct order: WHERE conditions, ORDER BY, LIMIT, OFFSET
    const allArgs = [...args, ...orderByArgs, limit, offset];

    const result = await client.execute({ sql, args: allArgs });

    const items = result.rows.map((r) => ({
      id: r.id,
      title: r.title,
      slug: r.slug,
      shortDesc: String(r.body).slice(0, 180) + (String(r.body).length > 180 ? '.' : ''),
      popularity: r.views,
      rating: r.rating,
      updatedAt: r.updated_at,
    }));

    return json(res, 200, { items, count: items.length, limit, offset });
  } catch (e) {
    return json(res, 500, { error: 'DB error', detail: (e && e.message) || String(e) });
  } finally {
    await client.close();
  }
};
