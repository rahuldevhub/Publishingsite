import type { Metadata } from "next";
import Link from "next/link";
import CounterStats from "./CounterStats";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";

export const metadata: Metadata = {
  title: "About Us | Ritera Publishing — Your Story Matters",
  description:
    "Learn about Ritera Publishing — a team dedicated to helping Indian authors get published, earn 100% royalties, and reach readers in 50+ countries. Your story matters.",
  openGraph: {
    title: "About Ritera Publishing",
    description:
      "From the spark of an idea to the weight of a finished book, we walk beside your words — guiding, shaping, and giving them the wings to take flight.",
    url: `${SITE_URL}/aboutus`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Ritera Publishing",
    description: "Helping Indian authors publish, earn, and reach readers worldwide.",
  },
  alternates: { canonical: `${SITE_URL}/aboutus` },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Ritera Publishing",
  url: `${SITE_URL}/aboutus`,
  description:
    "Ritera Publishing helps Indian authors self-publish with 100% royalties, global distribution, and expert editorial support.",
  publisher: {
    "@type": "Organization",
    name: "Ritera Publishing",
    url: SITE_URL,
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      <main className="bg-white">

        {/* ── 1. HERO ── */}
        <section className="relative bg-gray-900 text-white overflow-hidden">
          {/* subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-4">
                About Us
              </p>
              <h1 className="text-4xl lg:text-6xl font-black leading-tight text-white">
                Your Story
                <br />
                <span className="text-amber-400">Matters.</span>
              </h1>
              <p className="mt-3 text-xl lg:text-2xl font-light text-gray-300">
                RITERA Brings it to Life
              </p>
              <p className="mt-6 text-base lg:text-lg text-gray-400 leading-relaxed max-w-xl">
               Publish with confidence through professional self publishing services. Reach readers globally across 160+ countries with full creative control and 100% royalties.
              </p>
              <a
                href="#virtual-meet"
                className="inline-block mt-8 px-7 py-3.5 bg-amber-400 text-gray-900 font-semibold rounded-xl hover:bg-amber-300 transition-colors text-sm"
              >
                Learn More
              </a>
            </div>

            {/* Image collage */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4 h-[420px] lg:h-[480px]">
              {/* Tall left image */}
              <div className="row-span-2 rounded-2xl overflow-hidden bg-gray-700 relative">
                <img src="/images/aboutus3.jpg" alt="Author photo" className="w-full h-full object-cover absolute inset-0" />
              </div>
              {/* Top-right image */}
              <div className="rounded-2xl overflow-hidden bg-gray-600 relative">
                <img src="/images/aboutus2.jpg" alt="Book launch" className="w-full h-full object-cover absolute inset-0" />
              </div>
              {/* Bottom-right image */}
              <div className="rounded-2xl overflow-hidden bg-gray-700 relative">
                <img src="/images/aboutus1.jpg" alt="Team at work" className="w-full h-full object-cover absolute inset-0" />
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. STATS ── */}
        <section className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase text-center mb-3">
              By the numbers
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-10">
              Trusted by hundreds of authors across India
            </h2>
            <CounterStats />
          </div>
        </section>

        {/* ── 3. VIRTUAL MEET ── */}
        <section id="virtual-meet" className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden bg-gray-100 aspect-[4/3] mb-10 lg:mb-0 shadow-lg">
              <img src="images/virtualmeet.jpg" alt="Virtual meet" className="w-full h-full object-cover absolute inset-0" />

              <div className="absolute top-4 left-4 bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                Annual Event
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-3">
                Community
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Virtual Meet
              </h2>
              <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
               Our Annual Virtual Literary Meet brings together authors, readers, and creators from around the world. Connect with writers and learn from experts in self-publishing services. Grow your readership after you publish your book in India and worldwide.


              </p><br/>
               <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
              
              Because at Ritera, self publishing a book is just the beginning — building a community around your work is where the magic truly happens.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Writers", "Readers", "Reviewers", "Critics"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full border border-gray-300 text-sm text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. SETTING NEW STANDARDS ── */}
        <section className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
            <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3 text-center">
              Why Choose Ritera
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-14">
              Setting New Standards
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  num: "01",
                  title: "Fastest Publishing",
                  desc: "As one of the best self-publishing companies in India, we take your manuscript from submission to global bookshelves in just 30 days. Formatting, book cover design, ISBN registration — we handle it all so you can stay focused on writing",
                },
                {
                  num: "02",
                  title: "Global Distribution",
                  desc: "Our author publishing services in India come with worldwide reach — Amazon, Flipkart, and 160+ countries through our international distribution network. Self-publishing a book in India has never reached this far.",
                },
                {
                  num: "03",
                  title: "Author Royalties",
                  desc: "Unlike traditional book publishing companies in India, every rupee you earn stays with you. No hidden deductions, no middlemen, no surprises — just complete transparency from day one. That's the Ritera promise.",
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-amber-400/40 transition-colors group"
                >
                  <span className="text-5xl font-black text-gray-700 group-hover:text-amber-400/30 transition-colors">
                    {item.num}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-4 mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. AUTHOR INTERVIEWS ── */}
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-3">
              Author Stories
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Hear From Our Published Authors
            </h2>
            <p className="text-gray-500 text-base lg:text-lg max-w-2xl mx-auto">
              Real stories from writers who trusted us with their dreams
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: "JaPQPM4n0iE?si=NjmNWUlFxbMswV0E", author: "Abhijit Mishra", book: "The Trust Architect" },
              { id: "JaPQPM4n0iE?si=NjmNWUlFxbMswV0E", author: "Aruna", book: "Akarkas" },
              { id: "JaPQPM4n0iE?si=NjmNWUlFxbMswV0E", author: "Ritera Exclusive", book: "Litspace" },
            ].map((video, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* 16:9 responsive embed */}
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    
                    title={`${video.author} — ${video.book}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="px-5 py-4">
                  <p className="font-bold text-gray-900 text-sm">{video.author}</p>
                  <p className="text-xs text-gray-500 mt-0.5 italic">&ldquo;{video.book}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://www.youtube.com/@riterapublishing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              View All Interviews
            </a>
          </div>
        </section>

        {/* ── 6. MARKETING SUCCESS STORIES ── */}
        <section className="bg-gray-50 border-t border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-3">
                Proven Results
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Results That Speak Volumes
              </h2>
              <p className="text-gray-500 text-base lg:text-lg max-w-2xl mx-auto">
                We don&apos;t just publish books — we help them reach the right readers
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {[
                {
                  author: "Priya Sharma",
                  book: "Echoes of Mumbai",
                  challenge: "New author, unknown in market",
                  strategy: "Targeted Instagram + Amazon ads, book blogger outreach",
                  metrics: [
                    { icon: "reach", label: "Reach", value: "75K+" },
                    { icon: "clicks", label: "Clicks", value: "3,200" },
                    { icon: "sales", label: "Sales Increase", value: "150%" },
                    { icon: "roi", label: "ROI", value: "2.5×" },
                  ],
                  spend: "₹20K",
                  revenue: "₹50K",
                },
                {
                  author: "Rahul Mehta",
                  book: "The Startup Sutra",
                  challenge: "Niche business book, limited audience",
                  strategy: "LinkedIn ads, entrepreneur communities, podcast features",
                  metrics: [
                    { icon: "reach", label: "Reach", value: "100K+" },
                    { icon: "clicks", label: "Clicks", value: "5,000" },
                    { icon: "sales", label: "Sales Boost", value: "200%" },
                    { icon: "roi", label: "ROI", value: "3×" },
                  ],
                  spend: "₹25K",
                  revenue: "₹75K",
                },
                {
                  author: "Ananya Iyer",
                  book: "Poetry of the Heart",
                  challenge: "Poetry has smaller commercial market",
                  strategy: "Instagram reels, book clubs, influencer partnerships",
                  metrics: [
                    { icon: "reach", label: "Reach", value: "60K+" },
                    { icon: "clicks", label: "Clicks", value: "2,800" },
                    { icon: "sales", label: "Sales Increase", value: "180%" },
                    { icon: "roi", label: "ROI", value: "2.8×" },
                  ],
                  spend: "₹15K",
                  revenue: "₹42K",
                },
              ].map((story) => (
                <div
                  key={story.author}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="bg-gray-900 px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-amber-400 font-bold text-sm shrink-0">
                        {story.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{story.author}</p>
                        {/* <p className="text-xs text-gray-400 italic">&ldquo;{story.book}&rdquo;</p> */}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Challenge + Strategy */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          The Challenge
                        </p>
                        <p className="text-sm text-gray-700">{story.challenge}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Our Strategy
                        </p>
                        <p className="text-sm text-gray-700">{story.strategy}</p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100" />

                    {/* Metric grid */}
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                        The Results
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {story.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-100"
                          >
                            <p className="text-xl font-black text-gray-900">{m.value}</p>
                            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mt-0.5">
                              {m.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ROI bar */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl px-4 py-3 flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-0.5">Ad Spend</p>
                        <p className="font-bold text-gray-700 text-sm">{story.spend}</p>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-500">
                        <div className="h-px w-8 bg-emerald-300" />
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                        <div className="h-px w-8 bg-emerald-300" />
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-0.5">Revenue</p>
                        <p className="font-bold text-emerald-700 text-sm">{story.revenue}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. JADE JULEP ANTHOLOGIES ── */}
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            {/* Text (left) */}
            <div>
              <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-3">
                Ritera Exclusive
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Anthologies &amp; LitSpace
              </h2>
              <p className="text-gray-600 leading-relaxed text-base lg:text-lg mb-4">
                If you&apos;ve ever dreamed of self-publishing a book for free online in India, LitSpace makes it possible. 
                Through our LitSpace initiative, poets and short-story writers can publish their work for free in our 
                curated anthology collections — a platform built for emerging voices who deserve a stage. Whether 
                you&apos;re a first-time author or an experienced writer exploring a new format, LitSpace is your space to be heard.
              </p>
              <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
                <span className="font-semibold text-gray-900">Jade Julep</span> is our flagship annual anthology — a vibrant celebration of voices, 
                genres, and perspectives that showcases the very best of Indian literary talent. A cost-free book publishing opportunity in India that 
                doesn&apos;t compromise on quality or reach.

              </p>
              <Link
                href="/packages"
                className="inline-block mt-8 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors text-sm"
              >
                Publish for Free via LitSpace
              </Link>
            </div>

            {/* Book cover collage (right) */}
            <div className="mt-10 lg:mt-0 grid grid-cols-3 gap-3">
              {[
                { i: 1, src: "/images/Jadejulep1.png" },
                { i: 2, src: "/images/Jadejulep2.webp" },
                { i: 3, src: "/images/Jadejulep3.webp" },
              ].map(({ i, src }) => (
                <div
                  key={i}
                  className={`rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm ${
                    i === 2 ? "mt-6" : i === 3 ? "mt-3" : ""
                  }`}
                  style={{ aspectRatio: "2/3" }}
                >
                  <img src={src} alt="Book cover" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. OUR TEAM (dark) ── */}
        <section className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
              {/* Text */}
              <div>
                <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
                  The People Behind the Pages
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                  Our Team
                </h2>
                <div className="space-y-4 text-gray-400 leading-relaxed text-sm lg:text-base">
                  <p>
                    Behind every book we publish is a dedicated team of editors, designers, marketers, and publishing managers who 
                    share one mission — to make your self-publishing journey in India seamless, professional, and deeply personal.
                  </p>
                  <p>
                    Our <span className="text-white font-medium">Publishing Team</span> coordinates every step from manuscript submission to
                     final distribution, ensuring a smooth, transparent author publishing experience from day one.

                  </p>
                  <p>
                    Our <span className="text-white font-medium">Editing &amp; Proofreading Team</span> —
                    experienced literary professionals — polish your manuscript until every sentence is publish-ready and every word earns its place.
                  </p>
                  <p>
                    The <span className="text-white font-medium">Design Studio</span> crafts professional book
                    covers that stop readers in their tracks, while our{" "}
                    <span className="text-white font-medium">Marketing &amp; Promotions Team</span>{" "}
                    puts your book in front of the right audience through Amazon Ads, social media campaigns, press releases, and author branding.

                  </p>
                  <p>
                    Behind it all, our{" "}
                    <span className="text-white font-medium">Support &amp; Accounts Team</span>{" "}
                    is available 24/7 — answering queries, processing royalty payments, and keeping you informed every step of the way.

                  </p>
                </div>
              </div>

              {/* Team photo + testimonial */}
              <div className="mt-10 lg:mt-0 space-y-6">
                {/* Team photo placeholder with clipped shape */}
                <div className="relative rounded-3xl overflow-hidden bg-gray-700 aspect-[4/3] shadow-xl">
                  <img src="/images/ourteam.jpg" alt="Team photo" className="w-full h-full object-cover absolute inset-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                </div>

                {/* Testimonial */}
                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg
                        key={s}
                        className="w-4 h-4 text-amber-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-gray-300 text-sm lg:text-base leading-relaxed italic mb-4">
                    &ldquo;Self-publishing usually feels lonely, but with Ritera, I felt
                    supported every step of the way.&rdquo;
                  </blockquote>
                  <p className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                    Shahitha Fareen, Writer, Physiotherapist
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. RITERA AI CTA BANNER ── */}
        <section className="relative overflow-hidden">
          {/* gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]" />

          <div className="relative max-w-3xl mx-auto px-6 py-20 lg:py-24 text-center">
            <p className="text-xs font-semibold tracking-widest text-white/70 uppercase mb-3">
              Coming Soon
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 leading-tight">
              Overcome Writer&apos;s Block with Ritera AI
            </h2>
            <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-xl mx-auto mb-8">
              Stuck on a chapter? Whether you&apos;re figuring out how to write a book for self-publishing as a 
              beginner or you&apos;re an experienced author hitting a creative wall — Ritera AI is built for you. 
              Our intelligent creative tool helps you brainstorm ideas, develop characters, and write through blocks so your story never stops.

            </p>
            <button
              disabled
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl text-sm cursor-not-allowed opacity-90 shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Coming Soon
            </button>
          </div>
        </section>

        {/* ── 8. QUICK LINKS ── */}
        <section className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase text-center mb-3">
              Explore Ritera
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-10">
              Where would you like to go next?
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  question: "Shape the future?",
                  cta: "Career Center",
                  href: "/careers",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                    </svg>
                  ),
                },
                {
                  question: "Ready to publish?",
                  cta: "See Our Packages",
                  href: "/packages",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  ),
                },
                {
                  question: "Publish for free?",
                  cta: "LitSpace",
                  href: "/litspace",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  ),
                },
                {
                  question: "Stay connected?",
                  cta: "Follow on Instagram",
                  href: "https://instagram.com/riterapublishing",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <Link
                  key={item.cta}
                  href={item.href}
                  className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-900 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 group-hover:bg-gray-900 group-hover:text-white transition-colors mb-4">
                    {item.icon}
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{item.question}</p>
                  <p className="font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {item.cta} →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
