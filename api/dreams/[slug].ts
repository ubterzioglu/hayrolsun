import type { IncomingMessage, ServerResponse } from 'node:http';
import { tursoClient } from '../_lib/turso';

function json(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 's-maxage=60, stale-while-revalidate=300');
  res.end(JSON.stringify(body));
}

function getUrl(req: IncomingMessage) {
  const host = req.headers.host ?? 'localhost';
  const proto = (req.headers['x-forwarded-proto'] as string | undefined) ?? 'http';
  return new URL(req.url ?? '/', `${proto}://${host}`);
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });

  const url = getUrl(req);
  const parts = url.pathname.split('/').filter(Boolean);
  const slug = decodeURIComponent(parts[parts.length - 1] ?? '').trim();
  if (!slug) return json(res, 400, { error: 'Missing slug' });

  const client = tursoClient();

  try {
    const dreamRes = await client.execute({
      sql: `
        SELECT d.id, d.title, d.slug, d.body, COALESCE(c.name, d.category_slug) as category, d.updated_at
        FROM dreams d
        LEFT JOIN categories c ON c.slug = d.category_slug
        WHERE d.slug = ?
        LIMIT 1
      `,
      args: [slug],
    });

    const row = dreamRes.rows[0];
    if (!row) return json(res, 404, { error: 'Not found' });

    const tagsRes = await client.execute({
      sql: `
        SELECT t.slug, t.name
        FROM dream_tags dt
        JOIN tags t ON t.slug = dt.tag_slug
        WHERE dt.dream_id = ?
        ORDER BY t.name ASC
      `,
      args: [row.id],
    });

    const item = {
      id: row.id,
      title: row.title,
      slug: row.slug,
      body: row.body,
      category: row.category,
      updatedAt: row.updated_at,
      tags: tagsRes.rows.map((t) => ({ slug: t.slug, name: t.name })),
    };

    return json(res, 200, { item });
  } catch (e: any) {
    return json(res, 500, { error: 'DB error', detail: e?.message ?? String(e) });
  } finally {
    await client.close();
  }
}

