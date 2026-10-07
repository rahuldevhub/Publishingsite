# Ritera Phase 1 implementation report

Date: 7 October 2026. Stack: Next.js 16.3.3 App Router, React 19, TypeScript, Tailwind 4, Supabase CMS. Scope: factual consistency, content, schema and indexation; existing page layouts, typography, colours, animation, navigation and admin authentication retained.

## Changes implemented

- Added one company-facts source backed by existing production messaging and existing pricing data. Homepage, About, packages, footer, hero, testimonials and related-guide promotions reuse it.
- Improved About entity copy, contact/team links, distribution qualification and copyright wording. Replaced unsupported named marketing results with explicitly illustrative planning examples in the same three-card layout.
- Added reusable schema builders and safe JSON-LD serialization; migrated existing schema rather than adding duplicate page components.
- Added genuine modification timestamps to blog/case-study admin saves and visible article update dates. No automatic current-date fallback.
- Rendered the homepage's first 16 catalogue books on the server while retaining the carousel UI.
- Unified visible homepage FAQ answers with FAQ schema, including localized prices. Homepage package labels are explained as equivalents of the package table's Essential, Advanced and Premium tiers.
- Corrected archive/pagination metadata; refreshed dynamic sitemap, robots rules and dynamically generated llms.txt.
- Saved 14 reviewed published blog edits to Supabase. No article was deleted, unpublished, renamed at the URL level or newly redirected. Changes include ISBN, earnings, timelines, editing, POD and overlapping intents. Every edited field has an exact before/after backup in content-changes.json, and applied-content.json records genuine save times.
- Added 6 schema/indexation tests; existing 22 tests retained. No new dependency.

Exact application files changed:

- `app/aboutus/CounterStats.tsx`
- `app/aboutus/page.tsx`
- `app/api/admin/blog-posts/[id]/route.ts`
- `app/api/admin/case-studies/[id]/route.ts`
- `app/authors/[slug]/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/blog/category/[slug]/page.tsx`
- `app/blog/page.tsx`
- `app/books/[slug]/page.tsx`
- `app/books/page.tsx`
- `app/careers/[slug]/page.tsx`
- `app/careers/page.tsx`
- `app/case-studies/[slug]/page.tsx`
- `app/case-studies/page.tsx`
- `app/components/BooksCarousel.tsx`
- `app/components/FAQSection.tsx`
- `app/components/Footer.tsx`
- `app/components/HomePricingSection.tsx`
- `app/components/TestimonialsSection.tsx`
- `app/components/hero/hero.config.ts`
- `app/contact/page.tsx`
- `app/employee/[employee_id]/page.tsx`
- `app/layout.tsx`
- `app/litspace/[slug]/page.tsx`
- `app/litspace/category/[slug]/page.tsx`
- `app/litspace/category/page.tsx`
- `app/litspace/page.tsx`
- `app/litspace/submit/page.tsx`
- `app/packages/PackagesComparisonTable.tsx`
- `app/packages/page.tsx`
- `app/page.tsx`
- `app/people-behind-ritera/page.tsx`
- `app/sitemap.ts`
- `lib/internal-links.ts`
- `lib/stats.ts`
- `next.config.ts`
- `public/llms.txt` (removed; replaced by dynamic route)
- `public/robots.txt`
- `app/components/JsonLd.tsx`
- `app/llms.txt/route.ts`
- `lib/company-facts.ts`
- `lib/content-redirects.ts`
- `lib/home-faqs.ts`
- `lib/seo.ts`
- `lib/structured-data.ts`
- `scripts/apply-seo-phase1-content.mjs`
- `scripts/seo.test.ts`

Screenshots: `screenshots/about-production.jpg`, `screenshots/home-mobile.jpg`, `screenshots/packages-mobile.jpg`, `screenshots/isbn-mobile.jpg`.

