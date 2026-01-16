import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

function requiredEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function loadEnv() {
  // Load env from common local files; later ones can override earlier ones.
  const candidates = ['.env', '.env.local', '.env.development.local'];
  for (const p of candidates) {
    dotenv.config({ path: path.join(process.cwd(), p), override: true });
  }
}

function splitSqlStatements(sqlText) {
  // Minimal statement splitter that keeps CREATE TRIGGER ... BEGIN ... END; blocks intact.
  const lines = sqlText.replace(/\r\n/g, '\n').split('\n');
  const statements = [];
  let buf = '';
  let inTrigger = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('--')) continue;

    if (!inTrigger && /^CREATE\s+TRIGGER/i.test(trimmed)) {
      inTrigger = true;
    }

    buf += line + '\n';

    if (inTrigger) {
      if (/\bEND\s*;\s*$/i.test(trimmed)) {
        const s = buf.trim();
        if (s) statements.push(s);
        buf = '';
        inTrigger = false;
      }
      continue;
    }

    if (trimmed.endsWith(';')) {
      const s = buf.trim();
      if (s) statements.push(s);
      buf = '';
    }
  }

  const tail = buf.trim();
  if (tail) statements.push(tail);
  return statements;
}

async function main() {
  loadEnv();
  const url = requiredEnv('TURSO_DATABASE_URL');
  const authToken = requiredEnv('TURSO_AUTH_TOKEN');
  const client = createClient({ url, authToken });

  const schemaPath = path.join(process.cwd(), 'db', 'schema.sql');
  const sql = await fs.readFile(schemaPath, 'utf8');

  const statements = splitSqlStatements(sql).map((s) => ({ sql: s }));

  await client.batch(statements, 'write');
  await client.close();
  console.log('✅ migrated schema');
}

main().catch((err) => {
  console.error('❌ migrate failed:', err?.message ?? err);
  process.exit(1);
});

