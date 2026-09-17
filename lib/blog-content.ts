import sanitizeHtml from "sanitize-html";
import { isRichTextHtml } from "@/lib/blog-content-format";

export const BLOG_CONTENT_TAGS = [
  "p",
  "br",
  "h2",
  "h3",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "mark",
  "ul",
  "ol",
  "li",
  "blockquote",
  "a",
] as const;

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

function isInternalHref(href: string): boolean {
  if (href.startsWith("/") || href.startsWith("#")) return true;
  try {
    const hostname = new URL(href).hostname.toLowerCase();
    return hostname === "riterapublishing.com" || hostname.endsWith(".riterapublishing.com");
  } catch {
    return false;
  }
}

/**
 * The authoritative rich-text security boundary. Call this on the server before
 * persistence and again before rendering stored HTML (defence in depth).
 */
export function sanitizeBlogContent(content: unknown): string {
  if (typeof content !== "string") return "";

  return sanitizeHtml(content, {
    allowedTags: [...BLOG_CONTENT_TAGS],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    allowedSchemes: ["http", "https"],
    allowedSchemesByTag: { a: ["http", "https"] },
    allowProtocolRelative: false,
    disallowedTagsMode: "discard",
    enforceHtmlBoundary: true,
    transformTags: {
      a: (_tagName, attribs) => {
        const href = safeHref(attribs.href ?? "");
        if (!href) return { tagName: "span", attribs: {} as Record<string, string> };
        const safeAttributes: Record<string, string> = isInternalHref(href)
          ? { href }
          : { href, target: "_blank", rel: "noopener noreferrer" };
        return {
          tagName: "a",
          attribs: safeAttributes,
        };
      },
    },
  }).trim();
}

/** Keeps genuine legacy plain text byte-for-byte while sanitizing anything tag-shaped. */
export function prepareBlogContentForStorage(content: unknown): string {
  if (typeof content !== "string") return "";
  if (isRichTextHtml(content) || /<\s*\/?\s*[a-z!][^>]*>/i.test(content)) {
    return sanitizeBlogContent(content);
  }
  return content;
}

export function blogContentToPlainText(content: string): string {
  if (!isRichTextHtml(content)) return content;
  const separatedBlocks = content.replace(/<\/(?:p|h2|h3|li|blockquote)>/gi, "$& ");
  return sanitizeHtml(separatedBlocks, {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/\s+/g, " ")
    .trim();
}
