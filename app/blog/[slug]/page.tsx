import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import ReadingProgress from "@/app/components/ReadingProgress";
import RelatedGuides from "@/app/components/RelatedGuides";
import { CONTEXTUAL_RULES, MAX_CONTEXTUAL_LINKS } from "@/lib/internal-links";
import { SITE_URL } from "@/lib/site";
import { blogContentToPlainText, sanitizeBlogContent } from "@/lib/blog-content";
import { isRichTextHtml } from "@/lib/blog-content-format";

export const dynamic = "force-dynamic";


function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr));
}

type PageProps = { params: Promise<{ slug: string }> };

// ── generateMetadata ────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = createServerClient();
  const { slug } = await params;
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, meta_title, meta_description, excerpt, content, featured_image, keywords, author:authors(name)")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

  const title = post.meta_title || post.title;
  const description =
    post.meta_description ||
    post.excerpt ||
    blogContentToPlainText(post.content ?? "").replace(/[#*`[\]()]/g, "").slice(0, 155).trim() ||
    "Insights and guidance from the Ritera Publishing editorial team.";
  const url = `${SITE_URL}/blog/${slug}`;
  const image = post.featured_image;
  const authorName = (post.author as unknown as { name: string } | null)?.name ?? "Ritera Publishing";

  const ogImage = image
    ? (image.startsWith("http") ? image : `${SITE_URL}${image}`)
    : `${SITE_URL}/images/home/hero-library.webp`;

  return {
    title,
    description,
    keywords: post.keywords || "self publishing India, Ritera Publishing",
    authors: [{ name: authorName }],
    publisher: "Ritera Publishing",
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical: url },
  };
}

