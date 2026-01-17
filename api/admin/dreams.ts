import type { IncomingMessage, ServerResponse } from 'node:http';
import { requireAdmin } from '../_lib/adminAuth';
import { tursoClient } from '../_lib/turso';

function json(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(body));
}

function getUrl(req: IncomingMessage) {
  const host = req.headers.host ?? 'localhost';
  const proto = (req.headers['x-forwarded-proto'] as string | undefined) ?? 'http';
  return new URL(req.url ?? '/', `${proto}://${host}`);
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });
  if (!requireAdmin(req, res)) return;

  const url = getUrl(req);
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') ?? '100', 10) || 100, 1), 500);
  const offset = Math.max(parseInt(url.searchParams.get('offset') ?? '0', 10) || 0, 0);

  const client = tursoClient();
  try {
    const r = await client.execute({
      sql: `
        SELECT d.id, d.title, d.slug, COALESCE(c.name, d.category_slug) as category,
               d.views, d.likes, d.dislikes, d.updated_at
        FROM dreams d
        LEFT JOIN categories c ON c.slug = d.category_slug
        ORDER BY d.updated_at DESC, d.id DESC
        LIMIT ? OFFSET ?
      `,
      args: [limit, offset],
    });

    const items = r.rows.map((row) => ({
      id: Number(row.id),
      title: String(row.title),
      slug: String(row.slug),
      category: row.category ? String(row.category) : null,
      views: Number(row.views ?? 0),
      likes: Number(row.likes ?? 0),
      dislikes: Number(row.dislikes ?? 0),
      updatedAt: String(row.updated_at ?? ''),
    }));

    return json(res, 200, { items, limit, offset, count: items.length });
  } catch (e: any) {
    return json(res, 500, { error: 'DB error', detail: e?.message ?? String(e) });
  } finally {
    await client.close();
  }
}

