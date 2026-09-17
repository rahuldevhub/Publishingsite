const RICH_TEXT_BLOCK_RE = /<(?:p|br|h2|h3|strong|b|em|i|u|mark|ul|ol|li|blockquote|a)\b/i;

export function isRichTextHtml(content: string): boolean {
  return RICH_TEXT_BLOCK_RE.test(content);
}

function safeHref(value: string): string | null {
  const href = value.trim();
  if (!href) return null;
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  if (href.startsWith("#")) return href;

  try {
    const url = new URL(href);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function legacyInlineToHtml(value: string): string {
  const escaped = escapeHtml(value);
  return escaped
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)]\(([^)]+)\)/g, (_match, label: string, rawHref: string) => {
      const href = safeHref(rawHref.replace(/&amp;/g, "&"));
      return href ? `<a href="${escapeHtml(href)}">${label}</a>` : label;
    });
}

/** Converts legacy plain/Markdown-like posts into TipTap-compatible semantic HTML. */
export function legacyContentToHtml(content: string): string {
  if (!content.trim()) return "";
  if (isRichTextHtml(content)) return content;

  return content
    .split(/\n\n+/)
    .map((block) => {
      const lines = block.split("\n").filter((line) => line.trim());
      if (!lines.length) return "";
      if (block.startsWith("### ")) return `<h3>${legacyInlineToHtml(block.slice(4))}</h3>`;
      if (block.startsWith("## ")) return `<h2>${legacyInlineToHtml(block.slice(3))}</h2>`;
      if (block.startsWith("> ")) return `<blockquote><p>${legacyInlineToHtml(block.slice(2))}</p></blockquote>`;
      if (lines.every((line) => line.trim().startsWith("- "))) {
        return `<ul>${lines.map((line) => `<li><p>${legacyInlineToHtml(line.trim().slice(2))}</p></li>`).join("")}</ul>`;
      }
      if (lines.every((line) => /^\d+\.\s/.test(line.trim()))) {
        return `<ol>${lines.map((line) => `<li><p>${legacyInlineToHtml(line.trim().replace(/^\d+\.\s/, ""))}</p></li>`).join("")}</ol>`;
      }
      return `<p>${lines.map(legacyInlineToHtml).join("<br>")}</p>`;
    })
    .join("");
}