// ── Page ────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: PageProps) {
  const supabase = createServerClient();
  const { slug } = await params;

  const { data: post } = await supabase
    .from("blog_posts")
    .select(
      "id, title, slug, excerpt, content, featured_image, reading_time, created_at, updated_at, featured, faq_data, category:blog_categories(id, name, slug), author:authors(id, name, slug, bio, image_url, instagram, twitter)"
    )
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

  type FaqItem = { question: string; answer: string };
  const faqItems = (post.faq_data as unknown as FaqItem[] | null) ?? null;

  const category = post.category as unknown as { id: string; name: string; slug: string } | null;
  const author = post.author as unknown as {
    id: string;
    name: string;
    slug: string;
    bio: string | null;
    image_url: string | null;
    instagram: string | null;
    twitter: string | null;
  } | null;

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || "",
    image: post.featured_image
      ? (post.featured_image.startsWith("http") ? post.featured_image : `${SITE_URL}${post.featured_image}`)
      : undefined,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
    author: author
      ? { "@type": "Person", name: author.name, url: `${SITE_URL}/authors/${author.slug}` }
      : { "@type": "Organization", name: "Ritera Publishing" },
    publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
  };

  const faqJsonLd = faqItems && faqItems.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://riterapublishing.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://riterapublishing.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://riterapublishing.com/blog/${post.slug}` },
    ],
  };

  const postUrl = `${SITE_URL}/blog/${slug}`;
  const shareTitle = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(postUrl);
  const richTextContent = isRichTextHtml(post.content)
    ? sanitizeBlogContent(post.content)
    : null;

  return (
    <>
      <ReadingProgress />
      {/* JSON-LD — Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* JSON-LD — FAQPage */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {/* JSON-LD — BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="bg-white text-gray-900">
        {/* ── Breadcrumbs ── */}
        <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
          <ol className="max-w-4xl mx-auto px-6 py-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-gray-900 transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-gray-300">/</li>
            <li><Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link></li>
            {category && (
              <>
                <li aria-hidden="true" className="text-gray-300">/</li>
                <li>
                  <Link href={`/blog/category/${category.slug}`} className="hover:text-gray-900 transition-colors">
                    {category.name}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true" className="text-gray-300">/</li>
            <li className="text-gray-900 font-medium line-clamp-1" aria-current="page">{post.title}</li>
          </ol>
        </nav>

        {/* ── Article Header ── */}
        <header className="max-w-4xl mx-auto px-6 pt-12 pb-8">
          {category && (
            <Link
              href={`/blog/category/${category.slug}`}
              className="inline-block text-xs font-semibold tracking-widest text-gray-500 uppercase hover:text-gray-800 mb-4 transition-colors"
            >
              {category.name}
            </Link>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-xl text-gray-500 leading-relaxed mb-8 max-w-2xl">{post.excerpt}</p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 border-t border-gray-100 pt-5">
            {author && (
              <span className="flex items-center gap-2">
                {author.image_url ? (
                  <Image
                    src={author.image_url}
                    alt={author.name}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-500">
                    {author.name.charAt(0)}
                  </span>
                )}
                <span className="font-medium text-gray-700">{author.name}</span>
              </span>
            )}
            <span>{formatDate(post.created_at)}</span>
            <span>{post.reading_time} min read</span>
          </div>
        </header>

        {/* ── Featured Image ── */}
        {post.featured_image && (
          <div className="max-w-5xl mx-auto px-6 my-8">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </div>
        )}

        {/* ── Article Content ── */}
        <article className="max-w-3xl mx-auto px-6 pb-16">
          <div className="blog-article-content">
            {richTextContent ? (
              <div dangerouslySetInnerHTML={{ __html: richTextContent }} />
            ) : (
              renderContent(post.content, slug)
            )}
          </div>

          {/* ── FAQ Section ── */}
          {faqItems && faqItems.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqItems.map((item, i) => (
                  <div key={i} className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-5">
                    <h3 className="text-base font-semibold text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Mid-post CTA ── */}
          <div className="my-12 rounded-2xl bg-gray-900 text-white px-8 py-10 text-center">
            <p className="text-xs font-semibold tracking-widest text-yellow-400 uppercase mb-2">
              Ready to Publish?
            </p>
            <h3 className="text-2xl font-bold mb-3">
              Turn Your Manuscript Into a Published Book
            </h3>
            <p className="text-gray-300 text-base mb-6 max-w-md mx-auto">
              Ritera Publishing handles everything — editing, cover design,
              ISBN, and global distribution. You keep 100% of your royalties.
            </p>
            <a
              href="/packages"
              className="inline-block bg-yellow-400 text-gray-900 font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition-colors text-sm"
            >
              View Publishing Packages →
            </a>
          </div>

          {/* ── Share Buttons ── */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-4">
              Found this helpful? Share it with other authors
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href={`https://x.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Share on X
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Share on LinkedIn
              </a>
              <a
                href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Share on WhatsApp
              </a>
            </div>
          </div>

          {/* ── Continue Exploring ── */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">Continue Exploring</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/packages"
                className="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-900 hover:shadow-sm transition-all"
              >
                <span className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 text-amber-600 group-hover:bg-amber-200 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                </span>
                <div>
                  <p className="text-xs text-gray-500">Get published</p>
                  <p className="text-sm font-semibold text-gray-900">Self-publishing packages</p>
                </div>
              </Link>
              <Link
                href="/case-studies"
                className="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-900 hover:shadow-sm transition-all"
              >
                <span className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 group-hover:bg-blue-100 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75m-7.5 6h10.5a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg>
                </span>
                <div>
                  <p className="text-xs text-gray-500">Real stories</p>
                  <p className="text-sm font-semibold text-gray-900">Author case studies</p>
                </div>
              </Link>
              <Link
                href="/"
                className="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-900 hover:shadow-sm transition-all"
              >
                <span className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0 text-green-600 group-hover:bg-green-100 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </span>
                <div>
                  <p className="text-xs text-gray-500">Publishing partner</p>
                  <p className="text-sm font-semibold text-gray-900">Visit Ritera Publishing</p>
                </div>
              </Link>
            </div>
          </div>
        </article>

        {/* ── Author Bio ── */}
        {author && (author.bio || author.image_url) && (
          <aside className="max-w-3xl mx-auto px-6 pb-12">
            <div className="flex items-start gap-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              {author.image_url ? (
                <Image
                  src={author.image_url}
                  alt={author.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover shrink-0 ring-2 ring-yellow-400"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center shrink-0 ring-2 ring-yellow-400">
                  <span className="text-2xl font-bold text-white">{author.name.charAt(0)}</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold tracking-widest text-yellow-500 uppercase mb-1">
                  Written by
                </p>
                <h3 className="text-lg font-bold text-gray-900">{author.name}</h3>
                {author.bio && (
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {author.bio}
                  </p>
                )}
                <div className="mt-3 flex items-center gap-4">
                  {author.instagram && (
                    <a href={author.instagram} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-medium text-gray-500 hover:text-pink-500 transition-colors flex items-center gap-1">
                      Instagram ↗
                    </a>
                  )}
                  {author.twitter && (
                    <a href={author.twitter} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-medium text-gray-500 hover:text-sky-500 transition-colors flex items-center gap-1">
                      Twitter / X ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* ── Related Guides (semantic, topic-based) ── */}
        <RelatedGuides currentSlug={slug} />
      </main>
    </>
  );
}

// ── Content Renderer ─────────────────────────────────────────────────────────

// Shared styling for inline links (explicit markdown + contextual auto-links).
const INLINE_LINK_CLS =
  "font-medium text-amber-700 underline decoration-amber-300 decoration-1 underline-offset-2 hover:text-amber-800 hover:decoration-amber-500 transition-colors";

// Matches **bold** and [anchor](href) so we can tokenise a line of prose.
const EXPLICIT_TOKEN_RE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
const LINK_TOKEN_RE = /^\[([^\]]+)\]\(([^)]+)\)$/;

type RenderCtx = {
  selfUrl: string;            // `/blog/<slug>` — never link a post to itself
  usedHrefs: Set<string>;     // one link per destination per post
  budget: number;            // remaining contextual links for the post
  rules: { href: string; re: RegExp }[];
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Render a markdown link token as a Next.js <Link> (internal) or <a> (external).
function renderLinkToken(anchor: string, href: string, key: string): ReactNode {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link key={key} href={href} className={INLINE_LINK_CLS}>
        {anchor}
      </Link>
    );
  }
  if (/^https?:\/\//i.test(href)) {
    return (
      <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={INLINE_LINK_CLS}>
        {anchor}
      </a>
    );
  }
  if (/^(mailto:|tel:)/i.test(href)) {
    return (
      <a key={key} href={href} className={INLINE_LINK_CLS}>
        {anchor}
      </a>
    );
  }
  // Unsupported / unsafe scheme (e.g. javascript:) — render anchor text only.
  return anchor;
}

// Parse **bold** and [text](href) only. Used for headings and list items.
function renderMarkup(text: string, keyPrefix: string): ReactNode[] {
  return text.split(EXPLICIT_TOKEN_RE).map((part, idx) => {
    if (!part) return null;
    const key = `${keyPrefix}-${idx}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={key} className="font-bold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const link = part.match(LINK_TOKEN_RE);
    if (link) return renderLinkToken(link[1], link[2], key);
    return <span key={key}>{part}</span>;
  });
}

// Auto-link the first natural occurrence of configured phrases in plain prose.
// Respects: no self-links, one link per destination per post, one link per
// sentence, and a per-post budget. Article content is never mutated.
function injectContextual(text: string, ctx: RenderCtx, keyPrefix: string): ReactNode[] {
  if (ctx.budget <= 0 || !text.trim()) return [text];

  const accepted: { start: number; end: number; href: string }[] = [];
  const acceptedSentences: { s: number; e: number }[] = [];
  const localHrefs = new Set<string>();

  const sentenceSpan = (idx: number) => {
    let s = idx;
    while (s > 0 && !".!?\n".includes(text[s - 1])) s--;
    let e = idx;
    while (e < text.length && !".!?\n".includes(text[e])) e++;
    return { s, e };
  };

  for (const rule of ctx.rules) {
    if (accepted.length >= ctx.budget) break;
    if (rule.href === ctx.selfUrl) continue;
    if (ctx.usedHrefs.has(rule.href) || localHrefs.has(rule.href)) continue;

    const m = rule.re.exec(text);
    if (!m) continue;
    const start = m.index;
    const end = start + m[0].length;

    // Skip overlaps with an already-accepted match.
    if (accepted.some((a) => start < a.end && end > a.start)) continue;
    // Enforce at most one link per sentence.
    const span = sentenceSpan(start);
    if (acceptedSentences.some((sp) => span.s < sp.e && span.e > sp.s)) continue;

    accepted.push({ start, end, href: rule.href });
    acceptedSentences.push(span);
    localHrefs.add(rule.href);
  }

  if (accepted.length === 0) return [text];

  accepted.sort((a, b) => a.start - b.start);
  const nodes: ReactNode[] = [];
  let cursor = 0;
  accepted.forEach((a, k) => {
    ctx.usedHrefs.add(a.href);
    ctx.budget -= 1;
    if (a.start > cursor) nodes.push(<span key={`${keyPrefix}-t${k}`}>{text.slice(cursor, a.start)}</span>);
    nodes.push(
      <Link key={`${keyPrefix}-l${k}`} href={a.href} className={INLINE_LINK_CLS}>
        {text.slice(a.start, a.end)}
      </Link>
    );
    cursor = a.end;
  });
  if (cursor < text.length) nodes.push(<span key={`${keyPrefix}-tend`}>{text.slice(cursor)}</span>);
  return nodes;
}

// Prose: explicit markdown first, then contextual auto-linking on plain text.
function renderProse(text: string, ctx: RenderCtx, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  text.split(EXPLICIT_TOKEN_RE).forEach((part, idx) => {
    if (!part) return;
    const key = `${keyPrefix}-${idx}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      out.push(
        <strong key={key} className="font-bold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
      return;
    }
    const link = part.match(LINK_TOKEN_RE);
    if (link) {
      out.push(renderLinkToken(link[1], link[2], key));
      return;
    }
    out.push(...injectContextual(part, ctx, key));
  });
  return out;
}

function renderContent(content: string, slug: string) {
  const ctx: RenderCtx = {
    selfUrl: `/blog/${slug}`,
    usedHrefs: new Set<string>(),
    budget: MAX_CONTEXTUAL_LINKS,
    rules: CONTEXTUAL_RULES.map((r) => ({
      href: `/blog/${r.slug}`,
      re: new RegExp(`(?<![\\w-])(${escapeRegExp(r.phrase)})(?![\\w-])`, "i"),
    })),
  };

  const paragraphs = content.split(/\n\n+/);
  return paragraphs.map((para, i) => {

    // H2 heading
    if (para.startsWith("## ")) {
      return (
        <h2 key={i} className="text-2xl md:text-3xl font-bold text-gray-900 mt-14 mb-5 leading-snug border-l-4 border-yellow-400 pl-4">
          {renderMarkup(para.slice(3), `h2-${i}`)}
        </h2>
      );
    }

    // H3 heading
    if (para.startsWith("### ")) {
      return (
        <h3 key={i} className="text-xl font-bold text-gray-800 mt-10 mb-4 leading-snug">
          {renderMarkup(para.slice(4), `h3-${i}`)}
        </h3>
      );
    }

    // Bullet list — lines starting with "- "
    if (para.split("\n").every(line => line.trim().startsWith("- ") || line.trim() === "")) {
      const items = para.split("\n").filter(line => line.trim().startsWith("- "));
      return (
        <ul key={i} className="my-6 space-y-3">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-gray-700 text-lg leading-relaxed">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-yellow-400 shrink-0" />
              <span>{renderMarkup(item.replace(/^- /, ""), `ul-${i}-${j}`)}</span>
            </li>
          ))}
        </ul>
      );
    }

    // Numbered list — lines starting with "1. ", "2. " etc
    if (para.split("\n").every(line => /^\d+\.\s/.test(line.trim()) || line.trim() === "")) {
      const items = para.split("\n").filter(line => /^\d+\.\s/.test(line.trim()));
      return (
        <ol key={i} className="my-6 space-y-3 counter-reset-list">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-gray-700 text-lg leading-relaxed">
              <span className="shrink-0 w-7 h-7 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                {j + 1}
              </span>
              <span>{renderMarkup(item.replace(/^\d+\.\s/, ""), `ol-${i}-${j}`)}</span>
            </li>
          ))}
        </ol>
      );
    }

    // Blockquote — lines starting with "> "
    if (para.startsWith("> ")) {
      return (
        <blockquote key={i} className="my-8 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-xl px-6 py-5">
          <p className="text-gray-800 text-lg italic leading-relaxed">
            {renderProse(para.slice(2), ctx, `bq-${i}`)}
          </p>
        </blockquote>
      );
    }

    // Emoji header — single line starting with an emoji
    const emojiRegex = /^(\p{Emoji_Presentation}|\p{Extended_Pictographic})\s+(.+)$/u;
    const emojiMatch = para.trim().match(emojiRegex);
    if (emojiMatch && !para.includes('\n')) {
      return (
        <div key={i} className="flex items-center gap-3 mt-12 mb-5">
          <span className="text-2xl">{emojiMatch[1]}</span>
          <h2 className="text-2xl font-bold text-gray-900 leading-snug">
            {renderMarkup(emojiMatch[2], `emoji-${i}`)}
          </h2>
        </div>
      );
    }

    // Default paragraph
    return (
      <p key={i} className="text-gray-700 leading-relaxed text-lg mb-6">
        {para.split("\n").map((line, j, arr) => (
          <span key={j}>
            {renderProse(line, ctx, `p-${i}-${j}`)}
            {j < arr.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  });
}
