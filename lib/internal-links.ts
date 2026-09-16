/**
 * Centralised internal-linking & topical-authority configuration.
 * ---------------------------------------------------------------
 * Single source of truth for how Ritera's pages link to one another.
 * Nothing here mutates content or URLs — it only describes relationships.
 *
 * Used by:
 *  - app/components/RelatedGuides.tsx        (semantic related-guides module)
 *  - app/blog/[slug]/page.tsx                (contextual in-body links)
 *  - app/page.tsx, packages, aboutus, books  (curated editorial links)
 *  - app/components/Footer.tsx               (evergreen guide column)
 *
 * Design rules encoded here:
 *  - One canonical PILLAR per topic cluster (hub-and-spoke).
 *  - Descriptive, editorial anchor text only — never "click here".
 *  - A post never links to itself.
 */

export type Cluster =
  | "process"
  | "cost"
  | "company"
  | "companies"
  | "compare"
  | "isbn"
  | "editing"
  | "printing"
  | "distribution"
  | "journey"
  | "niche"
  | "regional"
  | "showcase";

// ── Slug constants (real DB slugs — do not change) ───────────────────────────

export const SLUG = {
  // Pillars
  PROCESS: "how-to-publish-a-book-in-india-step-by-step-guide-2026",
  COST: "how-much-does-self-publishing-cost-in-india-complete-guide-for-first-time-authors",
  COMPANY: "best-self-publishing-company-in-india-complete-guide-for-first-time-authors",
  COMPANIES: "best-self-publishing-companies-in-india",
  COMPARE: "self-publishing-vs-traditional-publishing-in-india-2026-which-is-better-for-you",
  ISBN: "isbn-for-self-publishing-in-india-cost-process-and-how-to-get-it-2026-guide",
  EDITING: "book-editing-services-in-india-what-to-expect-and-how-much-it-costs",
  POD: "print-on-demand-in-india",

  // Supporting / spokes
  FIRST_BOOK: "how-to-publish-your-first-book-in-india",
  FIRST_TIME_EVERYTHING: "first-time-author-publishing-in-india-everything-you-need-to-know",
  FIRST_TIPS: "first-time-author-tips-india",
  NEVER_WRITTEN: "how-to-publish-a-book-in-india-even-if-you-have-never-written-anything-before",
  SELF_STEP: "how-to-self-publish-a-book-in-india-step-by-step-guide-for-first-time-authors",
  PROCESS_ALT: "how-to-publish-a-book-in-india-step-by-step-guide-2026",
  TIMELINE: "publishing-timeline-in-india",
  MISTAKES: "7-publishing-mistakes-first-time-authors-in-india-must-avoid-2026",
  MANUSCRIPT: "how-to-structure-a-book-manuscript-for-publishing-a-complete-guide-for-authors",

  SELF_COST: "how-much-does-it-cost-to-publish-a-book-in-india-complete-cost-breakdown-2026",
  COST_ALT: "cost-of-publishing-a-book-in-india-2026-complete-breakdown-for-first-time-authors",
  NO_INVEST: "how-to-publish-a-book-without-investment",

  EARN: "how-much-do-authors-earn-in-india-self-publishing-vs-traditional-publishing-real-numbers",
  IS_BETTER: "is-self-publishing-better-than-traditional-publishing-in-india",

  EBOOK: "e-book-publishing-in-india-how-to-publish-and-sell-your-book-digitally",
  INTERNATIONAL: "how-to-sell-books-internationally",

  FOR_AUTHORS: "best-self-publishing-company-for-authors-2026-guide",
  HOW_CHOOSE: "how-to-choose-the-best-self-publishing-company-in-india-before-publishing-your-first-book",
  BROAD_CHOOSE: "self-publishing-in-india-how-to-choose-the-right-self-publishing-company-for-your-book",
  SERVICES: "self-publishing-services-in-india-what-authors-should-expect-before-publishing",
  WHICH_BEST: "which-is-the-best-self-publishing-company-in-india-for-authors",
  WHY_RITERA: "top-self-publishing-company-in-india-why-authors-choose-ritera-publishing",
  TOP_LOOK_FOR: "top-self-publishing-companies-in-india-what-authors-should-really-look-for",
  HONEST_COMPARISON: "best-self-publishing-companies-in-india-2026-honest-comparison-for-first-time-authors",
  TOP_PUBLISHERS: "top-publishing-companies-in-india",
  NOTION_PRESS: "ritera-vs-notion-press-which-is-better-for-first-time-authors",
  TAMIL_NADU: "how-to-choose-the-best-self-publishing-company-in-tamil-nadu",

  NOVEL: "how-to-publish-a-novel-in-india",
  POETRY: "can-i-publish-my-poetry-book-in-india-successfully",
  CHILDREN: "how-to-publish-a-children-s-book-in-india-a-simple-guide-for-authors",

  BUSY_PRO: "how-busy-professionals-in-india-can-write-and-publish-a-book-without-quitting-their-job",
  PERSONAL_BRAND: "how-to-publish-a-book-in-india-to-build-your-personal-brand-and-professional-reputation",
  REGRET: "why-most-business-authors-regret-their-first-publisher-and-how-to-fix-it-right",
  TAKE_CONTROL: "how-to-take-back-control-from-your-publisher-without-starting-over",

  TRUST_ARCHITECT: "the-trust-architect-a-must-read-leadership-book-for-the-digital-age",
  JADE_JULEP: "jade-julep-an-international-poetry-anthology-published-for-free",
} as const;

