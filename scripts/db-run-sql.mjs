import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

function loadEnv() {
  const candidates = ['.env', '.env.local', '.env.development.local'];
  for (const p of candidates) {
    dotenv.config({ path: path.join(process.cwd(), p), override: true });
  }
}

function requiredEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
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

  const file = process.argv[2];
  if (!file) throw new Error('Usage: npm run db:sql -- path/to/file.sql');
  const fullPath = path.isAbsolute(file) ? file : path.join(process.cwd(), file);

  const url = requiredEnv('TURSO_DATABASE_URL');
  const authToken = requiredEnv('TURSO_AUTH_TOKEN');
  const client = createClient({ url, authToken });

  const sql = await fs.readFile(fullPath, 'utf8');
  const statements = splitSqlStatements(sql);
  if (statements.length === 0) throw new Error('No statements found');

  for (const stmt of statements) {
    await client.execute(stmt);
  }

  await client.close();
  console.log(`✅ executed ${statements.length} statements from ${file}`);
}

main().catch((err) => {
  console.error('❌ db:sql failed:', err?.message ?? err);
  process.exit(1);
});

