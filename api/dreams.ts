import type { IncomingMessage, ServerResponse } from 'node:http';
import { tursoClient } from './_lib/turso';

function json(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  // cache read-heavy responses a bit (Vercel edge/CDN)
  res.setHeader('cache-control', 's-maxage=60, stale-while-revalidate=300');
  res.end(JSON.stringify(body));
}

function getUrl(req: IncomingMessage) {
  // Vercel provides host; in dev this is also fine.
  const host = req.headers.host ?? 'localhost';
  const proto = (req.headers['x-forwarded-proto'] as string | undefined) ?? 'http';
  return new URL(req.url ?? '/', `${proto}://${host}`);
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });

  const url = getUrl(req);
  const query = (url.searchParams.get('query') ?? '').trim();
  const category = (url.searchParams.get('category') ?? '').trim(); // category slug
  const tag = (url.searchParams.get('tag') ?? '').trim(); // tag slug
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') ?? '30', 10) || 30, 1), 100);
  const offset = Math.max(parseInt(url.searchParams.get('offset') ?? '0', 10) || 0, 0);

  const client = tursoClient();

  try {
    // Build SQL with optional filters; keep it simple and safe with positional args.
    const where: string[] = [];
    const args: unknown[] = [];

    let from = 'dreams d LEFT JOIN categories c ON c.slug = d.category_slug';
    let select =
      'd.id, d.title, d.slug, d.body, COALESCE(c.name, d.category_slug) as category, d.views, d.rating, d.created_at, d.updated_at';
    let orderBy = 'd.views DESC, d.id DESC';

    if (query.length > 0) {
      // Use FTS for search. Quote query to avoid special char issues; keep it basic.
      from = 'dreams_fts f JOIN dreams d ON d.id = f.rowid LEFT JOIN categories c ON c.slug = d.category_slug';
      where.push('dreams_fts MATCH ?');
      args.push(query);
      orderBy = 'bm25(f) ASC, d.views DESC';
    }

    if (category.length > 0 && category !== 'tumu') {
      where.push('d.category_slug = ?');
      args.push(category);
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
    args.push(limit, offset);

    const result = await client.execute({ sql, args });

    const items = result.rows.map((r) => ({
      id: r.id,
      title: r.title,
      slug: r.slug,
      shortDesc: String(r.body).slice(0, 180) + (String(r.body).length > 180 ? '…' : ''),
      category: r.category,
      popularity: r.views,
      rating: r.rating,
      updatedAt: r.updated_at,
    }));

    return json(res, 200, { items, count: items.length, limit, offset });
  } catch (e: any) {
    return json(res, 500, { error: 'DB error', detail: e?.message ?? String(e) });
  } finally {
    await client.close();
  }
}

