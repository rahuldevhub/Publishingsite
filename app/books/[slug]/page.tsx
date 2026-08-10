import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { guideForGenre } from "@/lib/internal-links";
import FadeIn from "@/app/components/FadeIn";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";

type PageProps = { params: Promise<{ slug: string }> };

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr));
}

// ── generateMetadata ──────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = createServerClient();
  const { slug } = await params;
  const { data: book } = await supabase
    .from("books")
    .select("title, subtitle, meta_description, short_description, description, cover_image, author:authors(name)")
    .eq("slug", slug)
    .single();

  if (!book) return { title: "Book Not Found" };

  const author = book.author as unknown as { name: string } | null;
  const title = book.subtitle ? `${book.title}: ${book.subtitle}` : book.title;
  const description =
    book.meta_description ||
    book.short_description ||
    book.description?.slice(0, 155) ||
    `${title} by ${author?.name ?? "Ritera Publishing"}. Available from Ritera Publishing.`;
  const url = `${SITE_URL}/books/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "book",
      ...(book.cover_image && {
        images: [{ url: book.cover_image, width: 800, height: 1200, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(book.cover_image && { images: [book.cover_image] }),
    },
    alternates: { canonical: url },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function BookDetailPage({ params }: PageProps) {
  const supabase = createServerClient();
  const { slug } = await params;

  const { data: book } = await supabase
    .from("books")
    .select(
      "id, title, subtitle, slug, short_description, description, cover_image, isbn, language, page_count, genre, format, amazon_link, flipkart_link, publisher_link, ebook_link, purchase_link_international, purchase_link_pothi, purchase_link_library, published_date, featured, created_at, author:authors(id, name, slug, bio, image_url)"
    )
    .eq("slug", slug)
    .single();

  if (!book) notFound();

  const author = book.author as unknown as {
    id: string;
    name: string;
    slug: string;
    bio: string | null;
    image_url: string | null;
  } | null;

  // Related books — same genre, exclude current
  const { data: relatedBooks } = await supabase
    .from("books")
    .select("id, title, slug, cover_image, genre, author:authors(name)")
    .eq("genre", book.genre)
    .neq("id", book.id)
    .limit(4);

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    ...(book.subtitle && { alternativeHeadline: book.subtitle }),
    description: book.short_description || book.description || undefined,
    ...(book.cover_image && { image: book.cover_image }),
    ...(book.isbn && { isbn: book.isbn }),
    ...(book.page_count && { numberOfPages: book.page_count }),
    inLanguage: book.language,
    ...(book.published_date && { datePublished: book.published_date }),
    author: author
      ? { "@type": "Person", name: author.name, url: `${SITE_URL}/authors/${author.slug}` }
      : { "@type": "Organization", name: "Ritera Publishing" },
    publisher: {
      "@type": "Organization",
      name: "Ritera Publishing",
      url: SITE_URL,
    },
    ...(book.amazon_link || book.flipkart_link || book.publisher_link
      ? {
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            url: book.amazon_link || book.flipkart_link || book.publisher_link,
            priceCurrency: "INR",
          },
        }
      : {}),
    url: `${SITE_URL}/books/${slug}`,
  };

  // Refined editorial metadata — only fields that exist for this book.
  const bookDetails = [
    { label: "Format", value: book.format },
    { label: "Language", value: book.language },
    ...(book.page_count ? [{ label: "Pages", value: `${book.page_count} pages` }] : []),
    ...(book.genre ? [{ label: "Genre", value: book.genre }] : []),
    ...(book.isbn ? [{ label: "ISBN", value: book.isbn }] : []),
    ...(book.published_date ? [{ label: "Published", value: formatDate(book.published_date) }] : []),
  ].filter((d) => d.value);

  const hasPurchaseLinks = book.amazon_link || book.flipkart_link || book.publisher_link || book.ebook_link || book.purchase_link_international || book.purchase_link_pothi || book.purchase_link_library;

  const guide = guideForGenre(book.genre);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://riterapublishing.com" },
      { "@type": "ListItem", position: 2, name: "Books", item: "https://riterapublishing.com/books" },
      { "@type": "ListItem", position: 3, name: book.title, item: `https://riterapublishing.com/books/${book.slug}` },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* JSON-LD — BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="bg-white text-gray-900">
        {/* ── Breadcrumbs ── */}
        <nav aria-label="Breadcrumb" className="border-b border-gray-100">
          <ol className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-gray-500">
            <li><Link href="/" className="hover:text-gray-900 transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-gray-300">/</li>
            <li><Link href="/books" className="hover:text-gray-900 transition-colors">Books</Link></li>
            {book.genre && (
              <>
                <li aria-hidden="true" className="text-gray-300">/</li>
                <li>
                  <Link href={`/books?genre=${encodeURIComponent(book.genre)}`} className="hover:text-gray-900 transition-colors">
                    {book.genre}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true" className="text-gray-300">/</li>
            <li className="text-gray-900 line-clamp-1" aria-current="page">{book.title}</li>
          </ol>
        </nav>

        {/* ══════════════════ HERO — editorial ══════════════════ */}
        <section className="max-w-6xl mx-auto px-6 pt-12 pb-14 lg:pt-16 lg:pb-20">
          {/* Editorial header — category, title, author, editorial line */}
          <FadeIn className="max-w-3xl">
            {book.genre && (
              <Link
                href={`/books?genre=${encodeURIComponent(book.genre)}`}
                className="inline-block text-[11px] font-semibold tracking-[0.24em] text-amber-600 uppercase hover:text-amber-700 transition-colors"
              >
                {book.genre}
              </Link>
            )}

            <h1 className="font-display font-semibold text-gray-900 leading-[1.05] mt-4 text-[34px] sm:text-[44px] lg:text-[54px]">
              {book.title}
            </h1>
            {book.subtitle && (
              <p className="mt-3 font-display italic text-gray-500 text-xl sm:text-2xl leading-snug">
                {book.subtitle}
              </p>
            )}

            {author && (
              <p className="mt-5 text-[15px] text-gray-600">
                by{" "}
                <Link
                  href={`/authors/${author.slug}`}
                  className="font-semibold text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-amber-500 transition-colors"
                >
                  {author.name}
                </Link>
              </p>
            )}

            {book.short_description && (
              <p className="mt-6 text-[17px] leading-relaxed text-gray-600 max-w-2xl">
                {book.short_description}
              </p>
            )}
          </FadeIn>

          {/* Hairline separating header from the artifact + details */}
          <div className="mt-10 lg:mt-12 border-t border-gray-100" />

          {/* The artifact (left) + details / purchase (right) — one composition */}
          <div className="mt-10 lg:mt-12 lg:flex lg:items-start lg:gap-14">
            {/* ── LEFT: transparent book — sits directly on the clean page ── */}
            <FadeIn className="shrink-0 flex justify-center lg:block">
              <div className="relative w-[188px] sm:w-[212px] lg:w-[236px]">
                {book.featured && (
                  <span className="absolute -top-3 -right-3 z-10 bg-gray-900 text-amber-300 text-[10px] font-semibold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full shadow-sm">
                    Featured
                  </span>
                )}
                {book.cover_image ? (
                  <Image
                    src={book.cover_image}
                    alt={book.title}
                    width={472}
                    height={708}
                    priority
                    sizes="(max-width: 640px) 188px, (max-width: 1024px) 212px, 236px"
                    className="w-full h-auto drop-shadow-[0_16px_24px_rgba(15,23,42,0.20)]"
                  />
                ) : (
                  <div className="w-full aspect-[2/3] rounded-sm bg-gray-100 ring-1 ring-black/5 flex items-center justify-center">
                    <span className="text-4xl font-display text-gray-300">{book.title.charAt(0)}</span>
                  </div>
                )}
              </div>
            </FadeIn>

            {/* ── RIGHT: metadata + purchase + publishing invitation ── */}
            <div className="flex-1 mt-10 lg:mt-0">
              {/* Refined metadata — small uppercase labels, quiet values */}
              <FadeIn>
                <p className="text-[11px] font-semibold tracking-[0.2em] text-gray-400 uppercase mb-1">
                  Details
                </p>
                <dl className="divide-y divide-gray-100">
                  {bookDetails.map(({ label, value }) => (
                    <div key={label} className="flex items-baseline justify-between gap-6 py-3">
                      <dt className="text-[11px] font-semibold tracking-[0.16em] text-gray-400 uppercase shrink-0">
                        {label}
                      </dt>
                      <dd className="text-[15px] text-gray-900 text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </FadeIn>

              {/* Purchase area */}
              {hasPurchaseLinks && (
                <FadeIn className="mt-10">
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-gray-400 uppercase mb-4">
                    Available At
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <PurchaseButtons book={book} />
                  </div>
                </FadeIn>
              )}

              {/* Publishing invitation — quiet editorial block, no card */}
              <FadeIn className="mt-10 pt-8 border-t border-gray-200">
                <p className="text-[11px] font-semibold tracking-[0.22em] text-amber-600 uppercase">
                  Want to publish your own book?
                </p>
                <p className="mt-3 font-display text-gray-900 text-lg sm:text-xl leading-snug max-w-md">
                  Your manuscript deserves to become a beautifully published book.
                </p>
                <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-2.5">
                  <Link
                    href="/packages"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-amber-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                  >
                    Start Publishing →
                  </Link>
                  <Link
                    href={`/blog/${guide.slug}`}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {guide.title} →
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ══════════════════ ABOUT THIS BOOK ══════════════════ */}
        {book.description && (
          <section className="border-t border-gray-100 bg-[#fcfbf9]">
            <div className="max-w-6xl mx-auto px-6 py-14 lg:py-20">
              <FadeIn>
                <p className="text-[11px] font-semibold tracking-[0.24em] text-amber-600 uppercase">
                  About This Book
                </p>
                <h2 className="font-display font-semibold text-gray-900 text-[28px] sm:text-[34px] mt-3">
                  The Story
                </h2>
              </FadeIn>

              <div className="mt-10 lg:mt-12 grid lg:grid-cols-12 lg:gap-16 items-start">
                {/* Main narrative */}
                <FadeIn className="lg:col-span-7">
                  <div className="space-y-5">
                    {book.description.split(/\n\n+/).map((para: string, i: number) => (
                      <p key={i} className="text-[17px] leading-[1.75] text-gray-700">
                        {para.split("\n").map((line: string, j: number, arr: string[]) => (
                          <span key={j}>
                            {line}
                            {j < arr.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                </FadeIn>

                {/* Editorial pull-quote (from existing tagline) or quiet detail block */}
                <FadeIn className="lg:col-span-5 mt-10 lg:mt-2" delay={120}>
                  {book.short_description ? (
                    <figure className="lg:sticky lg:top-10">
                      <div className="text-amber-400 font-display leading-none text-5xl select-none" aria-hidden="true">
                        &ldquo;
                      </div>
                      <blockquote className="mt-2 font-display italic text-gray-800 text-[22px] sm:text-[24px] leading-snug">
                        {book.short_description}
                      </blockquote>
                      {author && (
                        <figcaption className="mt-5 text-[13px] tracking-wide text-gray-500">
                          — {book.title}, {author.name}
                        </figcaption>
                      )}
                    </figure>
                  ) : (
                    <div className="lg:sticky lg:top-10 rounded-xl border border-gray-200 bg-white p-6">
                      <p className="text-[11px] font-semibold tracking-[0.2em] text-gray-400 uppercase mb-4">
                        At a Glance
                      </p>
                      <dl className="divide-y divide-gray-100">
                        {bookDetails.slice(0, 4).map(({ label, value }) => (
                          <div key={label} className="flex items-baseline justify-between gap-4 py-2.5">
                            <dt className="text-[12px] text-gray-400">{label}</dt>
                            <dd className="text-[14px] text-gray-900 text-right">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                </FadeIn>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════ ABOUT THE AUTHOR ══════════════════ */}
        {author && (author.bio || author.image_url) && (
          <section className="border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
              <FadeIn>
                <p className="text-[11px] font-semibold tracking-[0.24em] text-amber-600 uppercase mb-8">
                  About the Author
                </p>
                <div className="flex flex-col sm:flex-row items-start gap-7">
                  {author.image_url ? (
                    <Image
                      src={author.image_url}
                      alt={author.name}
                      width={200}
                      height={200}
                      sizes="112px"
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shrink-0 ring-1 ring-black/5"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-100 ring-1 ring-black/5 flex items-center justify-center shrink-0">
                      <span className="text-3xl font-display text-gray-300">{author.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="max-w-2xl">
                    <h3 className="font-display font-semibold text-gray-900 text-2xl">{author.name}</h3>
                    {author.bio && (
                      <p className="mt-3 text-[16px] leading-relaxed text-gray-600">{author.bio}</p>
                    )}
                    <Link
                      href={`/authors/${author.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-amber-700 transition-colors"
                    >
                      View all books by {author.name} →
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* ══════════════════ YOU MAY ALSO LIKE ══════════════════ */}
        {relatedBooks && relatedBooks.length > 0 && (
          <section className="border-t border-gray-100 bg-[#fcfbf9]">
            <div className="max-w-6xl mx-auto px-6 py-14 lg:py-20">
              <FadeIn>
                <p className="text-[11px] font-semibold tracking-[0.24em] text-amber-600 uppercase">
                  From the Catalogue
                </p>
                <h2 className="font-display font-semibold text-gray-900 text-[28px] sm:text-[34px] mt-3 mb-10">
                  You May Also Like
                </h2>
              </FadeIn>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                {(
                  relatedBooks as unknown as Array<{
                    id: string;
                    title: string;
                    slug: string;
                    cover_image: string | null;
                    genre: string;
                    author: { name: string } | null;
                  }>
                ).map((related, i) => (
                  <FadeIn key={related.id} delay={i * 70}>
                    <Link href={`/books/${related.slug}`} className="group block">
                      <div className="flex justify-center">
                        <div className="relative w-[132px] sm:w-[148px]">
                          {related.cover_image ? (
                            <Image
                              src={related.cover_image}
                              alt={related.title}
                              width={296}
                              height={444}
                              sizes="148px"
                              loading="lazy"
                              className="w-full h-auto drop-shadow-[0_12px_18px_rgba(15,23,42,0.18)] transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
                            />
                          ) : (
                            <div className="w-full aspect-[2/3] rounded-sm bg-gray-100 ring-1 ring-black/5 flex items-center justify-center">
                              <span className="text-2xl font-display text-gray-300">{related.title.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <h3 className="mt-4 text-center font-display font-medium text-gray-900 text-[15px] leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors">
                        {related.title}
                      </h3>
                      {related.author && (
                        <p className="text-center text-[13px] text-gray-500 mt-1">by {related.author.name}</p>
                      )}
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════ FINAL CTA ══════════════════ */}
        <section className="bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24 text-center">
            <FadeIn>
              <div className="flex items-center justify-center gap-2 mb-6" aria-hidden="true">
                <div className="h-px w-8 bg-amber-400/40" />
                <span className="text-amber-400/70 text-[9px] leading-none">✦</span>
                <div className="h-px w-8 bg-amber-400/40" />
              </div>
              <h2 className="font-display font-semibold text-white leading-[1.08] text-[32px] sm:text-[42px] lg:text-[48px]">
                Your Story Could Be Next.
              </h2>
              <p className="mt-6 text-gray-400 text-base lg:text-lg leading-relaxed max-w-xl mx-auto">
                Every published book started with an idea. We help authors turn that idea
                into something real — beautifully edited, designed, and shared with the world.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/packages"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 hover:-translate-y-0.5 transition-all duration-200 ease-out text-sm shadow-lg shadow-amber-400/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
                >
                  Start Publishing →
                </Link>
                <Link
                  href="/books"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-200 ease-out text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
                >
                  Explore the Catalogue
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  );
}

// ── Purchase Buttons Component ────────────────────────────────────────────────
// Restrained, editorial buttons — Amazon as the quiet primary, the rest as
// refined outline links. Sizing kept modest so the book stays the artifact.

function PurchaseButtons({
  book,
}: {
  book: {
    amazon_link: string | null;
    flipkart_link: string | null;
    publisher_link: string | null;
    ebook_link: string | null;
    purchase_link_international: string | null;
    purchase_link_pothi: string | null;
    purchase_link_library: string | null;
  };
}) {
  const primary =
    "inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-sm text-white bg-gray-900 hover:bg-gray-700 transition-colors";
  const outline =
    "inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-sm text-gray-900 bg-white border border-gray-300 hover:border-gray-900 transition-colors";

  return (
    <>
      {book.amazon_link && (
        <a href={book.amazon_link} target="_blank" rel="noopener noreferrer" className={primary}>
          <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.699-3.182v.685zm3.186 7.705c-.209.189-.512.201-.745.076-1.047-.872-1.234-1.276-1.814-2.106-1.734 1.767-2.962 2.297-5.209 2.297-2.66 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.099v-.41c0-.753.06-1.642-.383-2.294-.385-.579-1.124-.818-1.775-.818-1.205 0-2.277.618-2.54 1.9-.054.285-.261.567-.549.582l-3.061-.33c-.259-.058-.548-.266-.472-.662C5.765.356 8.764 0 11.586 0c1.445 0 3.332.385 4.47 1.481C17.405 2.718 17.3 4.35 17.3 6.13v4.805c0 1.443.597 2.076 1.162 2.854.199.278.243.611-.01.82l-1.308 1.186zm3.441 2.988c-5.523 4.215-13.528 6.452-20.428 3.445-5.29-2.359-8.757-7.053-8.757-12.109 0-.697.576-1.052 1.166-.705 5.148 3.138 14.249 8.328 23.006 4.534.781-.341 1.442.469.013 1.835h-.004z" />
          </svg>
          Buy on Amazon
        </a>
      )}
      {book.flipkart_link && (
        <a href={book.flipkart_link} target="_blank" rel="noopener noreferrer" className={outline}>
          Buy on Flipkart
        </a>
      )}
      {book.ebook_link && (
        <a href={book.ebook_link} target="_blank" rel="noopener noreferrer" className={outline}>
          Buy E-book
        </a>
      )}
      {book.publisher_link && (
        <a href={book.publisher_link} target="_blank" rel="noopener noreferrer" className={outline}>
          Buy from Publisher
        </a>
      )}
      {book.purchase_link_international && (
        <a href={book.purchase_link_international} target="_blank" rel="noopener noreferrer" className={outline}>
          Buy International
        </a>
      )}
      {book.purchase_link_pothi && (
        <a href={book.purchase_link_pothi} target="_blank" rel="noopener noreferrer" className={outline}>
          Buy on Pothi
        </a>
      )}
      {book.purchase_link_library && (
        <a href={book.purchase_link_library} target="_blank" rel="noopener noreferrer" className={outline}>
          Available in Library
        </a>
      )}
    </>
  );
}
