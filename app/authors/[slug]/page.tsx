import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "../../components/FadeIn";
import ShareButtons from "./ShareButtons";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";

type PageProps = { params: Promise<{ slug: string }> };

type InterviewVideo = { title: string; youtube_id: string; date?: string };

type Author = {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  image_url: string | null;
  instagram: string | null;
  linkedin: string | null;
  twitter: string | null;
  interview_videos: InterviewVideo[] | null;
};

type Book = {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  cover_image: string | null;
  genre: string | null;
  format: string;
  language: string;
  published_date: string | null;
  featured: boolean;
  amazon_link: string | null;
  flipkart_link: string | null;
};

// ── generateMetadata ────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = createServerClient();
  const { slug } = await params;
  const { data } = await supabase
    .from("authors")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "Author Not Found" };

  const title = `${data.name} — Author Portfolio | Ritera Publishing`;
  const description =
    data.bio?.slice(0, 155) ??
    `${data.name} is a published author with Ritera Publishing.`;
  const url = `${SITE_URL}/authors/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "profile",
      ...(data.image_url && {
        images: [{ url: data.image_url, width: 400, height: 400, alt: data.name }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(data.image_url && { images: [data.image_url] }),
    },
    alternates: { canonical: url },
  };
}

// ── Page ────────────────────────────────────────────────────────────────────

export default async function AuthorPortfolioPage({ params }: PageProps) {
  const supabase = createServerClient();
  const { slug } = await params;

  const { data: authorData, error: authorError } = await supabase
    .from("authors")
    .select("*")
    .eq("slug", slug)
    .single();

  if (authorError) {
    console.error("[AuthorPortfolioPage] query error:", authorError.message);
  }

  if (!authorData) notFound();

  const author = authorData as unknown as Author;

  const { data: booksData } = await supabase
    .from("books")
    .select(
      "id, title, subtitle, slug, cover_image, genre, format, language, published_date, featured, amazon_link, flipkart_link"
    )
    .eq("author_id", author.id)
    .order("published_date", { ascending: false });

  const books = (booksData ?? []) as Book[];
  const videos: InterviewVideo[] = Array.isArray(author.interview_videos)
    ? author.interview_videos
    : [];

  const publishedYear =
    books
      .filter((b) => b.published_date)
      .map((b) => new Date(b.published_date!).getFullYear())
      .sort()[0] ?? null;

  const hasSocials = author.instagram || author.linkedin || author.twitter;
  const pageUrl = `${SITE_URL}/authors/${slug}`;

  // First sentence of bio as tagline
  const tagline = author.bio
    ? author.bio.split(/(?<=[.!?])\s/)[0].replace(/[.!?]$/, "").trim()
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    ...(author.bio && { description: author.bio }),
    ...(author.image_url && { image: author.image_url }),
    url: pageUrl,
    worksFor: { "@type": "Organization", name: "Ritera Publishing", url: SITE_URL },
    ...(author.instagram && {
      sameAs: [`https://instagram.com/${author.instagram.replace("@", "")}`],
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden">
          {/* Dot grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
            }}
          />
          {/* Amber glow orbs */}
          <div className="absolute top-0 right-0 w-[32rem] h-[32rem] bg-amber-500 opacity-[0.07] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400 opacity-[0.05] rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
            <div className="flex flex-col items-center text-center">

              {/* Verified badge */}
              <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-xs font-semibold tracking-widest uppercase">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Published with Ritera Publishing
              </div>

              {/* Author photo */}
              <div className="relative mb-8">
                <div className="w-40 h-40 lg:w-52 lg:h-52 rounded-full ring-4 ring-amber-400 ring-offset-4 ring-offset-gray-900 overflow-hidden shadow-2xl">
                  {author.image_url ? (
                    <Image
                      src={author.image_url}
                      alt={author.name}
                      width={208}
                      height={208}
                      className="object-cover w-full h-full"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                      <span className="text-6xl font-bold text-white select-none">
                        {author.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <span
                  className="absolute bottom-2 right-2 w-5 h-5 bg-green-400 rounded-full border-2 border-gray-900"
                  title="Active author"
                />
              </div>

              {/* Name */}
              <h1 className="text-5xl lg:text-7xl font-bold font-serif tracking-tight text-white mb-5 leading-none">
                {author.name}
              </h1>

              {/* Tagline */}
              {tagline && (
                <p className="text-lg lg:text-xl text-gray-300 max-w-lg leading-relaxed mb-10 font-light">
                  {tagline}
                </p>
              )}

              {/* Stat pills */}
              {(books.length > 0 || publishedYear) && (
                <div className="flex flex-wrap items-center justify-center gap-8 mb-10 text-sm">
                  {books.length > 0 && (
                    <div className="text-center">
                      <p className="text-3xl font-bold text-amber-400 leading-none mb-1">
                        {books.length}
                      </p>
                      <p className="text-gray-400 text-xs uppercase tracking-wide">
                        {books.length === 1 ? "Book" : "Books"} Published
                      </p>
                    </div>
                  )}
                  {books.length > 0 && (
                    <div className="w-px h-10 bg-gray-700 hidden sm:block" />
                  )}
                  <div className="text-center">
                    <p className="text-3xl font-bold text-amber-400 leading-none mb-1">50+</p>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">Countries Reached</p>
                  </div>
                  {publishedYear && (
                    <>
                      <div className="w-px h-10 bg-gray-700 hidden sm:block" />
                      <div className="text-center">
                        <p className="text-3xl font-bold text-amber-400 leading-none mb-1">
                          {publishedYear}
                        </p>
                        <p className="text-gray-400 text-xs uppercase tracking-wide">Publishing Since</p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Social icons */}
              {hasSocials && (
                <div className="flex items-center gap-3 mb-12">
                  {author.instagram && (
                    <a
                      href={`https://instagram.com/${author.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  )}
                  {author.linkedin && (
                    <a
                      href={
                        author.linkedin.startsWith("http")
                          ? author.linkedin
                          : `https://linkedin.com/in/${author.linkedin}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  {author.twitter && (
                    <a
                      href={
                        author.twitter.startsWith("http")
                          ? author.twitter
                          : `https://twitter.com/${author.twitter.replace("@", "")}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter / X"
                      className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.264 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                      </svg>
                    </a>
                  )}
                </div>
              )}

              {/* Scroll cue */}
              <div className="flex flex-col items-center gap-2 text-gray-600 text-xs uppercase tracking-widest">
                <span>Scroll to explore</span>
                <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

            </div>
          </div>
        </section>

        {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
        {author.bio && (
          <section className="bg-white py-20 lg:py-28">
            <div className="max-w-5xl mx-auto px-6">
              <FadeIn>
                <p className="text-xs font-semibold tracking-widest text-amber-600 uppercase mb-3">
                  About the Author
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold font-serif text-gray-900 mb-12">
                  About {author.name}
                </h2>
              </FadeIn>

              <FadeIn delay={100}>
                <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16 items-start">
                  {/* Bio */}
                  <div className="mb-10 lg:mb-0">
                    {author.bio.split(/\n\n+/).map((para, i) => (
                      <p key={i} className="text-gray-600 leading-relaxed mb-5 text-base lg:text-lg">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Stats sidebar */}
                  <div className="space-y-4">
                    <div className="bg-gray-950 text-white rounded-2xl p-6 text-center">
                      <p className="text-5xl font-bold text-amber-400 leading-none mb-2">
                        {books.length}
                      </p>
                      <p className="text-xs text-gray-400 uppercase tracking-widest">Books Published</p>
                    </div>

                    {publishedYear && (
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center">
                        <p className="text-5xl font-bold text-gray-900 leading-none mb-2">
                          {publishedYear}
                        </p>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">Publishing Journey Began</p>
                      </div>
                    )}

                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 text-center">
                      <p className="text-5xl font-bold text-amber-700 leading-none mb-2">50+</p>
                      <p className="text-xs text-amber-600 uppercase tracking-widest">Countries Reached</p>
                    </div>

                    <div className="border-2 border-gray-900 rounded-2xl p-5 flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Ritera Publishing</p>
                        <p className="text-xs text-gray-500">Verified Author</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* ── PUBLISHED BOOKS ───────────────────────────────────────────────── */}
        {books.length > 0 && (
          <section className="bg-gray-950 py-20 lg:py-28">
            <div className="max-w-5xl mx-auto px-6">
              <FadeIn>
                <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
                  Portfolio
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold font-serif text-white mb-3">
                  Published Works
                </h2>
                <p className="text-gray-500 mb-14 text-sm">
                  {books.length === 1
                    ? "A debut work published with Ritera"
                    : `${books.length} titles published with Ritera Publishing`}
                </p>
              </FadeIn>

              <div
                className={`grid gap-6 ${
                  books.length === 1
                    ? "max-w-[200px]"
                    : books.length === 2
                    ? "grid-cols-2 max-w-sm"
                    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                }`}
              >
                {books.map((book, i) => (
                  <FadeIn key={book.id} delay={i * 80} offset={30}>
                    <Link href={`/books/${book.slug}`} className="group block">
                      {/* Cover */}
                      <div className="relative aspect-[2/3] bg-gray-800 rounded-xl overflow-hidden mb-4 shadow-lg group-hover:shadow-2xl group-hover:shadow-amber-500/10 transition-all duration-500">
                        {book.cover_image ? (
                          <Image
                            src={book.cover_image}
                            alt={book.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            loading={i < 4 ? "eager" : "lazy"}
                          />
                        ) : (
                          <img src="https://placehold.co/400x600" alt="Placeholder Image" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                        )}

                        {/* Genre badge */}
                        {book.genre && (
                          <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                            {book.genre}
                          </span>
                        )}

                        {/* Hover CTA */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <span className="text-xs font-bold text-white bg-amber-500 px-4 py-2 rounded-lg w-full text-center">
                            View Book →
                          </span>
                        </div>
                      </div>

                      {/* Meta */}
                      <h3 className="font-semibold text-white text-sm leading-snug mb-1 group-hover:text-amber-400 transition-colors line-clamp-2">
                        {book.title}
                      </h3>
                      {book.published_date && (
                        <p className="text-xs text-gray-500">
                          {new Date(book.published_date).getFullYear()}
                        </p>
                      )}
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── INTERVIEWS ────────────────────────────────────────────────────── */}
        {videos.length > 0 && (
          <section className="bg-white py-20 lg:py-28">
            <div className="max-w-5xl mx-auto px-6">
              <FadeIn>
                <p className="text-xs font-semibold tracking-widest text-amber-600 uppercase mb-3">
                  Video
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold font-serif text-gray-900 mb-3">
                  In Conversation with {author.name}
                </h2>
                <p className="text-gray-500 mb-14 max-w-xl">
                  Hear about their writing journey, inspiration, and creative process.
                </p>
              </FadeIn>

              <div className={`grid gap-10 ${videos.length === 1 ? "max-w-2xl" : "sm:grid-cols-2"}`}>
                {videos.map((video, i) => (
                  <FadeIn key={i} delay={i * 120}>
                    <div>
                      <div className="relative w-full rounded-2xl overflow-hidden shadow-xl aspect-video mb-4 bg-gray-100">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtube_id}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-base mb-1">{video.title}</h3>
                      {video.date && (
                        <p className="text-xs text-gray-400">
                          {new Intl.DateTimeFormat("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }).format(new Date(video.date))}
                        </p>
                      )}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CONNECT ───────────────────────────────────────────────────────── */}
        <section className="bg-gray-50 border-t border-gray-100 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <FadeIn>
              <p className="text-xs font-semibold tracking-widest text-amber-600 uppercase mb-3">
                Get in Touch
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold font-serif text-gray-900 mb-4">
                Connect with {author.name}
              </h2>
              <p className="text-gray-500 mb-12 max-w-md mx-auto">
                Follow their writing journey and stay updated with their latest works.
              </p>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {author.instagram && (
                  <a
                    href={`https://instagram.com/${author.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm shadow-lg shadow-pink-100"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Follow on Instagram
                  </a>
                )}

                {author.linkedin && (
                  <a
                    href={
                      author.linkedin.startsWith("http")
                        ? author.linkedin
                        : `https://linkedin.com/in/${author.linkedin}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#0A66C2] text-white font-semibold rounded-xl hover:bg-[#0958a8] transition-colors text-sm shadow-lg shadow-blue-100"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    Connect on LinkedIn
                  </a>
                )}

                {author.twitter && (
                  <a
                    href={
                      author.twitter.startsWith("http")
                        ? author.twitter
                        : `https://twitter.com/${author.twitter.replace("@", "")}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3.5 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition-colors text-sm shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.264 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                    </svg>
                    Follow on X
                  </a>
                )}

                {!hasSocials && (
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors text-sm"
                  >
                    Contact via Ritera →
                  </Link>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── SHARE ─────────────────────────────────────────────────────────── */}
        <section className="bg-gray-950 py-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
              Spread the Word
            </p>
            <h2 className="text-2xl font-bold font-serif text-white mb-2">Share This Author</h2>
            <p className="text-gray-500 text-sm mb-8">
              Help {author.name} reach more readers.
            </p>
            <ShareButtons name={author.name} url={pageUrl} />
          </div>
        </section>

        {/* ── FOOTER CTA ────────────────────────────────────────────────────── */}
        <div className="bg-amber-50 border-t border-amber-100 py-10">
          <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="font-bold text-gray-900">Are you a writer?</p>
              <p className="text-gray-500 text-sm mt-0.5">
                Publish your story with Ritera Publishing and get your own portfolio page.
              </p>
            </div>
            <Link
              href="/packages"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors text-sm"
            >
              View Publishing Packages →
            </Link>
          </div>
        </div>

      </main>
    </>
  );
}
