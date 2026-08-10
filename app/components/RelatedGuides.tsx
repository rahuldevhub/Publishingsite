import Link from "next/link";
import { getRelatedGuides, type RelatedGuide } from "@/lib/internal-links";

/**
 * Semantic "Related Guides" module — topic-based, not category matching.
 * Renders one parent pillar, 1–2 sibling articles, one supporting guide, and
 * one relevant commercial page, using descriptive editorial anchor text.
 *
 * Server component — adds zero client-side JavaScript.
 */

const ROLE_LABEL: Record<RelatedGuide["role"], string> = {
  pillar: "Start here",
  sibling: "Related reading",
  supporting: "Go deeper",
};

export default function RelatedGuides({ currentSlug }: { currentSlug: string }) {
  const { guides, commercial } = getRelatedGuides(currentSlug);
  if (guides.length === 0) return null;

  return (
    <section
      aria-labelledby="related-guides-heading"
      className="bg-gray-50 border-t border-gray-200"
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 id="related-guides-heading" className="text-2xl font-bold text-gray-900">
            Continue Your Publishing Research
          </h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            All publishing guides →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/blog/${guide.slug}`}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 hover:border-gray-900 hover:shadow-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            >
              <span className="text-[11px] font-semibold tracking-widest text-amber-600 uppercase mb-3">
                {ROLE_LABEL[guide.role]}
              </span>
              <h3 className="font-bold text-gray-900 leading-snug mb-2 group-hover:text-gray-700 transition-colors">
                {guide.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">{guide.blurb}</p>
              <span className="mt-4 text-sm font-semibold text-gray-900 group-hover:translate-x-0.5 transition-transform inline-block">
                Read the guide →
              </span>
            </Link>
          ))}

          {/* Commercial page — clearly differentiated from editorial guides */}
          <Link
            href={commercial.href}
            className="group flex flex-col rounded-2xl border border-gray-900 bg-gray-900 p-6 text-white hover:bg-gray-800 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
          >
            <span className="text-[11px] font-semibold tracking-widest text-amber-400 uppercase mb-3">
              Ready to publish?
            </span>
            <h3 className="font-bold leading-snug mb-2">{commercial.title}</h3>
            <p className="text-sm text-gray-300 leading-relaxed flex-1">{commercial.blurb}</p>
            <span className="mt-4 text-sm font-semibold text-amber-400 group-hover:translate-x-0.5 transition-transform inline-block">
              Explore packages →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
