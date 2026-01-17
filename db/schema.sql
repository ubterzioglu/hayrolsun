-- Hayrolsun.site (Turso/libSQL) schema
-- Read-heavy, rarely updated. Optimized for search + filtering.

PRAGMA foreign_keys = ON;

-- Categories (optional normalization; you can also keep category text directly on dreams)
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS dreams (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  body TEXT NOT NULL,
  category_slug TEXT,
  views INTEGER NOT NULL DEFAULT 0,
  rating REAL NOT NULL DEFAULT 0,
  likes INTEGER NOT NULL DEFAULT 0,
  dislikes INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  FOREIGN KEY (category_slug) REFERENCES categories(slug) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS dream_tags (
  dream_id INTEGER NOT NULL,
  tag_slug TEXT NOT NULL,
  PRIMARY KEY (dream_id, tag_slug),
  FOREIGN KEY (dream_id) REFERENCES dreams(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_slug) REFERENCES tags(slug) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_dreams_slug ON dreams(slug);
CREATE INDEX IF NOT EXISTS idx_dreams_category ON dreams(category_slug);
CREATE INDEX IF NOT EXISTS idx_dream_tags_tag ON dream_tags(tag_slug);

-- Full-text search over title + body.
-- unicode61 with diacritics removed helps Turkish search a bit.
CREATE VIRTUAL TABLE IF NOT EXISTS dreams_fts USING fts5(
  title,
  body,
  content='dreams',
  content_rowid='id',
  tokenize='unicode61 remove_diacritics 2'
);

-- Keep FTS in sync
CREATE TRIGGER IF NOT EXISTS dreams_ai AFTER INSERT ON dreams BEGIN
  INSERT INTO dreams_fts(rowid, title, body) VALUES (new.id, new.title, new.body);
END;

CREATE TRIGGER IF NOT EXISTS dreams_ad AFTER DELETE ON dreams BEGIN
  INSERT INTO dreams_fts(dreams_fts, rowid, title, body) VALUES('delete', old.id, old.title, old.body);
END;

CREATE TRIGGER IF NOT EXISTS dreams_au AFTER UPDATE ON dreams BEGIN
  UPDATE dreams SET updated_at = (strftime('%Y-%m-%dT%H:%M:%fZ','now')) WHERE id = old.id;
  INSERT INTO dreams_fts(dreams_fts, rowid, title, body) VALUES('delete', old.id, old.title, old.body);
  INSERT INTO dreams_fts(rowid, title, body) VALUES (new.id, new.title, new.body);
END;

-- Backfill columns for older DBs (scripts ignore duplicate-column errors)
ALTER TABLE dreams ADD COLUMN likes INTEGER NOT NULL DEFAULT 0;
ALTER TABLE dreams ADD COLUMN dislikes INTEGER NOT NULL DEFAULT 0;
