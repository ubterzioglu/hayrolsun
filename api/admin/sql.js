const { requireAdmin } = require('../_lib/adminAuth');
const { tursoClient } = require('../_lib/turso');
const { splitSqlStatements } = require('../_lib/sqlSplit');

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  return await new Promise((resolve, reject) => {
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

const ALLOWED_TABLES = new Set(['dreams', 'categories', 'tags', 'dream_tags', 'articles']);

function isAllowedStatement(stmt) {
  const s = stmt.trim();

  // Allow SELECT for quick checks
  if (/^select/i.test(s) || /^with/i.test(s)) return { ok: true };

  // Allow INSERTs only (optionally OR IGNORE/REPLACE).
  const m = s.match(/^insert\s+(?:or\s+(?:ignore|replace)\s+)?into\s+([a-zA-Z_][a-zA-Z0-9_]*)/i);
  if (!m) return { ok: false, reason: 'Only INSERT/SELECT statements are allowed' };

  const table = (m[1] || '').toLowerCase();
  if (!ALLOWED_TABLES.has(table)) return { ok: false, reason: `Table not allowed: ${table}` };

  // Block obviously dangerous keywords even if someone tries weird syntax.
  if (/(drop|alter|pragma|attach|detach|vacuum)/i.test(s)) {
    return { ok: false, reason: 'Dangerous SQL keyword detected' };
  }

  return { ok: true };
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  if (!requireAdmin(req, res)) return;

  let sql;
  try {
    const body = await readJson(req);
    sql = body && body.sql;
  } catch {
    return json(res, 400, { error: 'Invalid JSON' });
  }

  if (!sql || typeof sql !== 'string' || sql.trim().length === 0) {
    return json(res, 400, { error: 'Missing sql' });
  }

  const statements = splitSqlStatements(sql).map((s) => s.trim()).filter(Boolean);
  if (statements.length === 0) return json(res, 400, { error: 'No statements found' });
  if (statements.length > 50) return json(res, 400, { error: 'Too many statements (max 50)' });

  for (const stmt of statements) {
    const check = isAllowedStatement(stmt);
    if (!check.ok) return json(res, 400, { error: 'SQL not allowed', detail: check.reason, stmt });
  }

  const client = tursoClient();
  try {
    for (const stmt of statements) {
      await client.execute(stmt);
    }
    return json(res, 200, { ok: true, executed: statements.length });
  } catch (e) {
    return json(res, 500, { error: 'DB error', detail: (e && e.message) || String(e) });
  } finally {
    await client.close();
  }
};
