-- Migration script to add views, likes, dislikes to articles table
-- Run this on existing database

-- Add columns (these will fail if columns already exist, that's OK)
ALTER TABLE articles ADD COLUMN views INTEGER NOT NULL DEFAULT 0;
ALTER TABLE articles ADD COLUMN likes INTEGER NOT NULL DEFAULT 0;
ALTER TABLE articles ADD COLUMN dislikes INTEGER NOT NULL DEFAULT 0;

-- Update existing articles with sample data (optional)
UPDATE articles SET views = 0, likes = 0, dislikes = 0 WHERE views IS NULL;