// ── Guide metadata (card title, blurb, editorial anchor) ─────────────────────

export interface GuideMeta {
  slug: string;
  /** Short card title. */
  title: string;
  /** One-line description for related-guide cards. */
  blurb: string;
  /** Default descriptive anchor text for inline/editorial links. */
  anchor: string;
}

export const GUIDES: Record<string, GuideMeta> = {
  [SLUG.PROCESS]: {
    slug: SLUG.PROCESS,
    title: "How to Publish a Book in India",
    blurb: "The complete step-by-step process, from finished manuscript to books on sale.",
    anchor: "how to publish a book in India step by step",
  },
  [SLUG.COST]: {
    slug: SLUG.COST,
    title: "What It Costs to Publish a Book",
    blurb: "A transparent breakdown of editing, design, ISBN, printing and distribution costs.",
    anchor: "cost of publishing a book in India",
  },
  [SLUG.COMPANY]: {
    slug: SLUG.COMPANY,
    title: "Best Self-Publishing Company in India",
    blurb: "How to choose the right publishing partner as a first-time author.",
    anchor: "best self-publishing company in India",
  },
  [SLUG.COMPANIES]: {
    slug: SLUG.COMPANIES,
    title: "Comparing Self-Publishing Companies",
    blurb: "What to compare across services, cost and support before you commit.",
    anchor: "best self-publishing companies in India",
  },
  [SLUG.COMPARE]: {
    slug: SLUG.COMPARE,
    title: "Self-Publishing vs Traditional Publishing",
    blurb: "Control, royalties, timelines and credibility compared for Indian authors.",
    anchor: "self-publishing vs traditional publishing",
  },
  [SLUG.ISBN]: {
    slug: SLUG.ISBN,
    title: "ISBN Registration in India",
    blurb: "Cost, process and documents needed to get your ISBN — and keep ownership.",
    anchor: "ISBN registration process",
  },
  [SLUG.EDITING]: {
    slug: SLUG.EDITING,
    title: "Book Editing Services in India",
    blurb: "What professional editing includes and how much it costs.",
    anchor: "book editing services in India",
  },
  [SLUG.POD]: {
    slug: SLUG.POD,
    title: "Print on Demand in India",
    blurb: "How to publish and print without holding inventory.",
    anchor: "print on demand in India",
  },
  [SLUG.FIRST_BOOK]: {
    slug: SLUG.FIRST_BOOK,
    title: "Publishing Your First Book",
    blurb: "A beginner-friendly walkthrough for first-time authors.",
    anchor: "how to publish your first book in India",
  },
  [SLUG.TIMELINE]: {
    slug: SLUG.TIMELINE,
    title: "Publishing Timeline in India",
    blurb: "How long each stage takes, from manuscript to launch.",
    anchor: "publishing timeline in India",
  },
  [SLUG.MISTAKES]: {
    slug: SLUG.MISTAKES,
    title: "7 Publishing Mistakes to Avoid",
    blurb: "Common first-time author errors — and how to avoid them.",
    anchor: "publishing mistakes first-time authors must avoid",
  },
  [SLUG.MANUSCRIPT]: {
    slug: SLUG.MANUSCRIPT,
    title: "How to Structure a Manuscript",
    blurb: "Chapters, formatting and prep before your book goes to editing.",
    anchor: "how to structure a book manuscript",
  },
  [SLUG.SELF_COST]: {
    slug: SLUG.SELF_COST,
    title: "Self-Publishing Cost in India",
    blurb: "Where to invest and where to save across the self-publishing process.",
    anchor: "self-publishing cost in India",
  },
  [SLUG.NO_INVEST]: {
    slug: SLUG.NO_INVEST,
    title: "Publish a Book Without Investment",
    blurb: "Free and low-cost publishing options, and their trade-offs.",
    anchor: "publish a book without investment",
  },
  [SLUG.EARN]: {
    slug: SLUG.EARN,
    title: "How Much Authors Earn in India",
    blurb: "Real royalty numbers for self-publishing vs traditional publishing.",
    anchor: "how much authors earn in India",
  },
  [SLUG.EBOOK]: {
    slug: SLUG.EBOOK,
    title: "E-Book Publishing in India",
    blurb: "Format, publish and sell your book digitally worldwide.",
    anchor: "e-book publishing in India",
  },
  [SLUG.INTERNATIONAL]: {
    slug: SLUG.INTERNATIONAL,
    title: "Selling Books Internationally",
    blurb: "Global distribution and pricing to reach readers worldwide.",
    anchor: "how to sell books internationally",
  },
  [SLUG.HOW_CHOOSE]: {
    slug: SLUG.HOW_CHOOSE,
    title: "How to Choose a Publisher",
    blurb: "The questions to ask before you sign with any publishing company.",
    anchor: "how to choose a self-publishing company",
  },
  [SLUG.NOTION_PRESS]: {
    slug: SLUG.NOTION_PRESS,
    title: "Ritera vs Notion Press",
    blurb: "An honest comparison for first-time authors.",
    anchor: "Ritera vs Notion Press comparison",
  },
  [SLUG.NOVEL]: {
    slug: SLUG.NOVEL,
    title: "How to Publish a Novel in India",
    blurb: "From manuscript to marketing for fiction authors.",
    anchor: "how to publish a novel in India",
  },
  [SLUG.POETRY]: {
    slug: SLUG.POETRY,
    title: "Publishing a Poetry Book in India",
    blurb: "How to self-publish poetry and reach the right readers.",
    anchor: "publishing a poetry book in India",
  },
  [SLUG.CHILDREN]: {
    slug: SLUG.CHILDREN,
    title: "Publishing a Children's Book",
    blurb: "Process, illustration and design for kids' books.",
    anchor: "how to publish a children's book in India",
  },
  [SLUG.BUSY_PRO]: {
    slug: SLUG.BUSY_PRO,
    title: "Publish While Working Full-Time",
    blurb: "How busy professionals write and publish without quitting their job.",
    anchor: "write and publish a book while working full-time",
  },
  [SLUG.PERSONAL_BRAND]: {
    slug: SLUG.PERSONAL_BRAND,
    title: "Publish to Build Your Brand",
    blurb: "Using a book to build authority and professional reputation.",
    anchor: "publish a book to build your personal brand",
  },
  [SLUG.FOR_AUTHORS]: {
    slug: SLUG.FOR_AUTHORS,
    title: "Self-Publishing for Authors",
    blurb: "The complete guide to self-publishing professionally.",
    anchor: "self-publishing company for authors",
  },
  [SLUG.BROAD_CHOOSE]: {
    slug: SLUG.BROAD_CHOOSE,
    title: "Self-Publishing in India",
    blurb: "How self-publishing works and how to pick the right partner.",
    anchor: "self-publishing in India",
  },
  [SLUG.SERVICES]: {
    slug: SLUG.SERVICES,
    title: "Self-Publishing Services in India",
    blurb: "What to expect from a full-service publishing partner.",
    anchor: "self-publishing services in India",
  },
  [SLUG.TAMIL_NADU]: {
    slug: SLUG.TAMIL_NADU,
    title: "Publishing in Tamil Nadu",
    blurb: "Choosing the best self-publishing company in Tamil Nadu.",
    anchor: "self-publishing company in Tamil Nadu",
  },
  [SLUG.FIRST_TIPS]: {
    slug: SLUG.FIRST_TIPS,
    title: "First-Time Author Tips",
    blurb: "Practical advice to start your author journey with clarity.",
    anchor: "first-time author tips",
  },
  [SLUG.NEVER_WRITTEN]: {
    slug: SLUG.NEVER_WRITTEN,
    title: "Publish Even If You've Never Written",
    blurb: "A complete guide for absolute beginners.",
    anchor: "how to publish a book even if you have never written",
  },
};

