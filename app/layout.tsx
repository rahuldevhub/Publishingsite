import { COMPANY_FACTS } from "@/lib/company-facts";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import JsonLd from "@/app/components/JsonLd";
import CurrencyProvider from "@/app/components/CurrencyProvider";
import { getVisitorCurrency } from "@/lib/pricing-server";
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
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY_FACTS.url),
  title: {
    default: "Self Publishing Company in India | Ritera Publishing",
    template: "%s | Ritera Publishing",
  },
  description:
    COMPANY_FACTS.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialCurrency = await getVisitorCurrency();
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${playfairDisplay.variable} antialiased`}>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {/* GA4: enhanced measurement handles browser-history page views. */}
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-3LVBNR6JFN"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-3LVBNR6JFN');
              `}
            </Script>
          </>
        )}
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
        <CurrencyProvider initialCurrency={initialCurrency}>
        <ProgressBarProvider />
        <Header />
        {children}
        <Footer />
        </CurrencyProvider>
      </body>
    </html>
  );
}
