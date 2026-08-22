// Canonical production domain. Hardcoded (not env-driven) so canonical tags,
// OG/Twitter URLs, and the sitemap can never drift to a misconfigured
// NEXT_PUBLIC_SITE_URL (e.g. a local/staging value leaking into production).
export const SITE_URL = "https://riterapublishing.com";
