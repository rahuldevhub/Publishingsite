"use client"

import { Fragment } from "react"
import Link from "next/link"
import { useCurrency } from "@/hooks/useCurrency"

import { PRICES } from "@/lib/pricing"

const PACKAGES = [
  { id: "essential",  name: "Essential",  priceKey: "essential"  as const, popular: false, badge: "" },
  { id: "standard",  name: "Standard",   priceKey: "standard"   as const, popular: false, badge: "" },
  { id: "advanced",  name: "Advanced",   priceKey: "advanced"   as const, popular: true,  badge: "Most Popular" },
  { id: "elite",     name: "Elite",      priceKey: "elite"      as const, popular: false, badge: "" },
  { id: "premium",   name: "Premium",    priceKey: "premium"    as const, popular: false, badge: "" },
  { id: "exclusive", name: "Exclusive",  priceKey: "exclusive"  as const, popular: false, badge: "Best Value" },
]

type Val = true | false | "add-on" | string;

const FEATURES: { category: string; label: string; highlight?: boolean; values: Val[] }[] = [
  // Publishing Essentials
  { category: "Publishing Essentials", label: "Dedicated Publishing Manager",      values: [true, true, true, true, true, true] },
  { category: "Publishing Essentials", label: "ISBN Registration",                  values: [true, true, true, true, true, true] },
  { category: "Publishing Essentials", label: "Copyright Registration",             values: [true, true, true, true, true, true] },
  { category: "Publishing Essentials", label: " Royalty",           values: ["100%", "100%", "100%", "100%", "100%", "100%"] },
  { category: "Publishing Essentials", label: " Author Dashboard",          values: [true, true, true, true, true, true] },
  { category: "Publishing Essentials", label: "Indian Distribution",                values: [true, true, true, true, true, true] },
  { category: "Publishing Essentials", label: "International Distribution",         values: [false, false, true, true, true, true] },
  { category: "Publishing Essentials", label: "E-Book Publishing",                  values: [false, true, true, true, true, true] },
  { category: "Publishing Essentials", label: "Certificate of Publication",         values: [true, true, true, true, true, true] },
  { category: "Publishing Essentials", label: "Digital Proof",         values: [true, true, true, true, true, true] },
  { category: "Publishing Essentials", label: "Author Copies",                      values: ["5", "5", "10", "15", "25", "50"] },
  { category: "Publishing Essentials", label: "Profit Payout",                      values: ["On demand", "On demand", "On demand", "On demand", "On demand", "On demand"] },
  { category: "Publishing Essentials", label: "Post Publishing Support",            values: [true, true, true, true, true, true] },
  // Design & Formatting
  { category: "Design & Formatting", label: "Cover Design",                         values: ["Basic", "Standard", "Premium", "Premium", "Premium", "Premium"] },
  { category: "Design & Formatting", label: "Interior Formatting",                  values: ["Basic", "Standard", "Premium", "Premium", "Premium", "Premium"] },
  { category: "Design & Formatting", label: "Design Samples",                      values: ["1", "1", "2", "3", "3", "3"] },
  { category: "Design & Formatting", label: "Design Revisions",                            values: ["1", "2", "3", "5", "Unlimited", "Unlimited"] },
  { category: "Design & Formatting", label: "Hardcover Edition",                    values: [false, false, false, false, true, true] },
  { category: "Design & Formatting", label: "Post Publishing Revision",          values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },

  // Editing Services
  { category: "Editing Services",    label: "Beta Reading",                          values: [false, false, true, true, true, true] },
  { category: "Editing Services",    label: "Proofreading",                         values: [false, false, false, false, true, true] },
  { category: "Editing Services",    label: "Copy Editing",                          values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },
  { category: "Editing Services",    label: "Developmental Editing",                values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },
  { category: "Editing Services",    label: "Rewriting",                          values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },
  { category: "Editing Services",    label: "Revision Rounds",                       values: ["1", "2", "3", "5", "Unlimited", "Unlimited"] },




  // Marketing & Promotion
  { category: "Marketing & Promotion", label: "Author Profile Page",                values: [true, true, true, true, true, true] },
  { category: "Marketing & Promotion", label: "Author Website",                     values: [false, true, false, false, true, false] },
  { category: "Marketing & Promotion", label: "Book Reviews",                       values: [false, false, true, true, true, true] },
  { category: "Marketing & Promotion", label: "Social Media Promotion",             values: [false, false, true, true, true ,true] },
  { category: "Marketing & Promotion", label: "Kindle Promotions",                  values: [false, false, true, true, true, true] },

  { category: "Marketing & Promotion", label: "Author Branding Kit",                values: [false, false, "Basic", "Standard", "Premium" ,"Exclusive"] },
  { category: "Marketing & Promotion", label: "Author Awards",                      values: [false, false, false, true, true, true] },
  { category: "Marketing & Promotion", label: "Book Trailer",                       values: [false, false, true, true, true, true] },
  { category: "Marketing & Promotion", label: "Amazon Prime Placement",             values: [false, false, true, true, true, true] },
  { category: "Marketing & Promotion", label: "Amazon Sponsored Ads Setup ",        values: [false, false, true, true, true, true] },
  { category: "Marketing & Promotion", label: "Amazon Sponsored Ads",              values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },
  { category: "Marketing & Promotion", label: "Amazon A+ Listing",              values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },
  { category: "Marketing & Promotion", label: "Book Launch Event",                  values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },
  { category: "Marketing & Promotion", label: "Press Release",                      values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },

  // Additional Services
  { category: "Additional Services", label: "Audio Book Production", highlight: true, values: [false, false, "add-on", "add-on", "add-on", true] },
  { category: "Additional Services", label: "Additional Copies",          values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },
  { category: "Additional Services", label: "Bulk Printing",  values: ["add-on", "add-on", "add-on", "add-on", "add-on", "add-on"] },
  { category: "Additional Services", label: "Priority Support",                     values: [false, false, false, true, true, true] },
  { category: "Additional Services", label: "Dedicated Account Manager",            values: [false, false, false, false, true, true] },
]

