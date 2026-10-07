import { readFile, writeFile } from "node:fs/promises";
import { isDeepStrictEqual } from "node:util";
import { createClient } from "@supabase/supabase-js";

// Explicitly reviewed published-content edits only; never deletes/unpublishes.
// Usage: node --env-file=.env.local scripts/apply-seo-phase1-content.mjs [--apply|--rollback]
const plan = JSON.parse(await readFile(new URL("../docs/seo-phase1/content-changes.json", import.meta.url), "utf8"));
const apply = process.argv.includes("--apply");
const rollback = process.argv.includes("--rollback");
if (apply && rollback) throw new Error("Choose apply or rollback, not both.");
const key = apply || rollback ? process.env.SUPABASE_SERVICE_ROLE_KEY : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !key) throw new Error("Required Supabase configuration is missing.");
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, key, { auth: { persistSession: false } });
const pending = [];
for (const edit of plan) {
  if (edit.table !== "blog_posts") throw new Error("Unsupported table in content plan.");
  const fields = Object.keys(edit.after);
  if (fields.some((field) => !["content", "title", "meta_title", "meta_description", "excerpt", "faq_data"].includes(field))) {
    throw new Error("Unexpected field in content plan.");
  }
  const { data: row, error } = await db.from(edit.table)
    .select(["id", "slug", "published", "updated_at", ...fields].join(","))
    .eq("id", edit.id).eq("slug", edit.slug).single();
  if (error || !row?.published) throw new Error(`Published article unavailable: ${edit.slug}`);
  const target = rollback ? edit.before : edit.after;
  const source = rollback ? edit.after : edit.before;
  if (fields.every((field) => isDeepStrictEqual(row[field], target[field]))) continue;
  if (!fields.every((field) => isDeepStrictEqual(row[field], source[field]))) {
    throw new Error(`Content changed since review; refusing to overwrite: ${edit.slug}`);
  }
  pending.push({ edit, row, target });
}
console.log(`${pending.length} reviewed article edits ${apply || rollback ? "ready to save" : "validated (read-only)"}.`);
if (apply || rollback) {
  const results = [];
  for (const { edit, row, target } of pending) {
    let query = db.from(edit.table).update({ ...target, updated_at: new Date().toISOString() })
      .eq("id", edit.id).eq("slug", edit.slug).eq("published", true);
    query = row.updated_at ? query.eq("updated_at", row.updated_at) : query.is("updated_at", null);
    const { data, error } = await query.select("slug, updated_at").single();
    if (error || !data) throw new Error(`Save failed or concurrent edit detected: ${edit.slug}`);
    results.push(data);
    console.log(`Saved ${edit.slug}`);
  }
  await writeFile(new URL(`../docs/seo-phase1/${rollback ? "rollback" : "applied"}-content.json`, import.meta.url), JSON.stringify(results, null, 2) + "\n");
}
