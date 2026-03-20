"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "How can I publish my book in India as a first-time author?",
    answer:
      "Prepare your manuscript, choose self publishing services in India, and complete editing, cover design, ISBN registration, and distribution.",
  },
  {
    question: "What are the best self publishing services in India for new authors?",
    answer:
      "The best self publishing services in India offer editing, design, ISBN registration, e-book publishing, and global distribution with transparent pricing.",
  },
  {
    question: "How much does it cost to publish a book in India?",
    answer:
      "The cost depends on services like editing, design, and distribution. Most self publishing packages in India are flexible and affordable.",
  },
  {
    question: "Do I need ISBN registration to publish my book in India?",
    answer:
      "Yes, ISBN registration in India is required for distribution, sales tracking, and listing your book globally.",
  },
  {
    question: "Can I publish my book in India and sell it worldwide?",
    answer:
      "Yes, with self publishing platforms, you can publish your book in India and distribute it globally through e-book and print channels.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Label */}
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#f5a623" }}>
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
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? "200px" : "0px", opacity: isOpen ? 1 : 0 }}
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
