import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import SubmitForm from "./SubmitForm";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";

export const metadata: Metadata = {
  title: "Submit Your Writing | LitSpace — Ritera Publishing",
  description:
    "Share your poems, stories, and articles with the LitSpace community. Submit your work for review and get published on Ritera Publishing's creative writing platform.",
  openGraph: {
    title: "Submit Your Writing to LitSpace",
    description: "Share your poems, stories, and articles with the LitSpace community.",
    url: `${SITE_URL}/litspace/submit`,
    type: "website",
  },
  twitter: { card: "summary", title: "Submit to LitSpace", description: "Share your creative writing with the world." },
  alternates: { canonical: `${SITE_URL}/litspace/submit` },
};

export default async function SubmitPage() {
  const { data: categories } = await supabase
    .from("litspace_categories")
    .select("id, name")
    .order("name");

  return (
    <main className="bg-white">
      {/* ── Breadcrumbs ── */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
        <ol className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-600">
          <li><Link href="/" className="hover:text-gray-900 transition-colors">Home</Link></li>
          <li aria-hidden="true" className="text-gray-400">/</li>
          <li><Link href="/litspace" className="hover:text-gray-900 transition-colors">LitSpace</Link></li>
          <li aria-hidden="true" className="text-gray-400">/</li>
          <li className="text-gray-900 font-medium" aria-current="page">Submit</li>
        </ol>
      </nav>

      {/* ── Hero ── */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
            LitSpace · Community Platform
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight max-w-2xl">
            Share Your Story with the World
          </h1>
          <p className="mt-5 text-lg text-gray-300 max-w-xl leading-relaxed">
            LitSpace is a home for poets, storytellers, and essayists. Submit your work and, once
            approved, it will be published for readers across India to discover and enjoy.
          </p>
        </div>
      </section>

      {/* ── Form + Guidelines Layout ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">

          {/* ── Submission Form ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Submission</h2>
              <SubmitForm categories={categories ?? []} />
            </div>
          </div>

          {/* ── Guidelines Sidebar ── */}
          <aside className="mt-8 lg:mt-0">
            <div className="sticky top-8 space-y-6">

              {/* What We Accept */}
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-lg">✍️</span> What We Accept
                </h2>
                <ul className="space-y-3">
                  {[
                    { type: "Poetry", desc: "Original poems in any form — free verse, haiku, sonnets, ghazals, and more." },
                    { type: "Short Stories", desc: "Fiction up to 3,000 words. Any genre welcome — literary, fantasy, romance, thriller." },
                    { type: "Personal Essays", desc: "Non-fiction narratives, memoirs, and opinion pieces on any topic." },
                    { type: "Articles", desc: "Informative writing on books, writing craft, literature, and culture." },
                  ].map((item) => (
                    <li key={item.type} className="text-sm">
                      <span className="font-semibold text-gray-900">{item.type}</span>
                      <p className="text-gray-600 mt-0.5 leading-relaxed">{item.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Content Policy */}
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-lg">📋</span> Content Guidelines
                </h2>
                <ul className="space-y-2">
                  {[
                    "Your work must be original and previously unpublished",
                    "No hate speech, harassment, or discriminatory content",
                    "No plagiarism — all submissions are reviewed",
                    "Keep it respectful and suitable for all audiences",
                    "By submitting, you grant LitSpace publishing rights",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Review Process */}
              <div className="bg-gray-900 rounded-2xl p-6 text-white">
                <h2 className="font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-lg">⏱️</span> Review Process
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  All submissions are reviewed by our editorial team within <strong className="text-white">3–5 business days</strong>. You&apos;ll receive an email notification once a decision is made.
                </p>
                <Link
                  href="/litspace"
                  className="block text-center bg-white text-gray-900 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Browse Published Work
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
