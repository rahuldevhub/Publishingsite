/**
 * Single source of truth for all Ritera Publishing business metrics.
 * Import from here everywhere — never hardcode these values in components.
 */
export const SITE_STATS = {
  booksPublished:     { num: 4000, display: "4,000+",  label: "Books Published" },
  countries:          { num: 160,  display: "160+",    label: "Countries" },
  authorRating:       { num: 4.9,  display: "4.9",     label: "Author Rating" },
  ratingCount:        { num: 120,  display: "120+",    label: "Reviews" },
  happyAuthors:       { num: 500,  display: "500+",    label: "Happy Authors" },
  storesWorldwide:    { num: 40000, display: "40,000+", label: "Stores Worldwide" },
  avgKickoffDays:     { num: 12,   display: "12",      label: "Avg Kickoff Days" },
} as const;

export const ROYALTIES = "100%" as const;
export const STARTING_PRICE_INR = "₹11,999" as const;
export const STARTING_PRICE_USD = "$149" as const;
