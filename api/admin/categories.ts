import type { IncomingMessage, ServerResponse } from 'node:http';
import { requireAdmin } from '../_lib/adminAuth';
import { tursoClient } from '../_lib/turso';

function json(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });
  if (!requireAdmin(req, res)) return;

  const client = tursoClient();
  try {
    const r = await client.execute({
      sql: `
        SELECT c.id, c.name, c.slug, COALESCE(COUNT(d.id), 0) as dreamCount
        FROM categories c
        LEFT JOIN dreams d ON d.category_slug = c.slug
        GROUP BY c.id
        ORDER BY dreamCount DESC, c.name ASC
      `,
    });

    const items = r.rows.map((row) => ({
      id: Number(row.id),
      name: String(row.name),
      slug: String(row.slug),
      dreamCount: Number(row.dreamCount ?? 0),
    }));

    return json(res, 200, { items, count: items.length });
  } catch (e: any) {
    return json(res, 500, { error: 'DB error', detail: e?.message ?? String(e) });
  } finally {
    await client.close();
  }
}

