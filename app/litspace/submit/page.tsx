import { Metadata } from "next";
import { createServerClient } from "@/lib/supabase";
import Link from "next/link";
import SubmitForm from "./SubmitForm";
import TestimonialCarousel from "./TestimonialCarousel";

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
  const supabase = createServerClient();
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
            it will be published for readers across India to discover and enjoy.
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

          {/* ── Right Sidebar ── */}
          <aside className="mt-8 lg:mt-0">
            <div className="sticky top-8 space-y-6">

              {/* Section 1 — Published Example Card */}
              <div className="bg-gray-900 rounded-2xl p-5 text-white">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
                    style={{ backgroundColor: "#F26522", color: "#fff" }}
                  >
                    Featured
                  </span>
                  <span className="text-xs text-gray-400">Short Story</span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug mb-1">
                  The Weight of Staying
                </h3>
                <p className="text-xs text-gray-400 mb-2">Arjun Mehta · Mumbai</p>
                <p className="text-sm text-gray-300 leading-relaxed italic mb-3">
                  &ldquo;A quiet story about belonging, told in the spaces between words.&rdquo;
                </p>
                <p className="text-xs text-gray-500">Published 2 days ago</p>
              </div>

              {/* Section 2 — Writer Testimonials */}
              <TestimonialCarousel />

              {/* Section 3 — How It Works */}
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5">
                <h2 className="font-bold text-gray-900 mb-4 text-sm">How it works</h2>
                <ol className="space-y-3">
                  {[
                    "Fill the form — takes 2 minutes",
                    "We review within 24 hours",
                    "Your work goes live with your author profile",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <span
                        className="shrink-0 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: "#F26522" }}
                      >
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
