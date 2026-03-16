import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

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

// Map our job types → Schema.org employmentType
function toSchemaEmploymentType(jobType: string): string {
  const map: Record<string, string> = {
    "Full-time": "FULL_TIME",
    "Part-time": "PART_TIME",
    Contract: "CONTRACTOR",
    Remote: "FULL_TIME",
  };
  return map[jobType] ?? "OTHER";
}

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

// ── generateMetadata ─────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: job } = await supabase
    .from("careers")
    .select("title, meta_title, meta_description, short_description, location, job_type")
    .eq("slug", slug)
    .single();

  if (!job) return { title: "Job Not Found" };

  const title = job.meta_title || `${job.title} at Ritera Publishing`;
  const description =
    job.meta_description ||
    job.short_description ||
    `${job.job_type} position based in ${job.location}. Apply now at Ritera Publishing.`;
  const url = `${SITE_URL}/careers/${slug}`;

  return {
    title: `${title} | Ritera Publishing Careers`,
    description,
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary", title, description },
    alternates: { canonical: url },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function CareerDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: job } = await supabase
    .from("careers")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!job) notFound();

  // Other active positions (exclude current)
  const { data: otherJobs } = await supabase
    .from("careers")
    .select("id, title, slug, location, job_type, experience_level")
    .eq("status", "active")
    .neq("id", job.id)
    .order("created_at", { ascending: false })
    .limit(3);

  // ── Schema.org JobPosting JSON-LD ──
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: [job.description, job.responsibilities, job.requirements].join("\n\n"),
    datePosted: job.created_at.split("T")[0],
    validThrough: undefined, // No expiry set
    employmentType: toSchemaEmploymentType(job.job_type),
    hiringOrganization: {
      "@type": "Organization",
      name: "Ritera Publishing",
      sameAs: SITE_URL,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "IN",
      },
    },
    ...(job.job_type === "Remote" && {
      applicantLocationRequirements: { "@type": "Country", name: "India" },
      jobLocationType: "TELECOMMUTE",
    }),
    experienceRequirements: {
      "@type": "OccupationalExperienceRequirements",
      monthsOfExperience: job.experience_level === "Entry" ? 0 : job.experience_level === "Mid-level" ? 24 : 60,
    },
    skills: job.skills,
    ...(job.salary_range && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "INR",
        value: { "@type": "QuantitativeValue", value: job.salary_range, unitText: "YEAR" },
      },
    }),
    url: `${SITE_URL}/careers/${slug}`,
  };

  const applyHref = job.application_link || `mailto:${job.application_email}?subject=Application for ${encodeURIComponent(job.title)}`;

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
          <ol className="max-w-5xl mx-auto px-6 py-3 flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-gray-900 transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li><Link href="/careers" className="hover:text-gray-900 transition-colors">Careers</Link></li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium line-clamp-1" aria-current="page">{job.title}</li>
          </ol>
        </nav>

        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">

            {/* ── Main Content ── */}
            <div className="lg:col-span-2">
              {/* Job Header */}
              <header className="mb-10">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="flex items-center gap-1.5 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {job.location}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${JOB_TYPE_COLORS[job.job_type] ?? "bg-gray-100 text-gray-700"}`}>
                    {job.job_type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${EXPERIENCE_COLORS[job.experience_level] ?? "bg-gray-100 text-gray-700"}`}>
                    {job.experience_level}
                  </span>
                  {job.salary_range && (
                    <span className="text-sm font-semibold text-gray-800">
                      {job.salary_range}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500">Posted {formatDate(job.created_at)}</p>

                {/* Apply button — visible on mobile, hidden on lg (shown in sidebar) */}
                <div className="mt-6 lg:hidden">
                  <a
                    href={applyHref}
                    target={job.application_link ? "_blank" : undefined}
                    rel={job.application_link ? "noopener noreferrer" : undefined}
                    className="block w-full text-center bg-gray-900 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    Apply Now →
                  </a>
                </div>
              </header>

              {/* Description */}
              <JobSection title="About the Role">
                {renderTextContent(job.description)}
              </JobSection>

              {/* Responsibilities */}
              <JobSection title="Responsibilities">
                {renderTextContent(job.responsibilities)}
              </JobSection>

              {/* Requirements */}
              <JobSection title="Requirements">
                {renderTextContent(job.requirements)}
              </JobSection>

              {/* Skills */}
              <JobSection title="Skills">
                {renderTextContent(job.skills)}
              </JobSection>

              {/* Application Section */}
              <section className="mt-12 bg-gray-900 rounded-2xl p-8 text-white">
                <h2 className="text-xl font-bold text-white mb-2">Ready to Apply?</h2>
                <p className="text-gray-300 text-sm mb-6">
                  {job.application_link
                    ? "Click below to complete your application through our portal."
                    : `Send your CV and a short cover letter to ${job.application_email}.`}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={applyHref}
                    target={job.application_link ? "_blank" : undefined}
                    rel={job.application_link ? "noopener noreferrer" : undefined}
                    className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    Apply Now →
                  </a>
                  {!job.application_link && (
                    <span className="flex items-center text-sm text-gray-300">
                      or email&nbsp;
                      <a href={`mailto:${job.application_email}`} className="text-white underline underline-offset-2 hover:text-gray-200">
                        {job.application_email}
                      </a>
                    </span>
                  )}
                </div>
              </section>
            </div>

            {/* ── Sidebar ── */}
            <aside className="hidden lg:block">
              <div className="sticky top-8 space-y-6">
                {/* Apply CTA */}
                <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                  <h2 className="font-bold text-gray-900 mb-1">Interested?</h2>
                  <p className="text-sm text-gray-600 mb-5">
                    {job.application_link
                      ? "Apply through our portal."
                      : `Send your application to ${job.application_email}`}
                  </p>
                  <a
                    href={applyHref}
                    target={job.application_link ? "_blank" : undefined}
                    rel={job.application_link ? "noopener noreferrer" : undefined}
                    className="block text-center bg-gray-900 text-white font-semibold px-5 py-3 rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    Apply Now →
                  </a>
                </div>

                {/* Job Summary */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                  <h2 className="font-bold text-gray-900 text-sm">Job Summary</h2>
                  {[
                    { label: "Location", value: job.location },
                    { label: "Job Type", value: job.job_type },
                    { label: "Experience", value: job.experience_level },
                    ...(job.salary_range ? [{ label: "Salary", value: job.salary_range }] : []),
                    { label: "Posted", value: formatDate(job.created_at) },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-start justify-between gap-2 text-sm">
                      <span className="text-gray-600 shrink-0">{label}</span>
                      <span className="font-semibold text-gray-900 text-right">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Back link */}
                <Link
                  href="/careers"
                  className="block text-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  ← All open positions
                </Link>
              </div>
            </aside>
          </div>
        </div>

        {/* ── Other Open Positions ── */}
        {otherJobs && otherJobs.length > 0 && (
          <section className="bg-gray-50 border-t border-gray-200 mt-8">
            <div className="max-w-5xl mx-auto px-6 py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Other Open Positions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {otherJobs.map((other) => (
                  <Link
                    key={other.id}
                    href={`/careers/${other.slug}`}
                    className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-400 hover:shadow-sm transition-all"
                  >
                    <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 mb-3 leading-snug">
                      {other.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs text-gray-700 flex items-center gap-1">
                        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {other.location}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${JOB_TYPE_COLORS[other.job_type] ?? "bg-gray-100 text-gray-700"}`}>
                        {other.job_type}
                      </span>
                    </div>
                    <span className="mt-4 inline-block text-xs font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">
                      View role →
                    </span>
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

// ── Helpers ──────────────────────────────────────────────────────────────────

function JobSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10 pb-10 border-b border-gray-200 last:border-0">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      {children}
    </section>
  );
}

function renderTextContent(text: string) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const isBulletList = lines.filter((l) => /^[-•*]/.test(l)).length > lines.length / 2;

  if (isBulletList) {
    return (
      <ul className="space-y-2.5">
        {lines.map((line, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-800 text-sm leading-relaxed">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
            <span>{line.replace(/^[-•*]\s*/, "")}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="space-y-4">
      {text.split(/\n\n+/).map((para, i) => (
        <p key={i} className="text-gray-800 text-sm leading-relaxed">
          {para.split("\n").map((line, j, arr) => (
            <span key={j}>
              {line}
              {j < arr.length - 1 && <br />}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
