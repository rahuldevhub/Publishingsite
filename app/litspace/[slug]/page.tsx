import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import Link from "next/link";
import LikeButton from "./LikeButton";
import CommentForm from "./CommentForm";

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = createServerClient();
  const { slug } = await params;
  const { data: post } = await supabase
    .from("litspace_posts")
    .select("title, meta_title, meta_description, excerpt, writer_name")
    .eq("slug", slug)
    .eq("approved", true)
    .single();

  if (!post) return { title: "Post Not Found" };

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt || `A post by ${post.writer_name} on LitSpace.`;
  const url = `${SITE_URL}/litspace/${slug}`;

  return {
    title: `${title} | LitSpace — Ritera Publishing`,
    description,
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary", title, description },
    alternates: { canonical: url },
  };
}

// ── Content Renderer ──────────────────────────────────────────────────────────

function renderContent(content: string) {
  return content.split(/\n\n+/).map((para, i) => {
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
      <p key={i} className="text-gray-800 leading-relaxed text-lg mb-6">
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

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function LitspacePostPage({ params }: PageProps) {
  const supabase = createServerClient();
  const { slug } = await params;

  const { data: post } = await supabase
    .from("litspace_posts")
    .select(
      "id, title, slug, subtitle, content, excerpt, writer_name, author_bio, created_at, featured, meta_title, meta_description, category:litspace_categories(id, name, slug)"
    )
    .eq("slug", slug)
    .eq("approved", true)
    .single();

  if (!post) notFound();

  const category = post.category as unknown as { id: string; name: string; slug: string } | null;

  // Parallel fetch: comments, related posts, like count
  const [{ data: comments }, { data: relatedPosts }, { count: likesCount }] = await Promise.all([
    supabase
      .from("comments")
      .select("id, author_name, content, created_at")
      .eq("litspace_post_id", post.id)
      .eq("approved", true)
      .order("created_at", { ascending: true }),
    category
      ? supabase
          .from("litspace_posts")
          .select("id, title, slug, excerpt, writer_name, created_at, category:litspace_categories(name, slug)")
          .eq("approved", true)
          .eq("category_id", category.id)
          .neq("id", post.id)
          .order("created_at", { ascending: false })
          .limit(4)
      : Promise.resolve({ data: [] }),
    supabase
      .from("post_likes")
      .select("id", { count: "exact", head: true })
      .eq("post_id", post.id),
  ]);

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || "",
    datePublished: post.created_at,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/litspace/${slug}`,
    },
    author: {
      "@type": "Person",
      name: post.writer_name,
    },
    publisher: {
      "@type": "Organization",
      name: "Ritera Publishing",
      url: SITE_URL,
    },
  };

  const postUrl = `${SITE_URL}/litspace/${slug}`;
  const shareTitle = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(postUrl);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-white pt-16">
        {/* ── Breadcrumbs ── */}
        <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
          <ol className="max-w-4xl mx-auto px-6 py-3 flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-gray-900 transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li><Link href="/litspace" className="hover:text-gray-900 transition-colors">LitSpace</Link></li>
            {category && (
              <>
                <li aria-hidden="true" className="text-gray-400">/</li>
                <li>
                  <Link
                    href={`/litspace/category/${category.slug}`}
                    className="hover:text-gray-900 transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium line-clamp-1" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* ── Post Header ── */}
        <header className="max-w-3xl mx-auto px-6 pt-12 pb-8">
          {category && (
            <Link
              href={`/litspace/category/${category.slug}`}
              className="inline-block text-xs font-semibold tracking-widest text-gray-500 uppercase hover:text-gray-800 mb-4 transition-colors"
            >
              {category.name}
            </Link>
          )}
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="text-xl text-gray-500 italic mb-4">{post.subtitle}</p>
          )}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 border-t border-gray-100 pt-5">
            <span className="font-medium text-gray-700">{post.writer_name}</span>
            <span>{formatDate(post.created_at)}</span>
            {(likesCount ?? 0) > 0 && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-red-400 fill-red-400" viewBox="0 0 24 24">
                  <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                {likesCount} {likesCount === 1 ? "like" : "likes"}
              </span>
            )}
          </div>
        </header>

        {/* ── Post Content ── */}
        <article className="max-w-3xl mx-auto px-6 pb-12">
          <div className="prose-content">
            {renderContent(post.content)}
          </div>

          {/* ── Excerpt / Description ── */}
          {post.excerpt && post.excerpt.trim() !== "" && (
            <p className="text-xl text-gray-600 leading-relaxed mt-8 mb-2">{post.excerpt}</p>
          )}

          {/* ── Author Bio ── */}
          {post.author_bio && (
            <div className="mt-10 bg-gray-50 rounded-2xl border border-gray-200 p-6">
              <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">About the Writer</p>
              <p className="font-semibold text-gray-900 text-sm mb-2">{post.writer_name}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{post.author_bio}</p>
            </div>
          )}

          {/* ── Like + Share ── */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-4">
              <LikeButton postId={post.id} initialCount={likesCount ?? 0} />
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-500 mr-1">Share:</span>
                <a
                  href={`https://x.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* ── Comments ── */}
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Comments
              {comments && comments.length > 0 && (
                <span className="ml-2 text-base font-normal text-gray-500">
                  ({comments.length})
                </span>
              )}
            </h2>

            {/* Approved Comments */}
            {comments && comments.length > 0 ? (
              <div className="space-y-6 mb-10">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-gray-900 text-sm">
                        {comment.author_name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mb-10">
                No comments yet. Be the first to share your thoughts!
              </p>
            )}

            {/* Comment Form */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-5">Leave a Comment</h3>
              <CommentForm postId={post.id} />
            </div>
          </div>
        </section>

        {/* ── Related Posts ── */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-6 py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                More from {category?.name ?? "LitSpace"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {(
                  relatedPosts as unknown as Array<{
                    id: string;
                    title: string;
                    slug: string;
                    excerpt: string | null;
                    writer_name: string;
                    created_at: string;
                    category: { name: string; slug: string } | null;
                  }>
                ).map((related) => (
                  <Link
                    key={related.id}
                    href={`/litspace/${related.slug}`}
                    className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-400 hover:shadow-sm transition-all"
                  >
                    {related.category && (
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {related.category.name}
                      </span>
                    )}
                    <h3 className="mt-1 font-semibold text-gray-900 group-hover:text-gray-600 transition-colors leading-snug line-clamp-2 text-sm">
                      {related.title}
                    </h3>
                    <p className="mt-2 text-xs text-gray-500">
                      {related.writer_name} · {formatDate(related.created_at)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
