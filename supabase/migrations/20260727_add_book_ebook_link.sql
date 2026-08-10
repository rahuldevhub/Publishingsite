-- ── books table ─────────────────────────────────────────────────────────────
ALTER TABLE books
  ADD COLUMN IF NOT EXISTS ebook_link TEXT;