Audit artifacts: `article-inventory.json` (all 46 stored blog URLs/titles/H1s/metadata/status), `content-changes.json` (14 exact CMS before/after edits), `applied-content.json`, `route-validation.json`, `redirect-validation.json`, this report.

## Factual inconsistencies found

| Location | Old/problematic value | Current treatment / unresolved issue |
|---|---|---|
| About metadata vs homepage/packages | 50+ countries vs 160+ | Main-page approved 160+ positioning centralized; territory, format and package conditions stated. |
| Homepage/llms FAQ | Flat global distribution assurances | 160+ countries / 40,000+ stores describes distribution options, not stock, placement or sales. Essential/Standard table still excludes international distribution. |
| About royalties | Every rupee goes to the author | 100% of payable royalties, with retailer/printing/distribution/tax deductions subject to agreement. Not 100% of retail price. |
| Homepage/About/llms process | 12-day kickoff / universal 30-day publishing promise | Manuscript-specific timeline depending on editing, approvals, production and retailer processing. Historical case durations not generalized. |
| llms / people / unused statistics | 4,000+ books vs 500+ books | Removed unsupported lifetime book total; catalogue count is not a lifetime publishing total. Owner verification required. |
| Pricing/llms | Independently maintained price and converted-dollar statements | Existing pricing module remains authoritative; starting Essential INR price ₹11,999, existing currency logic preserved. |
| About three marketing cards | Named authors; 150–200% sales increases; 2.5–3× ROI; exact ad spend, revenue, reach and clicks without source records | Removed names and measured-result claims; same layout now explicitly shows possible campaign plans and measures to review, with no promised outcome. |
| ISBN and manuscript/process/novel guides | ISBN treated as universally required, recognition/rights guarantee, or mandatory for every eBook | Format/platform-specific identification; Kindle eBook exception; ISBN separate from copyright. |
| ISBN guide | Paid service gives faster approval; guaranteed processing ranges | Agency allocation distinct from administrative service fees; no guaranteed priority or fixed approval period. |
| Process guide | Cover design increases click-through by 40%; broad 60–80% vs 10–15% royalty ranges | Removed unsupported statistic/ranges. |
| Earnings guide | Unsupported industry averages and payout guarantees | Royalties explained by contract/platform and costs; explicitly hypothetical arithmetic examples. |
| POD guide | Direct KDP domestic India print implication, fixed per-copy ₹40–120 range, zero-all-cost wording | Separates KDP international print marketplaces from Amazon.in third-party/domestic arrangements; costs depend on specification/channel. |
| Editing / novel guides | Market-wide cost and delivery ranges without sources | Scope-based quotes and individualized timelines. |
| Existing counters | 500+ authors, 4.9/5 rating, 120+ reviews, 24/7 support | Centralized and retained as existing public positioning, explicitly marked pending verification in configuration. Not independently verified. |

Existing contracts/Terms and imprint rights were not rewritten. The Ritera Exclusive author biography claims exclusive ownership/distribution; this may describe a separate imprint agreement and requires legal/content-owner review against general copyright positioning.

Primary sources used for publishing corrections:

