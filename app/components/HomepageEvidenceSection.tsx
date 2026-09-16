import Link from "next/link";
import { createServerClient } from "@/lib/supabase";

const EXPERT_AUTHORS = [
  {
    name: "Rakesh Sharma",
    expertise: "Leadership practitioner with more than two decades of automotive-industry experience.",
    book: "The Silent Turning",
    authorHref: "/authors/rakesh-sharma",
    bookHref: "/books/the-silent-turning",
  },
  {
    name: "Dr. Man Mohan Singh",
    expertise: "PhD in Social Work, NGO founder, and former Secretary General of the Community Radio Association of India.",
    book: "The Thrill of Life Never Ends—Not Even at 73",
    authorHref: "/authors/dr-man-mohan-singh",
    bookHref: "/books/the-thrill-of-life-never-ends-not-even-at-73",
  },
  {
    name: "Abhijit Mishra",
    expertise: "Author writing at the intersection of cybersecurity, human behaviour, trust, and leadership.",
    book: "The Trust Architect",
    authorHref: "/authors/abhijit-mishra",
    bookHref: "/books/the-trust-architect",
  },
] as const;

const OFFICIAL_REFERENCES = [
  {
    label: "ISBN guidance",
    detail: "Raja Rammohun Roy National Agency for ISBN, Government of India",
    href: "https://isbn.gov.in/Images/FAQs.pdf",
  },
  {
    label: "Author copyright",
    detail: "Copyright Office handbook, Government of India",
    href: "https://copyright.gov.in/documents/handbook.html",
  },
  {
    label: "Paperback royalties",
    detail: "Amazon KDP’s official royalty calculation guide",
    href: "https://kdp.amazon.com/en_US/help/topic/G201834330",
  },
] as const;

type CaseStudy = {
  id: string;
  title: string;
  slug: string;
};

export default async function HomepageEvidenceSection() {
  const supabase = createServerClient();
  const [books, authors, guides, studies] = await Promise.all([
    supabase.from("books").select("id", { count: "exact", head: true }),
    supabase.from("authors").select("id", { count: "exact", head: true }),
    supabase
      .from("blog_posts")
      .select("id", { count: "exact", head: true })
      .eq("published", true),
    supabase
      .from("case_studies")
      .select("id, title, slug", { count: "exact" })
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(3),
  ]);

  const evidence = [
    { value: books.count, label: "books in our public catalogue", href: "/books" },
    { value: authors.count, label: "named author profiles", href: "/books" },
    { value: guides.count, label: "published author guides", href: "/blog" },
    { value: studies.count, label: "publishing case studies", href: "/case-studies" },
  ].filter((item): item is { value: number; label: string; href: string } => item.value !== null);

  const caseStudies = (studies.data ?? []) as CaseStudy[];

  return (
    <section className="border-y border-gray-200 bg-[#faf9f6]" aria-labelledby="publishing-evidence-heading">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">Evidence Before Promises</p>
            <h2 id="publishing-evidence-heading" className="mt-4 font-serif text-3xl leading-tight text-gray-900 lg:text-5xl">
              Judge our publishing work by what you can inspect.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 lg:text-lg">
              Explore the books, author backgrounds, practical guides, and documented workflows already published on this site before choosing a package.
            </p>

            {evidence.length > 0 && (
              <dl className="mt-8 grid grid-cols-2 gap-3">
                {evidence.map((item) => (
                  <Link key={item.label} href={item.href} className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-gray-900 hover:shadow-sm">
                    <dd className="text-3xl font-black text-gray-900">{item.value}</dd>
                    <dt className="mt-1 text-sm leading-snug text-gray-500">{item.label}</dt>
                  </Link>
                ))}
              </dl>
            )}
          </div>

          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Published expertise</p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">Authors with real subject experience</h3>
              </div>
              <Link href="/books" className="hidden text-sm font-semibold text-gray-600 hover:text-gray-900 sm:block">View all books →</Link>
            </div>
            <div className="mt-6 space-y-3">
              {EXPERT_AUTHORS.map((author) => (
                <article key={author.name} className="rounded-2xl border border-gray-200 bg-white p-5">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <Link href={author.authorHref} className="font-bold text-gray-900 hover:text-amber-700">{author.name}</Link>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">{author.expertise}</p>
                    </div>
                    <Link href={author.bookHref} className="shrink-0 text-sm font-semibold text-amber-700 hover:text-amber-800">
                      {author.book} →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-gray-200 pt-12 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Publishing case studies</p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">See how manuscripts move through the process</h3>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              {caseStudies.map((study) => (
                <Link key={study.id} href={`/case-studies/${study.slug}`} className="group flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 hover:border-gray-900">
                  <span className="text-sm font-semibold leading-snug text-gray-800 group-hover:text-gray-950">{study.title}</span>
                  <span aria-hidden="true" className="shrink-0 text-amber-600">→</span>
                </Link>
              ))}
            </div>
            <Link href="/case-studies" className="mt-5 inline-flex text-sm font-bold text-gray-900 hover:text-amber-700">Browse all case studies →</Link>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Independent sources</p>
            <h3 className="mt-2 text-2xl font-bold text-gray-900">Verify the rules behind your publishing decision</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              These official references explain ISBNs, author ownership, and how platform royalties are calculated. Package terms should always be read alongside the rules of each distribution platform.
            </p>
            <ul className="mt-5 space-y-2">
              {OFFICIAL_REFERENCES.map((reference) => (
                <li key={reference.href}>
                  <a href={reference.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 hover:border-gray-900">
                    <span>
                      <span className="block text-sm font-bold text-gray-900">{reference.label}</span>
                      <span className="mt-0.5 block text-xs text-gray-500">{reference.detail}</span>
                    </span>
                    <span aria-hidden="true" className="shrink-0 text-gray-400 group-hover:text-gray-900">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
