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
  const candidates = ['.env', '.env.local', '.env.development.local'];
  for (const p of candidates) {
    dotenv.config({ path: path.join(process.cwd(), p), override: true });
  }
}

function splitSqlStatements(sqlText) {
  const lines = sqlText.replace(/\r\n/g, '\n').split('\n');
  const statements = [];
  let buf = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('--')) continue;
    buf += line + '\n';
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

  const seedPath = path.join(process.cwd(), 'db', 'seed.sql');
  const sql = await fs.readFile(seedPath, 'utf8');

  const statements = splitSqlStatements(sql).map((s) => ({ sql: s }));

  await client.batch(statements, 'write');
  await client.close();
  console.log('✅ seeded data');
}

main().catch((err) => {
  console.error('❌ seed failed:', err?.message ?? err);
  process.exit(1);
});