// ── Cluster assignment for every post (real DB slugs) ────────────────────────

export const CLUSTER_OF: Record<string, Cluster> = {
  [SLUG.PROCESS]: "process",
  [SLUG.NEVER_WRITTEN]: "process",
  [SLUG.TIMELINE]: "process",

  [SLUG.COST]: "cost",
  [SLUG.NO_INVEST]: "cost",

  [SLUG.SERVICES]: "company",

  [SLUG.COMPANIES]: "companies",
  [SLUG.TOP_PUBLISHERS]: "companies",
  [SLUG.NOTION_PRESS]: "companies",

  [SLUG.COMPARE]: "compare",
  [SLUG.IS_BETTER]: "compare",
  [SLUG.EARN]: "compare",

  [SLUG.ISBN]: "isbn",

  [SLUG.EDITING]: "editing",
  [SLUG.MANUSCRIPT]: "editing",

  [SLUG.POD]: "printing",
  [SLUG.EBOOK]: "printing",

  [SLUG.INTERNATIONAL]: "distribution",

  [SLUG.FIRST_TIPS]: "journey",
  [SLUG.MISTAKES]: "journey",
  [SLUG.BUSY_PRO]: "journey",
  [SLUG.PERSONAL_BRAND]: "journey",
  [SLUG.REGRET]: "journey",
  [SLUG.TAKE_CONTROL]: "journey",

  [SLUG.NOVEL]: "niche",
  [SLUG.POETRY]: "niche",
  [SLUG.CHILDREN]: "niche",

  [SLUG.TAMIL_NADU]: "regional",

  [SLUG.TRUST_ARCHITECT]: "showcase",
  [SLUG.JADE_JULEP]: "showcase",
};

