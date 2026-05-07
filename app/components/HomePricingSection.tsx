"use client"

import Link from "next/link"
import FadeIn from "@/app/components/FadeIn"
import { useCurrency } from "@/hooks/useCurrency"

const PRICES = {
  essential: { inr: "₹11,999", usd: "$149" },
  standard:  { inr: "₹18,999", usd: "$229" },
  advanced:  { inr: "₹32,999", usd: "$399" },
  elite:     { inr: "₹54,999", usd: "$659" },
  premium:   { inr: "₹84,999", usd: "$1,019" },
  exclusive: { inr: "₹1,19,999", usd: "$1,449" },
}

const PACKAGES = [
  {
    name: "Essential",
    priceKey: "essential" as const,
    highlight: false,
    badge: undefined as string | undefined,
    features: [
      "ISBN & Copyright Registration",
      "Amazon & Flipkart Distribution",
      "Basic Cover Design",
      "100% Royalties",
    ],
  },
  {
    name: "Advanced",
    priceKey: "advanced" as const,
    highlight: true,
    badge: "Most Popular",
    features: [
      "Everything in Essential",
      "Professional Editing & Proofreading",
      "Premium Custom Cover Design",
      "Social Media Promotion",
    ],
  },
  {
    name: "Premium",
    priceKey: "premium" as const,
    highlight: false,
    badge: undefined as string | undefined,
    features: [
      "Everything in Advanced",
      "International Distribution (160+ countries)",
      "Amazon Ads Management",
      "Dedicated Account Manager",
    ],
  },
]

export default function HomePricingSection() {
  const { currency } = useCurrency()

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
      <FadeIn>
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-3">
            Pricing
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Publishing Package{" "}
            <span className="inline-block text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full align-middle ml-2">
              {currency === "INR" ? "🇮🇳 INR" : "🌍 USD"}
            </span>
          </h2>
          <p className="text-gray-500 text-base lg:text-lg max-w-xl mx-auto">
            Simple, transparent self publishing packages designed for every author. Choose the right plan and publish your book in India and worldwide.
          </p>
        </div>
      </FadeIn>

      <div className="grid sm:grid-cols-3 gap-5 items-start">
        {PACKAGES.map((pkg, i) => (
          <FadeIn key={pkg.name} delay={i * 80}>
            <div
              className={`rounded-2xl border overflow-hidden ${
                pkg.highlight
                  ? "bg-gray-900 border-gray-900 shadow-2xl shadow-gray-900/20 sm:-mt-4 sm:mb-4"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              {pkg.highlight && (
                <div className="bg-amber-400 text-gray-900 text-center text-xs font-bold py-2 tracking-wide uppercase">
                  {pkg.badge}
                </div>
              )}
              <div className="p-7">
                <p className={`text-xs font-semibold tracking-widest uppercase mb-2 ${pkg.highlight ? "text-gray-400" : "text-gray-500"}`}>
                  {pkg.name}
                </p>
                <p className={`text-4xl font-black mb-1 ${pkg.highlight ? "text-white" : "text-gray-900"}`}>
                  {currency === "INR" ? PRICES[pkg.priceKey].inr : PRICES[pkg.priceKey].usd}
                </p>
                <p className={`text-xs mb-6 ${pkg.highlight ? "text-gray-500" : "text-gray-400"}`}>
                  one-time | No hidden fees
                </p>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <svg
                        className={`w-4 h-4 mt-0.5 shrink-0 ${pkg.highlight ? "text-amber-400" : "text-gray-400"}`}
                        viewBox="0 0 20 20" fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      <span className={`text-sm leading-snug ${pkg.highlight ? "text-gray-300" : "text-gray-600"}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/packages"
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                    pkg.highlight
                      ? "bg-amber-400 text-gray-900 hover:bg-amber-300"
                      : "border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900"
                  }`}
                >
                  View Details →
                </Link>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
