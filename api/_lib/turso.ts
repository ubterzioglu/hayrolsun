import { createClient } from '@libsql/client';

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export function tursoClient() {
  const url = requiredEnv('TURSO_DATABASE_URL');
  const authToken = requiredEnv('TURSO_AUTH_TOKEN');
  return createClient({ url, authToken });
}