// ── Cluster hubs & defaults ──────────────────────────────────────────────────

const CLUSTER_PILLAR: Record<Cluster, string> = {
  process: SLUG.PROCESS,
  cost: SLUG.COST,
  company: SLUG.COMPANIES,
  companies: SLUG.COMPANIES,
  compare: SLUG.COMPARE,
  isbn: SLUG.ISBN,
  editing: SLUG.EDITING,
  printing: SLUG.POD,
  distribution: SLUG.INTERNATIONAL,
  journey: SLUG.NEVER_WRITTEN,
  niche: SLUG.PROCESS,
  regional: SLUG.COMPANIES,
  showcase: SLUG.COMPANIES,
};

/** A cross-cluster supporting guide that deepens each cluster. */
const CLUSTER_SUPPORTING: Record<Cluster, string> = {
  process: SLUG.TIMELINE,
  cost: SLUG.ISBN,
  company: SLUG.COMPARE,
  companies: SLUG.SERVICES,
  compare: SLUG.EARN,
  isbn: SLUG.COST,
  editing: SLUG.MANUSCRIPT,
  printing: SLUG.INTERNATIONAL,
  distribution: SLUG.EBOOK,
  journey: SLUG.MISTAKES,
  niche: SLUG.EDITING,
  regional: SLUG.COST,
  showcase: SLUG.POETRY,
};

export interface CommercialLink {
  href: string;
  title: string;
  blurb: string;
}

const PACKAGES_CTA: CommercialLink = {
  href: "/packages",
  title: "Self-Publishing Packages",
  blurb: "Editing, cover design, ISBN & global distribution — you keep 100% of royalties.",
};

