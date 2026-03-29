import type { NextConfig } from "next";

const securityHeaders = [
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

const nextConfig: NextConfig = {
  // Enable gzip/brotli compression
  compress: true,

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
