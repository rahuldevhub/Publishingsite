-- ── authors table ──────────────────────────────────────────────────────────
ALTER TABLE authors
  ADD COLUMN IF NOT EXISTS linkedin TEXT;

-- ── books table ─────────────────────────────────────────────────────────────
ALTER TABLE books
  ADD COLUMN IF NOT EXISTS purchase_link_international TEXT,
  ADD COLUMN IF NOT EXISTS purchase_link_pothi         TEXT,
  ADD COLUMN IF NOT EXISTS purchase_link_library       TEXT;

-- ── litspace_posts table ────────────────────────────────────────────────────
ALTER TABLE litspace_posts
  ADD COLUMN IF NOT EXISTS subtitle    TEXT,
  ADD COLUMN IF NOT EXISTS author_bio  TEXT;

-- ── litspace_categories cleanup ─────────────────────────────────────────────
-- Step 1: Reassign posts using old category names to the correct new names
UPDATE litspace_posts SET category_id = (
  SELECT id FROM litspace_categories WHERE name = 'Short Story' LIMIT 1
) WHERE category_id = (
  SELECT id FROM litspace_categories WHERE name = 'Short Stories' LIMIT 1
);

UPDATE litspace_posts SET category_id = (
  SELECT id FROM litspace_categories WHERE name = 'Essay' LIMIT 1
) WHERE category_id = (
  SELECT id FROM litspace_categories WHERE name = 'Essays' LIMIT 1
);

-- Step 2: Delete unwanted categories
DELETE FROM litspace_categories WHERE name IN ('Poetry', 'Short Stories', 'Essays');

-- Step 3: Ensure correct final categories exist
INSERT INTO litspace_categories (name, slug, created_at)
SELECT 'Short Story', 'short-story', now()
WHERE NOT EXISTS (SELECT 1 FROM litspace_categories WHERE name = 'Short Story');

INSERT INTO litspace_categories (name, slug, created_at)
SELECT 'Essay', 'essay', now()
WHERE NOT EXISTS (SELECT 1 FROM litspace_categories WHERE name = 'Essay');

-- Final state should be: Article, Essay, Short Story (and any others you keep)
