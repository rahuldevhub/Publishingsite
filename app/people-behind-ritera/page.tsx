import type { Metadata } from "next";
import Link from "next/link";
import CounterStats from "@/app/aboutus/CounterStats";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";

export const metadata: Metadata = {
  title: "People Behind Ritera | Ritera Publishing",
  description:
    "Meet the passionate professionals turning author dreams into reality — reviewers, designers, editors, mentors, and expert teams behind every Ritera book.",
  openGraph: {
    title: "People Behind Ritera Publishing",
    description:
      "Real people, real expertise. Discover the team of reviewers, designers, editors, and mentors who make every Ritera book exceptional.",
    url: `${SITE_URL}/people-behind-ritera`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "People Behind Ritera | Ritera Publishing",
    description: "Meet the passionate professionals turning author dreams into reality.",
  },
  alternates: { canonical: `${SITE_URL}/people-behind-ritera` },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "People Behind Ritera",
  url: `${SITE_URL}/people-behind-ritera`,
  description:
    "Meet the passionate professionals turning author dreams into reality at Ritera Publishing.",
  publisher: {
    "@type": "Organization",
    name: "Ritera Publishing",
    url: SITE_URL,
  },
};

const KEY_PEOPLE = [
  {
    name: "RJ Ananthi",
    role: "Actress & Reviewer",
    description:
      "Renowned for insightful book reviews on 'The Book Show' YouTube channel. Her expertise and passion for literature makes her a respected voice in the literary community.",
    initials: "RA",
  },
  {
    name: "Shahitha Fareen M",
    role: "Reviewer & Writer",
    description:
      "Our seasoned reviewer whose expertise has elevated over 300 books to greatness. With her discerning eye and insightful critiques, she guides authors to shine in the literary world.",
    initials: "SF",
  },
  {
    name: "Saran Raj",
    role: "Author & Mentor",
    description:
      "An accomplished author who weaves tales that resonate with readers. Offers author sessions, nurturing budding talents and engaging with avid readers.",
    initials: "SR",
  },
  {
    name: "Gobika",
    role: "Senior Designer",
    description:
      "Our esteemed Senior Designer whose talent has graced numerous authors with captivating visuals. Transforms concepts into visual masterpieces that shine on shelves worldwide.",
    initials: "GO",
  },
];

const TEAMS = [
  {
    title: "Marketing Team",
    description:
      "Talented marketing minds dedicated to maximising your book's reach. Excel in digital and traditional marketing with proven success formulas tailored for authors.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    ),
  },
  {
    title: "Support Team",
    description:
      "Seamless support via email, WhatsApp, and phone — before and after publishing. Always available for queries, guiding authors through every step of their journey.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    title: "Writing Team",
    description:
      "Conducts seminars and virtual meetings with authors. Captures literary visions and collaborates closely to bring the best version of each manuscript to life.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
  },
  {
    title: "HR Team",
    description:
      "Builds a supportive, creative environment for our remote workforce. Manages recruitment, engagement, and well-being — the backbone of our people-first culture.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "Design Team",
    description:
      "Creates stunning book covers and beautiful interiors that make your book stand out on shelves and screens. Every design tells the story before the first page is turned.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Editorial Team",
    description:
      "Refines manuscripts with care and precision, ensuring clarity, flow, and polish — while always respecting and preserving the author's unique voice and vision.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://riterapublishing.com" },
    { "@type": "ListItem", position: 2, name: "People Behind Ritera", item: "https://riterapublishing.com/people-behind-ritera" },
  ],
};

