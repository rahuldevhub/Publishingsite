import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProgressBarProvider from "@/app/components/ProgressBarProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://riterapublishing.com"),
  title: {
    default: "Self Publishing Company in India | Ritera Publishing",
    template: "%s | Ritera Publishing",
  },
  description:
    "Ritera Publishing — India's trusted self-publishing company. Professional editing, cover design, ISBN registration, and Amazon distribution with 100% royalties for first-time and experienced authors.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://riterapublishing.com/#website",
  name: "Ritera Publishing",
  url: "https://riterapublishing.com",
  description:
    "Tamil Nadu-based self-publishing company helping Indian authors publish professionally with 100% royalties, ISBN registration, and global distribution to 160+ countries.",
  publisher: {
    "@type": "Organization",
    "@id": "https://riterapublishing.com/#organization",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": "https://riterapublishing.com/#organization",
  name: "Ritera Publishing",
  url: "https://riterapublishing.com",
  logo: {
    "@type": "ImageObject",
    url: "https://riterapublishing.com/logo.png",
  },
  description:
    "Tamil Nadu-based self-publishing company offering end-to-end services including professional editing, cover design, formatting, ISBN registration, and global distribution across 160+ countries. Authors retain 100% of their royalties.",
  telephone: "+919488854787",
  email: "contact@riterapublishing.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tamil Nadu",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  areaServed: "IN",
  priceRange: "₹₹",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "120",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://www.instagram.com/ritera_publishing",
    "https://www.linkedin.com/company/ritera-publishing",
    "https://www.youtube.com/@RiteraPublishing",
    "https://medium.com/@riterapublishing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${playfairDisplay.variable} antialiased`}>
        {/* Organization + LocalBusiness JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {/* WebSite JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init','1634956607817283');
              fbq('track','PageView');
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1634956607817283&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <ProgressBarProvider />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
