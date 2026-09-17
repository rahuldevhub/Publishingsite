import assert from "node:assert/strict";
import test from "node:test";
import { blogContentToPlainText, prepareBlogContentForStorage, sanitizeBlogContent } from "../lib/blog-content";
import { legacyContentToHtml } from "../lib/blog-content-format";

test("keeps only the editor's semantic HTML", () => {
  const clean = sanitizeBlogContent(
    '<h2 style="color:red">Heading</h2><p class="copy"><strong>Bold</strong> <mark>marked</mark></p><ul><li>One</li></ul>',
  );
  assert.equal(clean, "<h2>Heading</h2><p><strong>Bold</strong> <mark>marked</mark></p><ul><li>One</li></ul>");
});

test("removes stored-XSS payloads and unsafe URL protocols", () => {
  const clean = sanitizeBlogContent(
    '<script>alert(1)</script><img src=x onerror=alert(1)><p onclick="alert(1)">Safe</p><a href="javascript:alert(1)">test</a>',
  );
  assert.equal(clean, "<p>Safe</p>test");
  assert.doesNotMatch(clean, /script|onerror|onclick|javascript:|<img/i);
});

test("keeps internal links in the same tab and protects external links", () => {
  const clean = sanitizeBlogContent(
    '<p><a href="/packages" target="_blank">Internal</a> <a href="https://riterapublishing.com/blog/post" target="_blank">Ritera</a> <a href="https://example.com/path">External</a></p>',
  );
  assert.equal(
    clean,
    '<p><a href="/packages">Internal</a> <a href="https://riterapublishing.com/blog/post">Ritera</a> <a href="https://example.com/path" target="_blank" rel="noopener noreferrer">External</a></p>',
  );
});

test("converts legacy post structure for editing without a data migration", () => {
  const html = legacyContentToHtml(
    "## Section\n\nA **bold** paragraph.\n\n- First\n- Second\n\n> A quotation",
  );
  assert.equal(
    html,
    "<h2>Section</h2><p>A <strong>bold</strong> paragraph.</p><ul><li><p>First</p></li><li><p>Second</p></li></ul><blockquote><p>A quotation</p></blockquote>",
  );
});

test("preserves legacy plain text exactly when another field is edited", () => {
  assert.equal(prepareBlogContentForStorage("A comparison: 2 < 3\n\nSecond paragraph"), "A comparison: 2 < 3\n\nSecond paragraph");
  assert.equal(prepareBlogContentForStorage("<script>alert(1)</script>Safe"), "Safe");
});

test("extracts indexable plain text from rich content", () => {
  assert.equal(blogContentToPlainText("<h2>Heading</h2><p>Readable copy.</p>"), "Heading Readable copy.");
});
