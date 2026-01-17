import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in environment.");
  process.exit(1);
}

const db = createClient({ url, authToken });

async function run() {
  // preview count
  const before = await db.execute(`
    SELECT COUNT(*) AS c
    FROM dreams
    WHERE title LIKE '%Sürf%'
       OR body  LIKE '%Sürf%'
       OR slug  LIKE '%sürf%';
  `);
  console.log("Before:", before.rows);

  const res = await db.execute(`
    UPDATE dreams
    SET
      title = REPLACE(title, 'Sürf', 'surf'),
      body  = REPLACE(body,  'Sürf', 'surf'),
      slug  = REPLACE(slug,  'sürf', 'surf')
    WHERE
      title LIKE '%Sürf%'
      OR body LIKE '%Sürf%'
      OR slug LIKE '%sürf%';
  `);
  console.log("Updated rows:", res.rowsAffected ?? res.rows_affected ?? res.changes ?? "unknown");

  const after = await db.execute(`
    SELECT COUNT(*) AS c
    FROM dreams
    WHERE title LIKE '%Sürf%'
       OR body  LIKE '%Sürf%'
       OR slug  LIKE '%sürf%';
  `);
  console.log("After:", after.rows);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