const BOOKS_CTA: CommercialLink = {
  href: "/books",
  title: "Browse Published Books",
  blurb: "See the books Ritera has helped authors bring to life.",
};

const CLUSTER_COMMERCIAL: Record<Cluster, CommercialLink> = {
  process: PACKAGES_CTA,
  cost: PACKAGES_CTA,
  company: PACKAGES_CTA,
  companies: PACKAGES_CTA,
  compare: PACKAGES_CTA,
  isbn: PACKAGES_CTA,
  editing: PACKAGES_CTA,
  printing: PACKAGES_CTA,
  distribution: PACKAGES_CTA,
  journey: PACKAGES_CTA,
  niche: BOOKS_CTA,
  regional: PACKAGES_CTA,
  showcase: BOOKS_CTA,
};

// ── Related-guides resolver (topic-based, not category matching) ──────────────

export interface RelatedGuide extends GuideMeta {
  role: "pillar" | "sibling" | "supporting";
}

export interface RelatedGuidesResult {
  guides: RelatedGuide[];
  commercial: CommercialLink;
}

/** Ordered slug list per cluster (used to pick siblings deterministically). */
const CLUSTER_MEMBERS: Record<Cluster, string[]> = Object.entries(CLUSTER_OF).reduce(
  (acc, [slug, cluster]) => {
    (acc[cluster] ??= []).push(slug);
    return acc;
  },
  {} as Record<Cluster, string[]>
);

function metaFor(slug: string): GuideMeta | null {
  return GUIDES[slug] ?? null;
}

/**
 * Resolve the semantic related-guides module for a given post:
 *  1 parent pillar · 1–2 sibling articles · 1 supporting guide · 1 commercial page.
 * A post never links to itself, and duplicates are removed.
 */
export function getRelatedGuides(currentSlug: string): RelatedGuidesResult {
  const cluster = CLUSTER_OF[currentSlug] ?? "process";
  const used = new Set<string>([currentSlug]);
  const guides: RelatedGuide[] = [];

  const push = (slug: string | undefined, role: RelatedGuide["role"]) => {
    if (!slug || used.has(slug)) return;
    const meta = metaFor(slug);
    if (!meta) return;
    used.add(slug);
    guides.push({ ...meta, role });
  };

  // 1. Parent pillar (skip if this post *is* the pillar).
  const pillar = CLUSTER_PILLAR[cluster];
  if (pillar !== currentSlug) push(pillar, "pillar");

  // 2. Up to two siblings from the same cluster.
  const siblings = (CLUSTER_MEMBERS[cluster] ?? []).filter(
    (s) => s !== currentSlug && s !== pillar
  );
  for (const s of siblings) {
    if (guides.filter((g) => g.role === "sibling").length >= 2) break;
    push(s, "sibling");
  }

  // 3. One supporting (cross-cluster) guide.
  push(CLUSTER_SUPPORTING[cluster], "supporting");

  // Guarantee at least 3 guide cards by borrowing well-known pillars.
  // Labelled as siblings so pillar pages don't repeat "Go deeper" three times.
  const backfill = [SLUG.PROCESS, SLUG.COST, SLUG.COMPANIES, SLUG.ISBN];
  for (const s of backfill) {
    if (guides.length >= 3) break;
    push(s, "sibling");
  }

  return { guides: guides.slice(0, 4), commercial: CLUSTER_COMMERCIAL[cluster] };
}

// ── Curated pillar sets for static surfaces ──────────────────────────────────

/** Homepage "Publishing Resources" — 4 highest-value pillar guides. */
export const HOMEPAGE_PILLARS: GuideMeta[] = [
  GUIDES[SLUG.PROCESS],
  GUIDES[SLUG.COST],
  GUIDES[SLUG.COMPANIES],
  GUIDES[SLUG.COMPARE],
];