function renderVal(val: Val, popular: boolean) {
  if (val === true)
    return (
      <>
        <svg
          className={`w-5 h-5 mx-auto ${popular ? "text-amber-600" : "text-green-500"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
        </svg>
        <span className="sr-only">Included</span>
      </>
    )
  if (val === false)
    return (
      <>
        <span className="text-gray-300 text-base select-none" aria-hidden="true">—</span>
        <span className="sr-only">Not Included</span>
      </>
    )
  if (val === "add-on")
    return (
      <span
        className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
        aria-label="Available as Add-on"
      >
        <span aria-hidden="true">Add-on</span>
      </span>
    )
  return <span className="text-sm font-semibold text-gray-800">{val}</span>
}

function groupFeatures(features: typeof FEATURES) {
  const map = new Map<string, typeof FEATURES>()
  for (const f of features) {
    if (!map.has(f.category)) map.set(f.category, [])
    map.get(f.category)!.push(f)
  }
  return map
}

export default function PackagesComparisonTable() {
  const { currency } = useCurrency()
  const grouped = groupFeatures(FEATURES)

  return (
    <section id="packages" className="scroll-mt-8">
      <div className="max-w-[1400px] mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Compare All Packages{" "}
            <span className="inline-block text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full align-middle ml-2">
              {currency === "INR" ? "🇮🇳 INR" : "🌍 USD"}
            </span>
          </h2>
          <p className="mt-2 text-gray-500 text-sm">Scroll right on mobile to see all packages</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm" style={{ minWidth: "900px" }}>
            <thead>
              <tr>
                {/* Corner cell */}
                <th scope="col" className="sticky left-0 top-0 z-30 bg-gray-50 border-b border-r border-gray-200 px-5 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wide w-[200px] min-w-[200px]">
                  Features
                </th>
                {PACKAGES.map((pkg, i) => (
                  <th
                    key={pkg.id}
                    scope="col"
                    className={`sticky top-0 z-20 border-b border-gray-200 px-4 py-5 text-center min-w-[140px] ${
                      pkg.popular
                        ? "bg-amber-50 border-b-2 border-b-amber-400"
                        : "bg-gray-50"
                    } ${i < PACKAGES.length - 1 ? "border-r border-gray-200" : ""}`}
                  >
                    {pkg.popular && (
                      <span
                        className="block bg-amber-500 text-white text-xs font-bold px-3 py-0.5 rounded-full mb-2 mx-auto w-fit"
                        aria-label="Most Popular package"
                      >
                        <span aria-hidden="true">★ Most Popular</span>
                      </span>
                    )}
                    {pkg.badge && !pkg.popular && (
                      <span
                        className="block bg-gray-800 text-white text-xs font-bold px-3 py-0.5 rounded-full mb-2 mx-auto w-fit"
                        aria-label={`${pkg.badge} package`}
                      >
                        {pkg.badge}
                      </span>
                    )}
                    <div className={`font-bold text-base ${pkg.popular ? "text-amber-700" : "text-gray-900"}`}>
                      {pkg.name}
                    </div>
                    <div className={`text-xl font-black mt-1 ${pkg.popular ? "text-amber-600" : "text-gray-900"}`}>
                      {currency === "INR" ? PRICES[pkg.priceKey].inr : PRICES[pkg.priceKey].usd}
                    </div>
                    <Link
                      href="/contact"
                      aria-label={`Get Started with ${pkg.name} Package`}
                      className={`mt-3 inline-block text-xs font-semibold px-4 py-1.5 rounded-full transition-colors ${
                        pkg.popular
                          ? "bg-amber-500 text-white hover:bg-amber-600"
                          : "bg-gray-900 text-white hover:bg-gray-700"
                      }`}
                    >
                      Get Started
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {Array.from(grouped.entries()).map(([category, rows]) => (
                <Fragment key={category}>
                  {/* Category separator */}
                  <tr>
                    <th
                      scope="colgroup"
                      colSpan={7}
                      className="sticky left-0 bg-gray-100 border-y border-gray-200 px-5 py-2.5 text-left text-xs font-bold text-gray-500 uppercase tracking-widest"
                    >
                      {category}
                    </th>
                  </tr>

                  {/* Feature rows */}
                  {rows.map((feature, rowIdx) => (
                    <tr
                      key={feature.label}
                      className={`${
                        feature.highlight
                          ? "bg-amber-50/60"
                          : rowIdx % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50/50"
                      } hover:bg-blue-50/30 transition-colors`}
                    >
                      {/* Feature name — sticky left */}
                      <th
                        scope="row"
                        className={`sticky left-0 z-10 border-r border-gray-100 px-5 py-3.5 text-left font-medium text-gray-700 ${
                          feature.highlight
                            ? "bg-amber-50"
                            : rowIdx % 2 === 0
                            ? "bg-white"
                            : "bg-gray-50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {feature.label}
                          {feature.highlight && (
                            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
                              🎧 Highlight
                            </span>
                          )}
                        </span>
                      </th>

                      {/* Package values */}
                      {feature.values.map((val, i) => (
                        <td
                          key={i}
                          className={`border-r border-gray-100 last:border-r-0 px-4 py-3.5 text-center ${
                            PACKAGES[i].popular
                              ? "bg-amber-50/70"
                              : ""
                          }`}
                        >
                          {renderVal(val, PACKAGES[i].popular)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}

              {/* Bottom CTA row */}
              <tr className="bg-gray-50 border-t-2 border-gray-200">
                <th scope="row" className="sticky left-0 bg-gray-50 px-5 py-5 text-left text-sm font-bold text-gray-900">
                  Total Investment
                </th>
                {PACKAGES.map((pkg, i) => (
                  <td
                    key={pkg.id}
                    className={`px-4 py-5 text-center border-r border-gray-100 last:border-r-0 ${
                      pkg.popular ? "bg-amber-50" : ""
                    }`}
                  >
                    <div className={`text-lg font-black mb-3 ${pkg.popular ? "text-amber-600" : "text-gray-900"}`}>
                      {currency === "INR" ? PRICES[pkg.priceKey].inr : PRICES[pkg.priceKey].usd}
                    </div>
                    <Link
                      href="/contact"
                      className={`inline-block text-xs font-bold px-5 py-2 rounded-xl transition-colors ${
                        pkg.popular
                          ? "bg-amber-500 text-white hover:bg-amber-600"
                          : i >= 3
                          ? "bg-gray-900 text-white hover:bg-gray-700"
                          : "border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                      }`}
                    >
                      Choose {pkg.name}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          All prices are one-time fees. GST as applicable. Need a custom plan?{" "}
          <a href="#custom-builder" className="underline underline-offset-2 hover:text-gray-700">
            Build your own package →
          </a>
        </p>
      </div>
    </section>
  )
}
