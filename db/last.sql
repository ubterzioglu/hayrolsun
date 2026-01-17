-- User submitted dreams (anonymous)
CREATE TABLE IF NOT EXISTS user_dreams (
  id INTEGER PRIMARY KEY,
  user_id TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE INDEX IF NOT EXISTS idx_user_dreams_status ON user_dreams(status);
CREATE INDEX IF NOT EXISTS idx_user_dreams_created ON user_dreams(created_at DESC);