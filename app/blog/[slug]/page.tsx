import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";

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
    .select("title, meta_title, meta_description, excerpt, featured_image")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) return { title: "Post Not Found" };

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt || "";
  const url = `${SITE_URL}/blog/${slug}`;
  const image = post.featured_image;

  return {
    title: `${title} | Ritera Publishing Blog`,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      ...(image && { images: [{ url: image, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image] }),
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
      "id, title, slug, excerpt, content, featured_image, reading_time, created_at, updated_at, featured, category:blog_categories(id, name, slug), author:authors(id, name, slug, bio, image_url, instagram, twitter)"
    )
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

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

  // Related posts (same category, exclude current)
  const { data: relatedPosts } = category
    ? await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, featured_image, reading_time, created_at")
        .eq("published", true)
        .eq("category_id", category.id)
        .neq("id", post.id)
        .order("created_at", { ascending: false })
        .limit(4)
    : { data: [] };

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || "",
    image: post.featured_image || undefined,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
    author: author
      ? { "@type": "Person", name: author.name, url: `${SITE_URL}/authors/${author.slug}` }
      : { "@type": "Organization", name: "Ritera Publishing" },
    publisher: {
      "@type": "Organization",
      name: "Ritera Publishing",
      url: SITE_URL,
    },
  };

  const postUrl = `${SITE_URL}/blog/${slug}`;
  const shareTitle = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(postUrl);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-6">{post.excerpt}</p>
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
          <div className="max-w-5xl mx-auto px-6 pb-10">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100">
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
        <article className="max-w-2xl mx-auto px-6 pb-16">
          <div className="prose-content">
            {renderContent(post.content)}
          </div>

          {/* ── Share Buttons ── */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">Share this article</p>
            <div className="flex items-center gap-3">
              <a
                href={`https://x.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
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
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Share on LinkedIn
              </a>
            </div>
          </div>
        </article>

        {/* ── Author Bio ── */}
        {author && (author.bio || author.image_url) && (
          <aside className="max-w-2xl mx-auto px-6 pb-16">
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
              <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-5">About the Author</p>
              <div className="flex items-start gap-5">
                {author.image_url ? (
                  <Image
                    src={author.image_url}
                    alt={author.name}
                    width={72}
                    height={72}
                    className="rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-18 h-18 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <span className="text-2xl font-bold text-gray-400">{author.name.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{author.name}</h2>
                  {author.bio && (
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">{author.bio}</p>
                  )}
                  <div className="mt-3 flex items-center gap-3">
                    {author.instagram && (
                      <a href={author.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors text-xs">Instagram</a>
                    )}
                    {author.twitter && (
                      <a href={author.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-500 transition-colors text-xs">Twitter / X</a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* ── Related Posts ── */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-6 py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(relatedPosts as unknown as Array<{
                  id: string; title: string; slug: string;
                  excerpt: string | null; featured_image: string | null;
                  reading_time: number; created_at: string;
                }>).map((related) => (
                  <article key={related.id} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <Link href={`/blog/${related.slug}`} className="block relative aspect-video bg-gray-100 overflow-hidden">
                      {related.featured_image ? (
                        <Image
                          src={related.featured_image}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 25vw"
                          loading="lazy"
                        />
                      ) : (
                        <img src="https://placehold.co/400x300" alt="Placeholder Image" className="absolute inset-0 w-full h-full object-cover" />
                      )}
                    </Link>
                    <div className="p-4">
                      <Link href={`/blog/${related.slug}`}>
                        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-gray-600 transition-colors">
                          {related.title}
                        </h3>
                      </Link>
                      <p className="mt-2 text-xs text-gray-400">
                        {formatDate(related.created_at)} · {related.reading_time} min read
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

// ── Content Renderer ─────────────────────────────────────────────────────────

function renderContent(content: string) {
  const paragraphs = content.split(/\n\n+/);
  return paragraphs.map((para, i) => {
    // Basic markdown heading support
    if (para.startsWith("## ")) {
      return (
        <h2 key={i} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          {para.slice(3)}
        </h2>
      );
    }
    if (para.startsWith("### ")) {
      return (
        <h3 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3">
          {para.slice(4)}
        </h3>
      );
    }
    return (
      <p key={i} className="text-gray-700 leading-relaxed text-lg mb-6">
        {para.split("\n").map((line, j, arr) => (
          <span key={j}>
            {line}
            {j < arr.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  });
}
