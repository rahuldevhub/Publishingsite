import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";
const LAST_UPDATED = "March 2026";
const CONTACT_EMAIL = "contact@riterapublishing.com";

export const metadata: Metadata = {
  title: "Privacy Policy | Ritera Publishing",
  description:
    "Ritera Publishing's Privacy Policy — how we collect, use, and protect your personal information.",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    id: "information-we-collect",
    heading: "1. Information We Collect",
    content: [
      {
        sub: "Information you provide directly",
        body: "When you submit a publishing enquiry, fill out a contact form, subscribe to our newsletter, or submit work to LitSpace, we collect your name, email address, phone number, and any content you voluntarily share.",
      },
      {
        sub: "Usage data",
        body: "We automatically collect certain information when you visit our website, including your IP address, browser type, pages visited, and referring URLs. This data is collected through standard server logs and analytics tools.",
      },
      {
        sub: "Cookies",
        body: "We use cookies to maintain session state (e.g., admin login sessions) and to understand how visitors use our website. You can control cookie settings through your browser preferences.",
      },
    ],
  },
  {
    id: "how-we-use-information",
    heading: "2. How We Use Your Information",
    content: [
      {
        sub: "To provide our services",
        body: "We use your contact information to respond to enquiries, process publishing agreements, and deliver the services you request.",
      },
      {
        sub: "To communicate with you",
        body: "With your consent, we may send you updates about new services, community events, and publishing tips. You can unsubscribe at any time using the link in any email we send.",
      },
      {
        sub: "To improve our website",
        body: "We use aggregated, anonymised usage data to understand how visitors interact with our website and to make improvements.",
      },
    ],
  },
  {
    id: "data-sharing",
    heading: "3. Data Sharing and Disclosure",
    content: [
      {
        sub: "We do not sell your data",
        body: "Ritera Publishing will never sell, rent, or trade your personal information to third parties for marketing purposes.",
      },
      {
        sub: "Service providers",
        body: "We share data only with trusted service providers who help us operate our website and services (e.g., Supabase for database hosting, Vercel for web hosting). These providers are contractually obligated to protect your data.",
      },
      {
        sub: "Legal requirements",
        body: "We may disclose your information if required by law, court order, or to protect the rights and safety of Ritera Publishing, its users, or the public.",
      },
    ],
  },
  {
    id: "data-security",
    heading: "4. Data Security",
    content: [
      {
        sub: "How we protect your data",
        body: "We implement industry-standard security measures including encrypted connections (HTTPS), secure database storage, and access controls. Only authorised personnel can access personal data.",
      },
      {
        sub: "Data retention",
        body: "We retain your information for as long as necessary to provide our services or as required by law. You may request deletion of your data at any time by contacting us.",
      },
    ],
  },
  {
    id: "your-rights",
    heading: "5. Your Rights",
    content: [
      {
        sub: "Access and correction",
        body: "You have the right to access the personal information we hold about you and to request corrections if it is inaccurate or incomplete.",
      },
      {
        sub: "Deletion",
        body: "You may request that we delete your personal information. We will comply unless we are required to retain it for legal or legitimate business reasons.",
      },
      {
        sub: "Withdrawal of consent",
        body: "Where we process your data based on consent (e.g., newsletter), you may withdraw consent at any time without affecting the lawfulness of prior processing.",
      },
      {
        sub: "Complaints",
        body: "If you believe we have not handled your data appropriately, you have the right to lodge a complaint with the relevant data protection authority in your jurisdiction.",
      },
    ],
  },
  {
    id: "third-party-links",
    heading: "6. Third-Party Links",
    content: [
      {
        sub: "",
        body: "Our website may contain links to third-party websites such as Amazon, Instagram, or YouTube. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.",
      },
    ],
  },
  {
    id: "children",
    heading: "7. Children's Privacy",
    content: [
      {
        sub: "",
        body: "Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.",
      },
    ],
  },
  {
    id: "changes",
    heading: "8. Changes to This Policy",
    content: [
      {
        sub: "",
        body: "We may update this Privacy Policy from time to time. When we do, we will revise the 'Last Updated' date at the top of this page. We encourage you to review this policy periodically.",
      },
    ],
  },
  {
    id: "contact",
    heading: "9. Contact Us",
    content: [
      {
        sub: "",
        body: `If you have any questions about this Privacy Policy or how we handle your personal data, please contact us at ${CONTACT_EMAIL} or through our Contact page.`,
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-20">
          <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">Legal</p>
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-3">Privacy Policy</h1>
          <p className="text-gray-400 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">

          {/* Sticky ToC — desktop */}
          <nav className="hidden lg:block">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Contents</p>
            <ul className="space-y-2 sticky top-24">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-xs text-gray-500 hover:text-gray-900 transition-colors leading-snug block"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <article className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-10 text-base border-l-4 border-amber-400 pl-4">
              Ritera Publishing (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use, and safeguard
              your information when you visit{" "}
              <span className="font-medium text-gray-900">riterapublishing.com</span>.
            </p>

            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="mb-10 scroll-mt-24">
                <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.content.map((item, i) => (
                    <div key={i}>
                      {item.sub && (
                        <h3 className="text-sm font-semibold text-gray-800 mb-1">{item.sub}</h3>
                      )}
                      <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap gap-4 text-sm">
              <Link href="/contact" className="text-gray-900 font-medium underline underline-offset-2 hover:text-amber-600 transition-colors">
                Contact Us
              </Link>
              <Link href="/terms-of-service" className="text-gray-500 hover:text-gray-900 transition-colors">
                Terms of Service →
              </Link>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
