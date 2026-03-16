import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";
const LAST_UPDATED = "March 2026";
const CONTACT_EMAIL = "contact@riterapublishing.com";

export const metadata: Metadata = {
  title: "Terms of Service | Ritera Publishing",
  description:
    "Ritera Publishing's Terms of Service — the rules and guidelines that govern use of our publishing services and website.",
  alternates: { canonical: `${SITE_URL}/terms-of-service` },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    id: "agreement",
    heading: "1. Agreement to Terms",
    content: [
      {
        sub: "",
        body: "By accessing our website at riterapublishing.com or using any of our publishing services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
      },
      {
        sub: "",
        body: "We reserve the right to update these terms at any time. Continued use of our services after changes are posted constitutes acceptance of the revised terms.",
      },
    ],
  },
  {
    id: "services",
    heading: "2. Services Provided",
    content: [
      {
        sub: "Publishing services",
        body: "Ritera Publishing offers self-publishing services including editing, cover design, formatting, ISBN registration, distribution to platforms such as Amazon and Flipkart, and marketing support. Specific services are defined in your chosen package agreement.",
      },
      {
        sub: "LitSpace community platform",
        body: "LitSpace is a community platform where writers may submit poetry, short stories, and articles for publication in our anthologies or online platform. Submission of content to LitSpace implies consent for us to publish, edit, and distribute that content as part of our anthology collections.",
      },
      {
        sub: "Service availability",
        body: "We strive to maintain continuous service availability but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any service with reasonable notice.",
      },
    ],
  },
  {
    id: "author-rights",
    heading: "3. Author Rights and Royalties",
    content: [
      {
        sub: "Intellectual property",
        body: "You retain full copyright and intellectual property rights over your original work. By engaging our services, you grant Ritera Publishing a non-exclusive licence to publish, distribute, and promote your work as part of the agreed services.",
      },
      {
        sub: "Royalties",
        body: "Authors receive royalties as specified in their individual publishing agreement. Royalty structures are transparent and communicated in writing before any service begins. Ritera Publishing does not retain royalties beyond those explicitly agreed upon in the publishing contract.",
      },
      {
        sub: "Distribution",
        body: "Once published, distribution timelines and platform availability depend on third-party platforms (e.g., Amazon, Flipkart) and are subject to their policies. We are not liable for delays or changes caused by those platforms.",
      },
    ],
  },
  {
    id: "user-responsibilities",
    heading: "4. User Responsibilities",
    content: [
      {
        sub: "Original content",
        body: "By submitting content for publishing or to LitSpace, you confirm that: (a) the work is your original creation; (b) you hold all necessary rights to publish it; (c) it does not infringe any third-party intellectual property rights; and (d) it does not violate any applicable law.",
      },
      {
        sub: "Prohibited content",
        body: "You may not submit content that is defamatory, obscene, hateful, incites violence, or otherwise unlawful. We reserve the right to refuse or remove any content that violates these standards without refund.",
      },
      {
        sub: "Account security",
        body: "If you hold an account or login credentials with us, you are responsible for maintaining the confidentiality of those credentials. Notify us immediately of any unauthorised access.",
      },
      {
        sub: "Accurate information",
        body: "You agree to provide accurate and truthful information in all communications, forms, and agreements with Ritera Publishing.",
      },
    ],
  },
  {
    id: "payments",
    heading: "5. Payments and Refunds",
    content: [
      {
        sub: "Payment terms",
        body: "All service fees are communicated before work begins and must be paid as per the agreed schedule. Services will commence upon receipt of the agreed payment.",
      },
      {
        sub: "Refund policy",
        body: "Refunds are considered on a case-by-case basis depending on the stage of work completed. Once design, editing, or distribution work has begun, partial or full refunds may not be available. Please review your individual package agreement for specific refund terms.",
      },
    ],
  },
  {
    id: "limitation-of-liability",
    heading: "6. Limitation of Liability",
    content: [
      {
        sub: "",
        body: "To the maximum extent permitted by applicable law, Ritera Publishing and its employees, directors, and partners shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our services.",
      },
      {
        sub: "",
        body: "Our total liability for any claim relating to our services shall not exceed the amount you paid for the specific service giving rise to the claim.",
      },
      {
        sub: "Third-party platforms",
        body: "We are not responsible for the policies, actions, or decisions of third-party distribution platforms (e.g., Amazon, Flipkart) including but not limited to takedowns, ranking changes, or royalty payment schedules.",
      },
    ],
  },
  {
    id: "disclaimer",
    heading: "7. Disclaimer of Warranties",
    content: [
      {
        sub: "",
        body: 'Our services are provided on an "as is" and "as available" basis. We make no warranties — express or implied — regarding the merchantability, fitness for a particular purpose, or non-infringement of our services.',
      },
      {
        sub: "",
        body: "We do not guarantee that publishing your book will result in any specific level of sales, visibility, or commercial success. Marketing outcomes depend on many factors outside our control.",
      },
    ],
  },
  {
    id: "governing-law",
    heading: "8. Governing Law",
    content: [
      {
        sub: "",
        body: "These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Tamil Nadu, India.",
      },
    ],
  },
  {
    id: "contact",
    heading: "9. Contact Us",
    content: [
      {
        sub: "",
        body: `If you have any questions about these Terms of Service, please contact us at ${CONTACT_EMAIL} or through our Contact page. We are happy to clarify any aspect of these terms before you engage our services.`,
      },
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-20">
          <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">Legal</p>
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-3">Terms of Service</h1>
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
              Please read these Terms of Service carefully before using the services
              offered by <span className="font-medium text-gray-900">Ritera Publishing</span>.
              These terms constitute a legally binding agreement between you and Ritera Publishing.
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
              <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-900 transition-colors">
                Privacy Policy →
              </Link>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
