import type { IncomingMessage, ServerResponse } from 'node:http';
import { tursoClient } from '../../_lib/turso';

function json(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  // Do not cache increments
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(body));
}

function getUrl(req: IncomingMessage) {
  const host = req.headers.host ?? 'localhost';
  const proto = (req.headers['x-forwarded-proto'] as string | undefined) ?? 'http';
  return new URL(req.url ?? '/', `${proto}://${host}`);
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  const url = getUrl(req);
  const parts = url.pathname.split('/').filter(Boolean);
  // /api/dreams/:slug/view
  const slug = decodeURIComponent(parts[2] ?? '').trim();
  if (!slug) return json(res, 400, { error: 'Missing slug' });

  const client = tursoClient();
  try {
    await client.execute({
      sql: `UPDATE dreams SET views = views + 1 WHERE slug = ?`,
      args: [slug],
    });

    const r = await client.execute({
      sql: `SELECT views FROM dreams WHERE slug = ? LIMIT 1`,
      args: [slug],
    });

    if (!r.rows[0]) return json(res, 404, { error: 'Not found' });
    return json(res, 200, { views: r.rows[0].views });
  } catch (e: any) {
    return json(res, 500, { error: 'DB error', detail: e?.message ?? String(e) });
  } finally {
    await client.close();
  }
}

