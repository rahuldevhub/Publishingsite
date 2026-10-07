import assert from "node:assert/strict";
import test from "node:test";
import { articleSchema, breadcrumbSchema, genuineTimestamp, organizationSchema, serializeJsonLd, websiteSchema } from "../lib/structured-data";
import { archiveCanonical, archivePage } from "../lib/seo";
import { retiredBlogSlugs, consolidatedBlogRedirects } from "../lib/content-redirects";

test("JSON-LD cannot terminate its script element through stored content", () => {
  const value = { headline: '</script><script>alert("x")</script>' };
  const serialized = serializeJsonLd(value);
  assert.ok(!serialized.includes("<"));
  assert.deepEqual(JSON.parse(serialized), value);
});

test("editorial labels resolve to the organization; real author records remain people", () => {
  const base = { headline: "Guide", description: "Description", url: "https://riterapublishing.com/blog/guide" };
  const editorial = articleSchema({ ...base, author: { name: "Ritera Exclusive" }, dateModified: "invalid" });
  assert.deepEqual(editorial.author, { "@id": organizationSchema()["@id"] });
  assert.equal(editorial.dateModified, undefined);
  const individual = articleSchema({ ...base, author: { name: "Named author", slug: "named-author" } });
  assert.equal((individual.author as { "@type": string })["@type"], "Person");
  assert.equal((individual.author as { url: string }).url, "https://riterapublishing.com/authors/named-author");
  assert.equal(websiteSchema().publisher["@id"], organizationSchema()["@id"]);
});

test("timestamps never fall back to the request time", () => {
  assert.equal(genuineTimestamp(null), undefined);
  assert.equal(genuineTimestamp("bad"), undefined);
  assert.equal(genuineTimestamp("2026-09-17T10:00:00Z"), "2026-09-17T10:00:00.000Z");
});

test("breadcrumb positions follow the actual category hierarchy", () => {
  const items = [{ name: "Home", item: "https://riterapublishing.com" }, { name: "Blog", item: "https://riterapublishing.com/blog" }, { name: "Category", item: "https://riterapublishing.com/blog/category/category" }, { name: "Guide", item: "https://riterapublishing.com/blog/guide" }];
  const list = breadcrumbSchema(items).itemListElement;
  assert.deepEqual(list.map((item) => item.position), [1, 2, 3, 4]);
  assert.equal(list[2].item, items[2].item);
});

test("distinct archive pages keep their own canonical without tracking parameters", () => {
  for (const value of [undefined, "0", "-1", "1.5", "Infinity", "abc"]) assert.equal(archivePage(value), 1);
  assert.equal(archiveCanonical("/blog", archivePage("2")), "https://riterapublishing.com/blog?page=2");
  assert.equal(archiveCanonical("/blog", archivePage("1")), "https://riterapublishing.com/blog");
});

test("retired blog redirects are single-hop and cannot point to another retired article", () => {
  for (const [source, target] of consolidatedBlogRedirects) {
    assert.ok(retiredBlogSlugs.has(source.slice("/blog/".length)));
    assert.ok(!retiredBlogSlugs.has(target.slice("/blog/".length)));
  }
});
