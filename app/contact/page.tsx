import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";

const CONTACT_INFO = {
  email: "contact@riterapublishing.com",
  phone: "+91-94888-54787",
  whatsapp: "919488854787",
  instagram: "https://www.instagram.com/ritera_publishing",
} as const;

export const metadata: Metadata = {
  title: "Contact Us | Ritera Publishing",
  description:
    "Get in touch with Ritera Publishing. We're here to answer your questions about self-publishing, packages, royalties, and more.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact Ritera Publishing",
    description: "Reach our team via email, phone, or WhatsApp. We respond within 24 hours.",
    url: `${SITE_URL}/contact`,
  },
};

const CONTACT_CHANNELS = [
  {
    label: "Email",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
    note: "We reply within 24 hours",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone.replace(/-/g, "")}`,
    note: "Mon – Sat, 10 am – 7 pm IST",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    value: CONTACT_INFO.phone,
    href: `https://wa.me/${CONTACT_INFO.whatsapp}`,
    note: "Chat with us instantly",
    external: true,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.886l6.217-1.45A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.773 9.773 0 01-5.136-1.453l-.368-.218-3.818.89.924-3.709-.24-.381A9.775 9.775 0 012.182 12C2.182 6.545 6.545 2.182 12 2.182c5.455 0 9.818 4.363 9.818 9.818 0 5.455-4.363 9.818-9.818 9.818z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 lg:py-28">
          <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
            Contact
          </p>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-5">
            Get in Touch
          </h1>
          <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
            Have a question about publishing, packages, or royalties? We&apos;re here
            and happy to help — reach us through any channel below.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Contact channels */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Reach Us Directly</h2>
            <div className="space-y-4">
              {CONTACT_CHANNELS.map((ch) => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target={ch.external ? "_blank" : undefined}
                  rel={ch.external ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 p-5 bg-gray-50 border border-gray-200 rounded-2xl hover:border-gray-900 hover:bg-white hover:shadow-sm transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 group-hover:bg-gray-900 group-hover:border-gray-900 group-hover:text-white flex items-center justify-center text-gray-500 shrink-0 transition-all shadow-sm">
                    {ch.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-0.5">
                      {ch.label}
                    </p>
                    <p className="font-semibold text-gray-900 text-sm">{ch.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{ch.note}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 p-5 bg-amber-50 border border-amber-100 rounded-2xl">
              <p className="text-sm font-semibold text-amber-800 mb-1">Response Time</p>
              <p className="text-sm text-amber-700 leading-relaxed">
                We typically respond to all enquiries within <strong>24 hours</strong> on
                business days. For urgent publishing queries, WhatsApp is the fastest option.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h2>
            <ContactForm />
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-16 pt-10 border-t border-gray-100">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-5 text-center">
            You might also be looking for
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { label: "Publishing Packages", href: "/packages" },
              { label: "About Ritera",         href: "/aboutus" },
              { label: "Browse Books",          href: "/books" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
              >
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

// ── Inline client form component ──────────────────────────────────────────────
import ContactForm from "./ContactForm";
