function requiredEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function toHttpUrl(url) {
  if (url.startsWith('libsql://')) {
    return `https://${url.slice('libsql://'.length)}`;
  }
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
}

function encodeArg(arg) {
  if (arg === null || arg === undefined) return { type: 'null' };
  if (typeof arg === 'number') return { type: 'float', value: arg };
  if (typeof arg === 'bigint') return { type: 'integer', value: String(arg) };
  if (typeof arg === 'string') return { type: 'text', value: arg };
  if (arg instanceof Uint8Array) {
    const base64 = Buffer.from(arg).toString('base64');
    return { type: 'blob', base64 };
  }
  return { type: 'text', value: String(arg) };
}

function decodeValue(raw) {
  if (raw === null || raw === undefined) return null;
  if (typeof raw !== 'object') return raw;
  const type = raw.type;
  if (type === 'integer') return Number(raw.value || 0);
  if (type === 'float') return Number(raw.value || 0);
  if (type === 'text') return String(raw.value || '');
  if (type === 'blob') return raw.base64 || '';
  return raw;
}

function rowsToObjects(cols, rows) {
  const names = cols.map((c, idx) => c.name || `col_${idx + 1}`);
  return rows.map((row) => {
    const obj = {};
    row.forEach((value, index) => {
      obj[names[index] || `col_${index + 1}`] = decodeValue(value);
    });
    return obj;
  });
}

async function executeHttp(endpoint, authToken, sql, args) {
  const body = {
    requests: [
      {
        type: 'execute',
        stmt: {
          sql,
          args: args.map(encodeArg),
          named_args: [],
          want_rows: true,
        },
      },
    ],
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(`Turso HTTP ${res.status}: ${msg}`.trim());
  }

  const payload = await res.json();
  const result = payload && payload.results && payload.results[0] && payload.results[0].response && payload.results[0].response.result;
  if (!result) return { rows: [], rowsAffected: 0 };

  const rows = rowsToObjects(result.cols || [], result.rows || []);
  const rowsAffected = Number(result.affected_row_count || 0);
  const lastInsertRowid = result.last_insert_rowid ? String(result.last_insert_rowid) : undefined;
  return { rows, rowsAffected, lastInsertRowid };
}

function tursoClient() {
  const url = requiredEnv('TURSO_DATABASE_URL');
  const authToken = requiredEnv('TURSO_AUTH_TOKEN');
  const baseUrl = new URL(toHttpUrl(url));
  const endpoint = new URL('v2/pipeline', baseUrl).toString();

  return {
    async execute(stmtOrSql, args) {
      if (typeof stmtOrSql === 'string') {
        return executeHttp(endpoint, authToken, stmtOrSql, args || []);
      }
      return executeHttp(endpoint, authToken, stmtOrSql.sql, stmtOrSql.args || []);
    },
    async close() {
      // no-op for HTTP pipeline
    },
  };
}

module.exports = { tursoClient };
