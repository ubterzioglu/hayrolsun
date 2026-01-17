function splitSqlStatements(sqlText) {
  // Simple splitter for admin inserts: split on semicolons at end of statement.
  // (We assume no semicolons inside string literals for this admin workflow.)
  const lines = sqlText.replace(/
/g, '
').split('
');
  const statements = [];
  let buf = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('--')) continue;
    buf += line + '
';
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

module.exports = { splitSqlStatements };