/** Footer "Publishing Guides" — evergreen pillars only (max 5). */
export const FOOTER_GUIDES: { label: string; href: string }[] = [
  { label: "How to Publish a Book in India", href: `/blog/${SLUG.PROCESS}` },
  { label: "Cost of Publishing a Book", href: `/blog/${SLUG.COST}` },
  { label: "Best Self-Publishing Companies", href: `/blog/${SLUG.COMPANIES}` },
  { label: "ISBN Registration Guide", href: `/blog/${SLUG.ISBN}` },
  { label: "Book Editing Services", href: `/blog/${SLUG.EDITING}` },
];

/** Packages page resources — cost, ISBN, editing, first-time, timeline. */
export const PACKAGES_RESOURCES: GuideMeta[] = [
  GUIDES[SLUG.COST],
  GUIDES[SLUG.ISBN],
  GUIDES[SLUG.EDITING],
  GUIDES[SLUG.NEVER_WRITTEN],
  GUIDES[SLUG.TIMELINE],
];

/** About page — max 2 trust-building educational links. */
export const ABOUT_LINKS: GuideMeta[] = [
  GUIDES[SLUG.COMPANIES],
  GUIDES[SLUG.COMPARE],
];

// ── Book genre → publishing guide ────────────────────────────────────────────

/**
 * Map a free-text book genre (e.g. "Fiction > Horror", "Poetry") to the most
 * relevant publishing guide. Falls back to the general process pillar.
 */
export function guideForGenre(genre: string | null | undefined): GuideMeta {
  const g = (genre ?? "").toLowerCase();
  if (g.includes("poetry")) return GUIDES[SLUG.POETRY];
  if (g.includes("children") || g.includes("kids")) return GUIDES[SLUG.CHILDREN];
  if (
    g.includes("fiction") ||
    g.includes("novel") ||
    g.includes("fantasy") ||
    g.includes("mythology") ||
    g.includes("literary") ||
    g.includes("short story") ||
    g.includes("horror")
  ) {
    return GUIDES[SLUG.NOVEL];
  }
  return GUIDES[SLUG.PROCESS];
}

// ── Contextual in-body link rules (render-time, content never mutated) ────────

/**
 * Ordered phrase → guide rules. The blog renderer scans post paragraphs and
 * links the FIRST natural occurrence of each phrase, subject to:
 *   - never link a post to itself
 *   - at most one link per destination per post
 *   - at most one link per sentence
 *   - a hard cap per post (see MAX_CONTEXTUAL_LINKS)
 * More specific phrases are listed first so they win over generic ones.
 */
export const CONTEXTUAL_RULES: { phrase: string; slug: string }[] = [
  { phrase: "ISBN registration process", slug: SLUG.ISBN },
  { phrase: "ISBN registration", slug: SLUG.ISBN },
  { phrase: "get an ISBN", slug: SLUG.ISBN },
  { phrase: "ISBN", slug: SLUG.ISBN },
  { phrase: "self publishing vs traditional publishing", slug: SLUG.COMPARE },
  { phrase: "traditional publishing", slug: SLUG.COMPARE },
  { phrase: "how much authors earn", slug: SLUG.EARN },
  { phrase: "cost of publishing a book in India", slug: SLUG.COST },
  { phrase: "self publishing cost", slug: SLUG.COST },
  { phrase: "publishing costs", slug: SLUG.COST },
  { phrase: "book editing services", slug: SLUG.EDITING },
  { phrase: "manuscript editing", slug: SLUG.EDITING },
  { phrase: "professional editing", slug: SLUG.EDITING },
  { phrase: "structure a book manuscript", slug: SLUG.MANUSCRIPT },
  { phrase: "publishing timeline", slug: SLUG.TIMELINE },
  { phrase: "print on demand", slug: SLUG.POD },
  { phrase: "e-book publishing", slug: SLUG.EBOOK },
  { phrase: "ebook publishing", slug: SLUG.EBOOK },
  { phrase: "sell books internationally", slug: SLUG.INTERNATIONAL },
  { phrase: "global distribution", slug: SLUG.INTERNATIONAL },
  { phrase: "best self publishing company in India", slug: SLUG.COMPANIES },
  { phrase: "best self-publishing company in India", slug: SLUG.COMPANIES },
  { phrase: "how to publish a book in India", slug: SLUG.PROCESS },
  { phrase: "publish your first book", slug: SLUG.PROCESS },
];

export const MAX_CONTEXTUAL_LINKS = 5;
