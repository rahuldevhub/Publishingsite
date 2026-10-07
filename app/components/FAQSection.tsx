"use client";


import { HOME_FAQS } from "@/lib/home-faqs";
import { localizePricingText } from "@/lib/pricing";
import { useCurrency } from "@/hooks/useCurrency";
import { useState } from "react";
import Link from "next/link";

export default function FAQSection() {
  const { currency } = useCurrency();
  const FAQS = HOME_FAQS.map((item) => ({
    question: item.question,
    answer: <>{localizePricingText(item.answer, currency)}{" "}<Link href={item.href} className="text-amber-600 hover:text-amber-700 font-medium underline underline-offset-2">{item.anchor}</Link>.</>,
  }));
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
