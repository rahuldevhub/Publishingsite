import { Metadata } from "next";
import { createServerClient } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";

export const metadata: Metadata = {
  title: "Careers at Ritera Publishing | Join Our Team",
  description:
    "Join Ritera Publishing and help shape the future of self-publishing in India. Explore open roles in editorial, marketing, technology, and more.",
  openGraph: {
    title: "Careers at Ritera Publishing | Join Our Team",
    description:
      "Explore open roles at Ritera Publishing. We're looking for passionate people to help authors share their stories with the world.",
    url: `${SITE_URL}/careers`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Careers at Ritera Publishing",
    description: "Join our team and help shape the future of self-publishing in India.",
  },
  alternates: { canonical: `${SITE_URL}/careers` },
};

type Career = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  location: string;
  job_type: string;
  experience_level: string;
  salary_range: string | null;
};

type PageProps = {
  searchParams: Promise<{ job_type?: string; location?: string; experience?: string }>;
};

const JOB_TYPE_COLORS: Record<string, string> = {
  "Full-time": "bg-green-100 text-green-700",
  "Part-time": "bg-blue-100 text-blue-700",
  Contract: "bg-orange-100 text-orange-700",
  Remote: "bg-purple-100 text-purple-700",
};

const EXPERIENCE_COLORS: Record<string, string> = {
  Entry: "bg-gray-100 text-gray-600",
  "Mid-level": "bg-yellow-100 text-yellow-700",
  Senior: "bg-red-100 text-red-700",
  Lead: "bg-indigo-100 text-indigo-700",
};

export default async function CareersPage({ searchParams }: PageProps) {
  const supabase = createServerClient();
  const { job_type, location, experience } = await searchParams;

  // Fetch all active careers (for filters + listing)
  const { data: allActive } = await supabase
    .from("careers")
    .select("id, title, slug, short_description, location, job_type, experience_level, salary_range")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  const allCareers = (allActive ?? []) as Career[];

  // Derive distinct filter values from active jobs
  const locations = [...new Set(allCareers.map((c) => c.location))].sort();
  const jobTypes = [...new Set(allCareers.map((c) => c.job_type))].sort();
  const experiences = [...new Set(allCareers.map((c) => c.experience_level))].sort();

  // Apply filters client-side (data is small, no extra query needed)
  const filtered = allCareers.filter((c) => {
    if (job_type && c.job_type !== job_type) return false;
    if (location && c.location !== location) return false;
    if (experience && c.experience_level !== experience) return false;
    return true;
  });

  const hasFilters = job_type || location || experience;

  const selectClass =
    "px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://riterapublishing.com" },
      { "@type": "ListItem", position: 2, name: "Careers", item: "https://riterapublishing.com/careers" },
    ],
  };

  return (
    <>
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="bg-white">
      {/* ── Hero ── */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
          <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-4">
            We&apos;re Hiring
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight max-w-3xl text-white">
            Join Ritera Publishing
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl leading-relaxed">
            Help us shape the future of self-publishing in India. We&apos;re building a team of passionate
            editors, marketers, designers, and technologists who believe every author&apos;s voice
            deserves to be heard.
          </p>

          {/* Culture points */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "Mission-Driven", body: "Every role at Ritera contributes directly to helping authors share their stories with the world." },
              { title: "Flexible Work", body: "We support remote and hybrid arrangements — we care about results, not where you sit." },
              { title: "Grow With Us", body: "A fast-growing company means real ownership, fast learning, and room to advance quickly." },
            ].map((point) => (
              <div key={point.title} className="bg-white/10 rounded-xl p-6 border border-white/20">
                <h2 className="font-semibold text-white mb-2">{point.title}</h2>
                <p className="text-sm text-gray-300 leading-relaxed">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filters + Listings ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Open Positions
            {filtered.length > 0 && (
              <span className="ml-3 text-base font-normal text-gray-500">
                ({filtered.length} {filtered.length === 1 ? "role" : "roles"})
              </span>
            )}
          </h2>
        </div>

        {/* Filters */}
        {allCareers.length > 0 && (
          <form method="GET" className="flex flex-wrap items-center gap-3 mb-10 p-4 bg-gray-50 rounded-xl border border-gray-200">
            {jobTypes.length > 1 && (
              <select name="job_type" defaultValue={job_type ?? ""} className={selectClass}>
                <option value="">All Job Types</option>
                {jobTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            )}
            {locations.length > 1 && (
              <select name="location" defaultValue={location ?? ""} className={selectClass}>
                <option value="">All Locations</option>
                {locations.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            )}
            {experiences.length > 1 && (
              <select name="experience" defaultValue={experience ?? ""} className={selectClass}>
                <option value="">All Experience Levels</option>
                {experiences.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
            )}
            <button type="submit" className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors">
              Filter
            </button>
            {hasFilters && (
              <Link href="/careers" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Clear
              </Link>
            )}
          </form>
        )}

        {/* Job Cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="max-w-md mx-auto">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {hasFilters ? "No roles match your filters" : "No open positions right now"}
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                {hasFilters
                  ? "Try adjusting your filters to see more opportunities."
                  : "We're not actively hiring at the moment, but we'd love to hear from you."}
              </p>
              {hasFilters ? (
                <Link href="/careers" className="text-sm font-medium text-gray-900 underline underline-offset-2">
                  View all positions
                </Link>
              ) : (
                <a
                  href="mailto:careers@riterapublishing.com"
                  className="inline-block bg-gray-900 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Send us your CV
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filtered.map((career) => (
              <article
                key={career.id}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-400 hover:shadow-sm transition-all flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 leading-snug">
                    {career.title}
                  </h3>
                  {career.salary_range && (
                    <span className="text-sm font-semibold text-gray-700 shrink-0">{career.salary_range}</span>
                  )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="flex items-center gap-1 text-xs text-gray-700">
                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {career.location}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${JOB_TYPE_COLORS[career.job_type] ?? "bg-gray-100 text-gray-700"}`}>
                    {career.job_type}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${EXPERIENCE_COLORS[career.experience_level] ?? "bg-gray-100 text-gray-700"}`}>
                    {career.experience_level}
                  </span>
                </div>

                {career.short_description && (
                  <p className="text-sm text-gray-700 leading-relaxed mb-5 line-clamp-3">
                    {career.short_description.slice(0, 150)}
                    {career.short_description.length > 150 && "…"}
                  </p>
                )}

                <div className="mt-auto">
                  <Link
                    href={`/careers/${career.slug}`}
                    className="inline-block text-sm font-semibold text-gray-900 border border-gray-900 px-4 py-2 rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ── Perks ── */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Why Ritera?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📚", title: "Publishing Impact", body: "Directly support hundreds of authors bringing their books to life every year." },
              { icon: "🌍", title: "Remote Friendly", body: "Work from anywhere in India. We have team members across the country." },
              { icon: "📈", title: "Fast Growth", body: "Ritera is scaling quickly — your contributions have real, visible impact." },
              { icon: "🤝", title: "Collaborative Culture", body: "Small team, big ambitions. Everyone's voice counts and ideas are welcomed." },
            ].map((perk) => (
              <div key={perk.title} className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <div className="text-3xl mb-3">{perk.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{perk.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{perk.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
