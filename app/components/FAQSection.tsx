"use client";

import { useState } from "react";
import Link from "next/link";
import type { ReactNode } from "react";

const FAQS: { question: string; answer: ReactNode }[] = [
  {
    question: "How can I publish my book in India as a first-time author?",
    answer: (
      <>
        Publishing your first book in India is a straightforward four-step process with Ritera. You submit your manuscript, our editorial team reviews it and responds within 12 days with a personalised publishing plan. Next, you choose a{" "}
        <Link href="/packages" className="text-amber-600 hover:text-amber-700 font-medium underline underline-offset-2">
          self-publishing package starting at ₹11,999
        </Link>{" "}
        — which includes professional editing, cover design, ISBN registration, and Amazon distribution. Our team handles formatting for both print and e-book, then distributes your title to Amazon, Flipkart, Apple Books, and 40,000+ stores worldwide. You retain full copyright and 100% of your royalties from the very first sale. No prior publishing experience is required — we guide you every step of the way.
      </>
    ),
  },
  {
    question: "What are the best self publishing services in India for new authors?",
    answer: (
      <>
        The best self-publishing services in India combine end-to-end support with transparent pricing and full author ownership. Look for a publisher that offers professional manuscript editing, custom cover design, ISBN registration included in the package price, global distribution to Amazon and 40,000+ stores, and 100% royalties — not a revenue split. Ritera Publishing provides all of these, plus dedicated publishing managers and multilingual distribution. For first-time authors specifically, you also want a company that offers a{" "}
        <Link href="/contact" className="text-amber-600 hover:text-amber-700 font-medium underline underline-offset-2">
          free publishing consultation
        </Link>{" "}
        before you commit, so you can ask questions and choose the right plan with confidence.
      </>
    ),
  },
  {
    question: "How much does it cost to publish a book in India?",
    answer: (
      <>
        Self-publishing costs in India vary by the services included. Ritera Publishing&apos;s packages start at ₹11,999 (approx. $149 USD) for the First-Time Author package, which covers professional editing, cover design, ISBN registration, and Amazon distribution as a one-time payment with no hidden fees. The Global Author package at ₹32,999 adds international distribution across 160+ countries, while the Marketing Focused package at ₹84,999 includes Amazon advertising, social media promotion, and a dedicated marketing team. Every package comes with a free consultation, and you keep 100% of your royalties — no revenue sharing or recurring subscription. Compare the full details on our{" "}
        <Link href="/packages" className="text-amber-600 hover:text-amber-700 font-medium underline underline-offset-2">
          publishing packages page
        </Link>.
      </>
    ),
  },
  {
    question: "Do I need ISBN registration to publish my book in India?",
    answer: (
      <>
        Yes, an ISBN (International Standard Book Number) is essential for publishing your book in India and selling it globally. Every{" "}
        <Link href="/packages" className="text-amber-600 hover:text-amber-700 font-medium underline underline-offset-2">
          Ritera Publishing package
        </Link>{" "}
        includes ISBN registration at no extra cost. The ISBN allows your book to be listed on Amazon, Flipkart, Apple Books, and major library catalogues worldwide. It also enables accurate sales tracking, royalty accounting, and searchability in global book databases. Without an ISBN, your book cannot be stocked in bookstores or distributed through most retail channels. Our team handles the entire ISBN registration process on your behalf, so you receive a registered ISBN before your book goes to print or digital distribution.
      </>
    ),
  },
  {
    question: "Can I publish my book in India and sell it worldwide?",
    answer: (
      <>
        Absolutely. Ritera Publishing distributes your book to 40,000+ retail stores and platforms across 160+ countries, including Amazon India, Amazon US, Amazon UK, Apple Books, Barnes &amp; Noble, Kobo, Flipkart, and Google Play Books. Both print-on-demand paperback and e-book formats are available, ensuring your title reaches readers on every continent. You retain full copyright over your work, and you earn 100% of your royalties on every sale — whether it happens in India or internationally. See{" "}
        <Link href="/books" className="text-amber-600 hover:text-amber-700 font-medium underline underline-offset-2">
          books we&apos;ve already published
        </Link>{" "}
        to discover the titles already reaching global readers through our platform.
      </>
    ),
  },
  {
    question: "Do I keep the rights to my book when I self-publish with Ritera?",
    answer: (
      <>
        Yes, you retain full copyright and all intellectual property rights to your book when you publish with Ritera. We are a service provider, not a publisher acquiring your rights. This means you can take your book to any other platform or publisher in the future, make revisions to future editions, sell translation rights, and license your work for film or other adaptations — without any approval from us. You also earn 100% of your royalties with no revenue-sharing agreement. Explore our{" "}
        <Link href="/packages" className="text-amber-600 hover:text-amber-700 font-medium underline underline-offset-2">
          self-publishing packages
        </Link>{" "}
        to see exactly what&apos;s included — your rights and earnings are never touched.
      </>
    ),
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Label */}
        <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-amber-500">
          FAQ
        </p>

        {/* Heading */}
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 leading-tight">
          Frequently Asked Questions
        </h2>

        {/* Accordion */}
        <div className="divide-y divide-gray-100">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="text-base lg:text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {faq.question}
                  </span>
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                {/* Animated answer */}
                <div
                  id={`faq-panel-${i}`}
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? "600px" : "0px", opacity: isOpen ? 1 : 0 }}
                >
                  <p className="pb-5 text-gray-500 text-sm lg:text-base leading-relaxed pr-10">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