- [KDP ISBN and imprint requirements](https://kdp.amazon.com/en_US/help/topic/G201834170).
- [KDP paperback royalty calculations](https://kdp.amazon.com/en_US/help/topic/G201834330).
- [KDP paperback/hardcover distribution territories](https://kdp.amazon.com/en_US/help/topic/G201834280).
- [Indian ISBN agency FAQ](https://isbn.gov.in/Images/FAQs.pdf), [agency application manual](https://isbn.gov.in/Images/usermanual-general.pdf).
- [Copyright Office handbook](https://copyright.gov.in/documents/handbook.html) linked for rights review; no new contractual interpretation asserted.

## Duplicate content findings

URLs below are relative to https://riterapublishing.com. All 46 stored blog records were inspected; 32 are currently published, 14 already retired. Current traffic data was not fetched: comments describing historical Search Console winners in existing configuration are inherited rationale, not newly verified performance evidence.

| Cluster | Primary target | Secondary intent / action |
|---|---|---|
| General publishing process | `/blog/how-to-publish-a-book-in-india-step-by-step-guide-2026` | Four already-retired process/first-book guides retain existing 308 redirects. Primary metadata/body tightened. Beginner-without-writing, personal branding and busy-professional guides retained for distinct audience/use-case intent. Further consolidation needs traffic/backlink review. |
| First-time author advice | Process pillar above | `/blog/first-time-author-tips-india` now preparation checklist intent; mistakes and beginner-writing guides retained. No new cross-canonical. |
| Publishing method comparison | `/blog/self-publishing-vs-traditional-publishing-in-india-2026-which-is-better-for-you` | `/blog/is-self-publishing-better-than-traditional-publishing-in-india` now personal suitability decision guide; title/H1/metadata/intro and contextual comparison link differentiated. |
| Publishing costs | `/blog/how-much-does-self-publishing-cost-in-india-complete-guide-for-first-time-authors` | Two retired cost URLs retain existing redirects. Editing services guide focuses manuscript/editing scope; earnings guide focuses payout economics; without-investment guide focuses funding route. No new redirect. |
| Publisher selection | `/blog/best-self-publishing-companies-in-india` | Eight retired selection articles retain existing redirects. `/blog/top-publishing-companies-in-india` broadened to traditional/DIY/provider options; title/H1/intro/metadata and contextual shortlist link differentiated. Tamil Nadu and Ritera-vs-Notion pages retained for local/brand-specific intent; competitor pricing needs current verification. |
| Publishing services vs process | Process pillar | `/blog/self-publishing-services-in-india-what-authors-should-expect-before-publishing` retains service scope/contract intent; manuscript structure and timeline pages retain preparation/scheduling intent. ISBN statements corrected. |
| ISBN / KDP / POD | `/blog/isbn-for-self-publishing-in-india-cost-process-and-how-to-get-it-2026-guide` | ISBN identifier/application intent differentiated from digital publishing and `/blog/print-on-demand-in-india` production/distribution intent. Factual corrections and links; no standalone KDP duplicate identified. |
| Marketing | `/blog/how-to-market-and-sell-a-self-published-book-a-practical-guide` | First-time marketing mistakes remains troubleshooting intent; international-sales guide remains territory/channel intent. Keep self-canonicals; consolidating requires owner/traffic review. |
| Book features / anthologies / case studies | Separate existing URLs | Actual title/author links added only where catalogue matches explicit book names. Generic case-study attribution not fabricated. Evidence review required before merging or claiming results. |

New redirects: **none**. New article deletions/unpublishing: **none**. Existing redirect map moved to `lib/content-redirects.ts`, shared with sitemap exclusions. Indexable distinct articles remain self-canonical. Review Search Console queries, traffic and backlinks before any further consolidation.

Retained exact article redirects:

| Source | Destination |
|---|---|
| `/blog/how-to-self-publish-a-book-in-india-step-by-step-guide-for-first-time-authors` | `/blog/how-to-publish-a-book-in-india-step-by-step-guide-2026` |
| `/blog/how-to-publish-a-book-in-india-step-by-step-complete-2026-guide` | `/blog/how-to-publish-a-book-in-india-step-by-step-guide-2026` |
| `/blog/how-to-publish-your-first-book-in-india` | `/blog/how-to-publish-a-book-in-india-step-by-step-guide-2026` |
| `/blog/first-time-author-publishing-in-india-everything-you-need-to-know` | `/blog/how-to-publish-a-book-in-india-step-by-step-guide-2026` |
| `/blog/how-much-does-it-cost-to-publish-a-book-in-india-complete-cost-breakdown-2026` | `/blog/how-much-does-self-publishing-cost-in-india-complete-guide-for-first-time-authors` |
| `/blog/cost-of-publishing-a-book-in-india-2026-complete-breakdown-for-first-time-authors` | `/blog/how-much-does-self-publishing-cost-in-india-complete-guide-for-first-time-authors` |
| `/blog/top-self-publishing-company-in-india-why-authors-choose-ritera-publishing` | `/blog/best-self-publishing-companies-in-india` |
| `/blog/top-self-publishing-companies-in-india-what-authors-should-really-look-for` | `/blog/best-self-publishing-companies-in-india` |
| `/blog/which-is-the-best-self-publishing-company-in-india-for-authors` | `/blog/best-self-publishing-companies-in-india` |
| `/blog/best-self-publishing-companies-in-india-2026-honest-comparison-for-first-time-authors` | `/blog/best-self-publishing-companies-in-india` |
| `/blog/best-self-publishing-company-in-india-complete-guide-for-first-time-authors` | `/blog/best-self-publishing-companies-in-india` |
| `/blog/best-self-publishing-company-for-authors-2026-guide` | `/blog/best-self-publishing-companies-in-india` |
| `/blog/how-to-choose-the-best-self-publishing-company-in-india-before-publishing-your-first-book` | `/blog/best-self-publishing-companies-in-india` |
| `/blog/self-publishing-in-india-how-to-choose-the-right-self-publishing-company-for-your-book` | `/blog/best-self-publishing-companies-in-india` |
| `/blog/how-to-publish-a-book-in-india-even-if-the-u-have-never-written-anything-before-` | `/blog/how-to-publish-a-book-in-india-even-if-you-have-never-written-anything-before` |

## Structured data

- Global: exactly one Organization and one WebSite per rendered document, stable `@id` links, current description/contact/socials. Removed unsupported LocalBusiness hours/priceRange. No unsupported SearchAction.
- Shared builders: Organization, WebSite, Article and BreadcrumbList; safe serializer prevents a CMS value containing `</script>` from terminating a JSON-LD script.
- Existing page-specific types retained: AboutPage, WebPage, Service, FAQPage, HowTo, Book and Person; JobPosting retained on existing career-detail templates. Nested types include Offer, ImageObject, PostalAddress, ContactPoint, ListItem and HowToStep.
- Article author supports actual named people/profile URLs; the generic Ritera Exclusive editorial label references the Organization instead of inventing a Person. Dates use genuine stored values only.
- Breadcrumb paths agree with visible blog category/book genre hierarchy. Existing author Person schema no longer asserts publisher employment. Book offers no longer assert unverified InStock availability.
- Homepage HowTo remains the actual visible publishing process; unsupported total-duration claim removed. FAQ answers share the visible content source.
- Syntax and targeted properties validated locally; this does not claim a Google rich-result eligibility certification or guaranteed search/AI placement.

## Technical SEO

| Area | Status |
|---|---|
| Canonical domain | `https://riterapublishing.com`; single canonical on all 51 checked page variants. |
| Host/protocol/slash variants | Production HTTP→HTTPS and www→non-www About URL return 308. Local www host condition and trailing-slash normalization verified. Existing deployment configuration retained. |
| Query parameters | Positive archive page numbers retain distinct self-canonical URLs; tracking-only variants normalize. Filtered book views have meaningful self-canonicals and noindex/follow. No query URLs in sitemap. |
| Sitemap | Dynamic hourly revalidation; 97 unique canonical URLs: 9 static, 32 blogs, 3 cases, 28 books, 25 authors. Excludes retired redirects/private/query URLs. Uses real content edit dates; static pages/authors without persisted edit dates omit lastmod. Query errors fail instead of silently producing partial output. |
| robots | Public crawling allowed, sitemap URL correct, exact/slash admin/API/employee/reviewer paths disallowed. No new AI-crawler blocks. Robots is not an authentication boundary. |
| Metadata | Important pages have descriptions/canonicals/OG images; duplicate brand suffixes fixed; pagination/category titles distinguish pages; edited article metadata avoids keyword stuffing. |
| Heading structure | One H1 on all 51 checked variants. Article/case-study headings use semantic sections; missing-space markdown `##Heading` in stored cases now recognized. CSS typography unchanged. |
| AI-readable HTML | Business descriptions/prices/FAQ and first 16 shelf book names/links available in server HTML; counter values available before animation. Dynamic llms.txt uses same facts/prices; it is supplementary, not a ranking guarantee. |

## Internal linking

- Updated factual guides link to the process pillar, package services and related specialist guides.
- Method decision guide points to comparative guide; broader publisher-options guide points to shortlist.
- Trust Architect feature and explicitly matching case-study book names link to actual catalogue books/authors.
- About links to packages, educational guides, team and contact.
- Existing package/footer related-guide navigation preserved; royalty wording now sourced centrally.

## Issues not changed

Require business/legal/content-owner evidence before further changes:

1. Confirm 500+ authors, 4.9/5 rating, 120+ Google reviews and 24/7 support. Contact page separately lists Mon–Sat telephone hours and a 24-business-hour reply expectation; distinguish channels and staffed hours.
2. Confirm network reach, rights, royalty accounting basis, package inclusions and lifetime book totals against agreements/provider records. Catalogue counts do not establish lifetime totals.
3. Case-study claim of Jade Julep 4,000+ copies/month and other historical measurable-success statements require retailer/ads records. Generic case-study subjects and book-title fields need attribution review.
4. Three About interview labels reuse one YouTube ID. Verify recordings/labels before replacing them; no new interview or testimonial invented.
5. Current Notion Press pricing/comparative claims need primary source/date review. Historical public-facing numbers in remaining posts should be reviewed periodically rather than treated as verified permanent data.
6. Editorial Ritera Exclusive imprint biography/rights claims may differ from ordinary author packages; review actual agreements rather than rewriting contractual terms.
7. Inactive sample activity-feed data in hero configuration is not rendered; should not be activated as live author activity without genuine events.
8. No further consolidation without Search Console/backlink review. No new service landing pages or Phase 2 entity expansion.
9. Mobile package table retains its existing horizontal-scroll design; no responsive redesign undertaken.

## Validation

- `npm run build -- --webpack`: PASS (production compile, TypeScript and static generation). Initial attempt failed fetching Google fonts; retry succeeded without font/design/dependency changes.
- Default `npm run build`: attempted; Turbopack worker failed with an environment port-binding permission restriction. Webpack production build provides compile validation; default Turbopack is not reported as passed.
- `npm run lint`: PASS, zero errors; one pre-existing unused `TabStopType` warning in unrelated user file `create_seo_report.mjs`.
- `npx tsc --noEmit`: PASS.
- `npm test`: all 28 tests PASS, including 6 new schema/archive/redirect tests and existing security tests.
- HTTP smoke: 51 page variants PASS on both dev and local production build, including all 32 published blogs and 3 cases; JSON-LD parse, one canonical/H1, descriptions/OG, editorial author, sitemap and llms checks.
- Unauthenticated affected admin API reads/updates return 401; admin/employee pages retain noindex. Authenticated save paths inspected; no real admin session bypassed.
- Retained 15 blog redirects, local slash/www, and live HTTP/www canonicalization validated.
- Mobile menu→packages interaction, desktop About and mobile ISBN article inspected in browser. Contact form labels/controls and existing security tests checked; no test enquiry sent into production.
- CMS read-only recheck: zero pending edits, all 14 saved values match reviewed plan.
- `git diff --check`: PASS.

Code changes are local and require deployment before they affect production templates. The 14 CMS edits are already saved to the content source. No deployment or Git push performed for this phase.

CMS rollback (only if intended): `node --env-file=.env.local scripts/apply-seo-phase1-content.mjs --rollback`. It restores only backed-up fields, refuses intervening edits and records a genuine rollback modification time. Credentials remain in local environment files and are not included in audit artifacts.