export default function PeopleBehindRiteraPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="bg-white">

        {/* ── 1. HERO ── */}
        <section className="relative bg-gray-900 text-white overflow-hidden">
          {/* Diagonal grid texture */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)",
            }}
          />
          {/* Radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(251,191,36,0.15),transparent)]" />

          <div className="relative max-w-5xl mx-auto px-6 py-24 lg:py-32 text-center">
            <div className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs font-semibold text-gray-300 tracking-wide">Real people. Real expertise.</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black leading-tight text-white">
              People Behind
              <br />
              <span className="text-amber-400">Ritera</span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Meet the passionate professionals turning author dreams into reality —
              one book at a time.
            </p>

            {/* Avatar row teaser */}
            <div className="flex items-center justify-center mt-10">
              <div className="flex -space-x-3">
                {KEY_PEOPLE.map((p) => (
                  <div
                    key={p.name}
                    className="w-11 h-11 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center text-xs font-bold text-gray-300"
                  >
                    {p.initials}
                  </div>
                ))}
                <div className="w-11 h-11 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center text-xs font-bold text-gray-500">
                  +
                </div>
              </div>
              <p className="ml-4 text-sm text-gray-400">and many more…</p>
            </div>
          </div>
        </section>

        {/* ── 2. KEY PEOPLE ── */}
        <section className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-3">
              Key People
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Faces You Can Trust
            </h2>
          </div>

          <div className="space-y-20 lg:space-y-28">
            {KEY_PEOPLE.map((person, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={person.name}
                  className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-10 lg:gap-16`}
                >
                  {/* Photo */}
                  <div className="shrink-0">
                    <div className="relative w-52 h-52 lg:w-64 lg:h-64">
                      {/* Decorative ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200 scale-110" />
                      {/* Amber accent dot */}
                      <div className={`absolute w-5 h-5 rounded-full bg-amber-400 border-2 border-white shadow ${isEven ? "-top-1 -right-1" : "-top-1 -left-1"}`} />
                      {/* Avatar circle */}
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <div className="text-center">
                          <span className="text-5xl font-black text-gray-400">{person.initials}</span>
                          <p className="text-[10px] text-gray-400 mt-1">Photo</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className={`flex-1 text-center ${isEven ? "lg:text-left" : "lg:text-right"}`}>
                    <span className="inline-block text-xs font-semibold tracking-widest text-amber-500 uppercase mb-3">
                      {person.role}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4">
                      {person.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base lg:text-lg max-w-xl">
                      {person.description}
                    </p>
                    {/* Decorative line */}
                    <div className={`mt-6 h-1 w-12 bg-amber-400 rounded-full ${isEven ? "mx-auto lg:mx-0" : "mx-auto lg:ml-auto"}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 3. TEAMS ── */}
        <section className="bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
                Behind Every Book
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Our Expert Teams
              </h2>
              <p className="text-gray-400 text-base lg:text-lg max-w-2xl mx-auto">
                Specialised teams working in perfect sync to bring your book to life
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TEAMS.map((team) => (
                <div
                  key={team.title}
                  className="group bg-gray-800 border border-gray-700 rounded-2xl p-7 hover:border-amber-400/40 hover:bg-gray-800/80 transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-700 group-hover:bg-amber-400/10 border border-gray-600 group-hover:border-amber-400/30 flex items-center justify-center text-gray-400 group-hover:text-amber-400 mb-5 transition-all duration-200">
                    {team.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{team.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{team.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. STATS ── */}
        <section className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase text-center mb-3">
              By the numbers
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-10">
              Track record that speaks for itself
            </h2>
            <CounterStats />
          </div>
        </section>

        {/* ── 5. CTA ── */}
        <section className="bg-white">
          <div className="max-w-3xl mx-auto px-6 py-20 lg:py-24 text-center">
            <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-4">
              Curious?
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-5 leading-tight">
              Why We?
            </h2>
            <p className="text-gray-500 text-base lg:text-lg leading-relaxed max-w-xl mx-auto mb-8">
              Because behind every Ritera book is a team of real people who genuinely
              care about your story. Come see what drives us.
            </p>
            <Link
              href="/aboutus"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors text-sm"
            >
              Explore
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            {/* Trust signals row */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-10 border-t border-gray-100">
              {[
                "500+ Books Published",
                "100% Royalty Guarantee",
                "24/7 Author Support",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4 text-amber-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
