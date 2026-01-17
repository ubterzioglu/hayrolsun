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
    const [dreams, categories, tags, articles, totals] = await Promise.all([
      client.execute('SELECT COUNT(*) as c FROM dreams'),
      client.execute('SELECT COUNT(*) as c FROM categories'),
      client.execute('SELECT COUNT(*) as c FROM tags'),
      client.execute('SELECT COUNT(*) as c FROM articles'),
      client.execute(
        'SELECT COALESCE(SUM(views),0) as views, COALESCE(SUM(likes),0) as likes, COALESCE(SUM(dislikes),0) as dislikes FROM dreams'
      ),
    ]);

    const out = {
      dreamCount: Number(dreams.rows[0]?.c ?? 0),
      categoryCount: Number(categories.rows[0]?.c ?? 0),
      tagCount: Number(tags.rows[0]?.c ?? 0),
      articleCount: Number(articles.rows[0]?.c ?? 0),
      totalViews: Number(totals.rows[0]?.views ?? 0),
      totalLikes: Number(totals.rows[0]?.likes ?? 0),
      totalDislikes: Number(totals.rows[0]?.dislikes ?? 0),
    };

    return json(res, 200, out);
  } catch (e: any) {
    return json(res, 500, { error: 'DB error', detail: e?.message ?? String(e) });
  } finally {
    await client.close();
  }
}

