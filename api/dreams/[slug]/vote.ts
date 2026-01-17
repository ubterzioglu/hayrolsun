import type { IncomingMessage, ServerResponse } from 'node:http';
import { tursoClient } from '../../_lib/turso';

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

async function readJson(req: IncomingMessage) {
  return await new Promise<any>((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  const url = getUrl(req);
  const parts = url.pathname.split('/').filter(Boolean);
  // /api/dreams/:slug/vote
  const slug = decodeURIComponent(parts[2] ?? '').trim();
  if (!slug) return json(res, 400, { error: 'Missing slug' });

  let vote: string | undefined;
  try {
    const body = await readJson(req);
    vote = body?.vote;
  } catch {
    return json(res, 400, { error: 'Invalid JSON' });
  }

  if (vote !== 'like' && vote !== 'dislike') {
    return json(res, 400, { error: 'vote must be like or dislike' });
  }

  const client = tursoClient();
  try {
    const sql =
      vote === 'like'
        ? `UPDATE dreams SET likes = likes + 1 WHERE slug = ?`
        : `UPDATE dreams SET dislikes = dislikes + 1 WHERE slug = ?`;
    await client.execute({ sql, args: [slug] });

    const r = await client.execute({
      sql: `SELECT likes, dislikes FROM dreams WHERE slug = ? LIMIT 1`,
      args: [slug],
    });

    if (!r.rows[0]) return json(res, 404, { error: 'Not found' });
    return json(res, 200, { likes: r.rows[0].likes, dislikes: r.rows[0].dislikes });
  } catch (e: any) {
    return json(res, 500, { error: 'DB error', detail: e?.message ?? String(e) });
  } finally {
    await client.close();
  }
}

