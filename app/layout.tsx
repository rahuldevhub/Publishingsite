import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProgressBarProvider from "@/app/components/ProgressBarProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ritera Publishing — Self-Publish with Confidence",
  description:
    "Ritera Publishing helps Indian authors self-publish professionally with 100% royalties, global distribution, and expert editorial support.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://riterapublishing.com/#website",
  name: "Ritera Publishing",
  url: "https://riterapublishing.com",
  description:
    "Tamil Nadu-based self-publishing platform helping Indian authors publish professionally with 100% royalties and global distribution.",
  publisher: {
    "@type": "Organization",
    "@id": "https://riterapublishing.com/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://riterapublishing.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
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
    "Tamil Nadu-based self-publishing platform offering end-to-end services including editing, cover design, formatting, ISBN registration, and global distribution. Authors retain 100% of their royalties.",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  areaServed: "IN",
  sameAs: [
    "https://www.instagram.com/ritera_publishing",
    "https://www.linkedin.com/company/ritera-publishing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
