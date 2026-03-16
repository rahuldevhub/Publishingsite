import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
  const { slug } = await params;
  const { data: book } = await supabase
    .from("books")
    .select("title, subtitle, short_description, description, cover_image, author:authors(name)")
    .eq("slug", slug)
    .single();

  if (!book) return { title: "Book Not Found" };

  const author = book.author as unknown as { name: string } | null;
  const title = book.subtitle ? `${book.title}: ${book.subtitle}` : book.title;
  const description =
    book.short_description ||
    book.description?.slice(0, 155) ||
    `${book.title} by ${author?.name ?? "Ritera Publishing"}. Available now.`;
  const url = `${SITE_URL}/books/${slug}`;

  return {
    title: `${title} | Ritera Publishing`,
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
  const { slug } = await params;

  const { data: book } = await supabase
    .from("books")
    .select(
      "id, title, subtitle, slug, short_description, description, cover_image, isbn, language, page_count, genre, format, amazon_link, flipkart_link, publisher_link, published_date, featured, created_at, author:authors(id, name, slug, bio, image_url)"
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

  const bookDetails = [
    ...(book.isbn ? [{ label: "ISBN", value: book.isbn }] : []),
    ...(book.page_count ? [{ label: "Pages", value: String(book.page_count) }] : []),
    ...(book.published_date ? [{ label: "Published", value: formatDate(book.published_date) }] : []),
    { label: "Format", value: book.format },
    { label: "Language", value: book.language },
    ...(book.genre ? [{ label: "Genre", value: book.genre }] : []),
  ];

  const hasPurchaseLinks = book.amazon_link || book.flipkart_link || book.publisher_link;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-white">
        {/* ── Breadcrumbs ── */}
        <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
          <ol className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-gray-900 transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li><Link href="/books" className="hover:text-gray-900 transition-colors">Books</Link></li>
            {book.genre && (
              <>
                <li aria-hidden="true" className="text-gray-400">/</li>
                <li>
                  <Link href={`/books?genre=${encodeURIComponent(book.genre)}`} className="hover:text-gray-900 transition-colors">
                    {book.genre}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium line-clamp-1" aria-current="page">{book.title}</li>
          </ol>
        </nav>

        {/* ── Product Layout ── */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="lg:grid lg:grid-cols-5 lg:gap-12">

            {/* ── LEFT: Cover Image ── */}
            <div className="lg:col-span-2 mb-8 lg:mb-0">
              <div className="sticky top-8">
                {/* Main cover */}
                <div className="relative aspect-[2/3] bg-gray-100 rounded-2xl overflow-hidden shadow-lg group">
                  {book.cover_image ? (
                    <Image
                      src={book.cover_image}
                      alt={book.title}
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  ) : (
                    <img src="https://placehold.co/400x600" alt="Placeholder Image" className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  {book.featured && (
                    <span className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                {/* Mobile purchase buttons */}
                {hasPurchaseLinks && (
                  <div className="mt-6 lg:hidden space-y-3">
                    <PurchaseButtons book={book} />
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT: Book Details ── */}
            <div className="lg:col-span-3">
              {/* Genre */}
              {book.genre && (
                <Link
                  href={`/books?genre=${encodeURIComponent(book.genre)}`}
                  className="inline-block text-xs font-semibold tracking-widest text-gray-500 uppercase hover:text-gray-800 mb-3 transition-colors"
                >
                  {book.genre}
                </Link>
              )}

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2">
                {book.title}
              </h1>
              {book.subtitle && (
                <p className="text-xl text-gray-600 mb-4">{book.subtitle}</p>
              )}

              {/* Author */}
              {author && (
                <p className="text-base text-gray-700 mb-5">
                  by{" "}
                  <Link
                    href={`/authors/${author.slug}`}
                    className="font-semibold text-gray-900 hover:underline underline-offset-2"
                  >
                    {author.name}
                  </Link>
                </p>
              )}

              {/* Format / Language badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  {book.format}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                  {book.language}
                </span>
                {book.page_count && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    {book.page_count} pages
                  </span>
                )}
              </div>

              {/* Short Description */}
              {book.short_description && (
                <p className="text-gray-700 leading-relaxed mb-6 text-base border-l-4 border-gray-200 pl-4 italic">
                  {book.short_description}
                </p>
              )}

              {/* ── Purchase Buttons (desktop) ── */}
              {hasPurchaseLinks && (
                <div className="hidden lg:block mb-8">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Available At
                  </p>
                  <div className="space-y-3">
                    <PurchaseButtons book={book} />
                  </div>
                </div>
              )}

              {/* Book Details Table */}
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 mb-6">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                  Book Details
                </h2>
                <dl className="space-y-3">
                  {bookDetails.map(({ label, value }) => (
                    <div key={label} className="flex items-start justify-between gap-4 text-sm">
                      <dt className="text-gray-500 shrink-0">{label}</dt>
                      <dd className="font-medium text-gray-900 text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Back link */}
              <Link
                href="/books"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                ← Back to all books
              </Link>
            </div>
          </div>
        </div>

        {/* ── Full Description ── */}
        {book.description && (
          <section className="max-w-4xl mx-auto px-6 pb-16">
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Book</h2>
              <div className="prose-content space-y-4">
                {book.description.split(/\n\n+/).map((para: string, i: number) => (
                  <p key={i} className="text-gray-700 leading-relaxed text-base">
                    {para.split("\n").map((line: string, j: number, arr: string[]) => (
                      <span key={j}>
                        {line}
                        {j < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Author Bio ── */}
        {author && (author.bio || author.image_url) && (
          <section className="max-w-4xl mx-auto px-6 pb-16">
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
              <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-5">
                About the Author
              </p>
              <div className="flex items-start gap-5">
                {author.image_url ? (
                  <Image
                    src={author.image_url}
                    alt={author.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <span className="text-2xl font-bold text-gray-400">{author.name.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{author.name}</h2>
                  {author.bio && (
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">{author.bio}</p>
                  )}
                  <Link
                    href={`/authors/${author.slug}`}
                    className="mt-3 inline-block text-sm font-medium text-gray-900 underline underline-offset-2 hover:text-gray-600 transition-colors"
                  >
                    View all books by {author.name} →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── You May Also Like ── */}
        {relatedBooks && relatedBooks.length > 0 && (
          <section className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {(
                  relatedBooks as unknown as Array<{
                    id: string;
                    title: string;
                    slug: string;
                    cover_image: string | null;
                    genre: string;
                    author: { name: string } | null;
                  }>
                ).map((related) => (
                  <Link
                    key={related.id}
                    href={`/books/${related.slug}`}
                    className="group"
                  >
                    <div className="relative aspect-[2/3] bg-gray-100 rounded-xl overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                      {related.cover_image ? (
                        <Image
                          src={related.cover_image}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 50vw, 25vw"
                          loading="lazy"
                        />
                      ) : (
                        <img src="https://placehold.co/300x450" alt="Placeholder Image" className="absolute inset-0 w-full h-full object-cover" />
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-gray-600 transition-colors">
                      {related.title}
                    </h3>
                    {related.author && (
                      <p className="text-xs text-gray-500 mt-0.5">by {related.author.name}</p>
                    )}
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

// ── Purchase Buttons Component ────────────────────────────────────────────────

function PurchaseButtons({
  book,
}: {
  book: { amazon_link: string | null; flipkart_link: string | null; publisher_link: string | null };
}) {
  return (
    <>
      {book.amazon_link && (
        <a
          href={book.amazon_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#FF9900] hover:bg-[#FA8900] transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.699-3.182v.685zm3.186 7.705c-.209.189-.512.201-.745.076-1.047-.872-1.234-1.276-1.814-2.106-1.734 1.767-2.962 2.297-5.209 2.297-2.66 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.099v-.41c0-.753.06-1.642-.383-2.294-.385-.579-1.124-.818-1.775-.818-1.205 0-2.277.618-2.54 1.9-.054.285-.261.567-.549.582l-3.061-.33c-.259-.058-.548-.266-.472-.662C5.765.356 8.764 0 11.586 0c1.445 0 3.332.385 4.47 1.481C17.405 2.718 17.3 4.35 17.3 6.13v4.805c0 1.443.597 2.076 1.162 2.854.199.278.243.611-.01.82l-1.308 1.186zm3.441 2.988c-5.523 4.215-13.528 6.452-20.428 3.445-5.29-2.359-8.757-7.053-8.757-12.109 0-.697.576-1.052 1.166-.705 5.148 3.138 14.249 8.328 23.006 4.534.781-.341 1.442.469.013 1.835h-.004z" />
          </svg>
          Buy on Amazon
        </a>
      )}
      {book.flipkart_link && (
        <a
          href={book.flipkart_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-xl font-bold text-sm text-gray-900 bg-[#FFE500] hover:bg-[#FFD700] transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3h18v18H3z" fillOpacity="0" />
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Buy on Flipkart
        </a>
      )}
      {book.publisher_link && (
        <a
          href={book.publisher_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-xl font-bold text-sm text-gray-900 bg-white border-2 border-gray-900 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          Buy from Publisher
        </a>
      )}
    </>
  );
}
