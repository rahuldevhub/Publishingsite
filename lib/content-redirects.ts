// Previously deployed consolidations; no new article retirement in Phase 1.
export const consolidatedBlogRedirects = [
  // Publishing process → the Search Console winner.
  [
    "/blog/how-to-self-publish-a-book-in-india-step-by-step-guide-for-first-time-authors",
    "/blog/how-to-publish-a-book-in-india-step-by-step-guide-2026",
  ],
  [
    "/blog/how-to-publish-a-book-in-india-step-by-step-complete-2026-guide",
    "/blog/how-to-publish-a-book-in-india-step-by-step-guide-2026",
  ],
  [
    "/blog/how-to-publish-your-first-book-in-india",
    "/blog/how-to-publish-a-book-in-india-step-by-step-guide-2026",
  ],
  [
    "/blog/first-time-author-publishing-in-india-everything-you-need-to-know",
    "/blog/how-to-publish-a-book-in-india-step-by-step-guide-2026",
  ],

  // Publishing cost → the most complete current guide.
  [
    "/blog/how-much-does-it-cost-to-publish-a-book-in-india-complete-cost-breakdown-2026",
    "/blog/how-much-does-self-publishing-cost-in-india-complete-guide-for-first-time-authors",
  ],
  [
    "/blog/cost-of-publishing-a-book-in-india-2026-complete-breakdown-for-first-time-authors",
    "/blog/how-much-does-self-publishing-cost-in-india-complete-guide-for-first-time-authors",
  ],

  // Publisher selection → the highest-performing comparison guide.
  [
    "/blog/top-self-publishing-company-in-india-why-authors-choose-ritera-publishing",
    "/blog/best-self-publishing-companies-in-india",
  ],
  [
    "/blog/top-self-publishing-companies-in-india-what-authors-should-really-look-for",
    "/blog/best-self-publishing-companies-in-india",
  ],
  [
    "/blog/which-is-the-best-self-publishing-company-in-india-for-authors",
    "/blog/best-self-publishing-companies-in-india",
  ],
  [
    "/blog/best-self-publishing-companies-in-india-2026-honest-comparison-for-first-time-authors",
    "/blog/best-self-publishing-companies-in-india",
  ],
  [
    "/blog/best-self-publishing-company-in-india-complete-guide-for-first-time-authors",
    "/blog/best-self-publishing-companies-in-india",
  ],
  [
    "/blog/best-self-publishing-company-for-authors-2026-guide",
    "/blog/best-self-publishing-companies-in-india",
  ],
  [
    "/blog/how-to-choose-the-best-self-publishing-company-in-india-before-publishing-your-first-book",
    "/blog/best-self-publishing-companies-in-india",
  ],
  [
    "/blog/self-publishing-in-india-how-to-choose-the-right-self-publishing-company-for-your-book",
    "/blog/best-self-publishing-companies-in-india",
  ],

  // Historical typo that has already received a Google click.
  [
    "/blog/how-to-publish-a-book-in-india-even-if-the-u-have-never-written-anything-before-",
    "/blog/how-to-publish-a-book-in-india-even-if-you-have-never-written-anything-before",
  ],
] as const;


export const retiredBlogSlugs = new Set(consolidatedBlogRedirects.map(([source]) => source.slice("/blog/".length)));
