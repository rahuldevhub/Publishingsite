import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Supabase project origin — REST/Storage over HTTPS, Realtime over WSS.
const SUPABASE_ORIGIN = "https://pcahrnefcnrjdjqkrany.supabase.co";
const SUPABASE_WSS = "wss://pcahrnefcnrjdjqkrany.supabase.co";

// Content Security Policy.
// 'unsafe-inline' is required for script-src (Next.js hydration bootstrap, the
// ~34 inline application/ld+json structured-data blocks, and the Meta Pixel
// loader) and for style-src (next/font's injected styles and framer-motion's
// inline element styles). 'unsafe-eval' and ws:/wss: are added only in dev for
// React Fast Refresh / HMR. Every other directive is locked to the exact
// origins the site actually loads from:
//   • Google Analytics — tag script and event collection
//   • Supabase          — data (connect) + Storage images (img)
//   • connect.facebook.net / www.facebook.com — Meta Pixel script/beacon/pixel
//   • placehold.co       — cover/thumbnail placeholders (img)
//   • YouTube            — author/about interview embeds (frame)
const contentSecurityPolicy = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://connect.facebook.net https://www.googletagmanager.com`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob: ${SUPABASE_ORIGIN} https://placehold.co https://www.facebook.com https://i.ytimg.com https://*.google-analytics.com https://*.googletagmanager.com`,
  `font-src 'self' data:`,
  `connect-src 'self' https://analytics.google.com https://www.google.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://ipapi.co ${SUPABASE_ORIGIN} ${SUPABASE_WSS} https://www.facebook.com https://connect.facebook.net${isDev ? " ws: wss:" : ""}`,
  `frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.facebook.com`,
  `media-src 'self'`,
  `worker-src 'self' blob:`,
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'self'`,
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  // Restrict where scripts, styles, images, frames, and connections may load from
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Block clickjacking — allow same-origin iframes (YouTube embeds use cross-origin, handled by CSP)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Legacy XSS filter for older browsers
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Don't send full URL in Referer header to third parties
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict access to device APIs
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Force HTTPS for 2 years (only active in production behind TLS)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

// Search-intent consolidation: each retired article permanently forwards to
// the strongest page for that topic. Retired posts are also unpublished in the
// CMS so they disappear from listings and the generated sitemap.
const consolidatedBlogRedirects = [
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

const nextConfig: NextConfig = {
  // Enable gzip/brotli compression
  compress: true,

  async redirects() {
    return [
      // Keep one canonical hostname. The host condition preserves the full
      // path and query string while consolidating www traffic on the URL used
      // by metadata, structured data, and the sitemap.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.riterapublishing.com" }],
        destination: "https://riterapublishing.com/:path*",
        permanent: true,
      },

      // Legacy category routes reported as 404s in Google Search Console.
      {
        source: "/litspace-category/:slug*",
        destination: "/litspace/category/:slug*",
        permanent: true,
      },
      {
        source: "/blog-category/:slug*",
        destination: "/blog/category/:slug*",
        permanent: true,
      },

      // Legacy LitSpace URLs reported by Search Console.
      {
        source: "/literayhub-short-stories",
        destination: "/litspace/category/short-story",
        permanent: true,
      },
      ...consolidatedBlogRedirects.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pcahrnefcnrjdjqkrany.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // Serve optimized WebP/AVIF automatically for Next.js <Image> components
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      // Security headers on all routes
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Long-lived cache for static images (content-hashed by filename after optimization)
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Long-lived cache for videos
      {
        source: "/landingvideo/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
