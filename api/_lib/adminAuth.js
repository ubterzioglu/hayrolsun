function requireAdmin(req, res) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) {
    res.statusCode = 500;
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.setHeader('cache-control', 'no-store');
    res.end(JSON.stringify({ error: 'ADMIN_TOKEN is not set' }));
    return false;
  }

  const provided = req.headers['x-admin-token'] || '';
  if (provided !== expected) {
    res.statusCode = 401;
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.setHeader('cache-control', 'no-store');
    res.end(JSON.stringify({ error: 'Unauthorized' }));
    return false;
  }

  return true;
}

module.exports = { requireAdmin };
