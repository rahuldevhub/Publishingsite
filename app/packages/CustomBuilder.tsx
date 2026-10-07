"use client";

import { useRef, useState } from "react";

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-gray-300 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent";

const SERVICE_GROUPS = [
  {
    category: "Publishing Essentials",
    services: [
      "Publishing Manager",
      "ISBN & Copyright Registration",
      "Distribution (Amazon, Flipkart)",
      "International Distribution",
      "E-Book Publishing",
      "Certificate of Publication",
      "Author Copies",
    ],
  },
  {
    category: "Design & Formatting",
    services: [
      "Cover Design (Basic)",
      "Cover Design (Premium / Custom)",
      "Interior Formatting",
      
      "Hardcover Edition",
    ],
  },
  {
    category: "Editing Services",
    services: [
      "Proofreading",
      "Copy Editing",
      "Developmental Editing",
      "Beta Reading",
      "Rewriting",
    ],
  },
  {
    category: "Marketing & Promotion",
    services: [
      "Author Profile Page",
      "Book Reviews",
      "Author Website",
      "Social Media Promotion",
      "Kindle Promotions",
      "Author Branding Kit",
      "Amazon A+ Listing",
      "Amazon Prime Placement",
      "Amazon Sponsored Ads",
      "Press Release",
      "Book Launch Event",
      "Video Book Trailer",
    ],
  },
  {
    category: "Additional Services",
    services: [
      "Audio Book Production",
      "Dedicated Account Manager",
      "Priority Support",
      "WhatsApp Support",
      "Author Profile Page",
    ],
  },
];

const MOBILE_SERVICE_HELP: Record<string, string> = {
  "ISBN & Copyright Registration": "Help with book identifiers and copyright registration services.",
  "Developmental Editing": "Review your book’s structure, content and overall flow.",
  "Copy Editing": "Improve clarity, grammar and consistency sentence by sentence.",
  "Proofreading": "Check the final manuscript for spelling and punctuation errors.",
  "Beta Reading": "Get reader feedback before your book is published.",
  "Amazon A+ Listing": "Create enhanced content for an eligible Amazon book listing.",
  "Kindle Promotions": "Discuss promotion options for your Kindle edition.",
  "International Distribution": "Explore retailer and territory options for your chosen format.",
};

export default function CustomBuilder() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [mobileStep, setMobileStep] = useState<1 | 2>(1);
  const [openCategory, setOpenCategory] = useState<string | null>(SERVICE_GROUPS[0].category);
  const [needsGuidance, setNeedsGuidance] = useState(false);
  const builderRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  function goToStep(step: 1 | 2) {
    setMobileStep(step);
    setError("");
    requestAnimationFrame(() => {
      stepHeadingRef.current?.focus({ preventScroll: true });
      builderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function toggle(service: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(service)) next.delete(service);
      else {
        if (window.matchMedia("(max-width: 639px)").matches && service.startsWith("Cover Design")) {
          next.delete("Cover Design (Basic)");
          next.delete("Cover Design (Premium / Custom)");
        }
        next.add(service);
      }
      return next;
    });
  }

  function toggleAll(services: string[], checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      services.forEach((s) => (checked ? next.add(s) : next.delete(s)));
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const requestGuidance = window.matchMedia("(max-width: 639px)").matches && needsGuidance;
    if (selected.size === 0 && !requestGuidance) {
      setError("Please select at least one service.");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/package-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim() || null,
          selected_services: [...selected, ...(requestGuidance ? ["Help me choose publishing services"] : [])],
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      setSubmitted(true);
    } catch (err) {
      console.error("[CustomBuilder] Submit error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 px-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Quote Request Received!</h3>
        <p className="text-gray-600 leading-relaxed">
          Thank you, <strong>{form.name}</strong>! Our team will review your selected services and get back to you at{" "}
          <strong>{form.email}</strong> within 24 hours with a personalised quote.
        </p>
      </div>
    );
  }

  return (
    <div ref={builderRef} className="relative scroll-mt-24 lg:grid lg:grid-cols-2 lg:gap-10">
      <div className="mb-5 sm:hidden">
        <p className="text-xs font-semibold text-gray-500">Step {mobileStep} of 2</p>
        <h3 ref={stepHeadingRef} tabIndex={-1} className="mt-2 text-xl font-bold text-gray-900 outline-none">
          {mobileStep === 1 ? "Choose your publishing support" : "Review and request your quote"}
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          {mobileStep === 1 ? "Open a category to choose services, or ask us to help you decide." : "Check your choices and tell us how to contact you. Our team will prepare a quote."}
        </p>
      </div>
      {/* Services checklist */}
      <div className={mobileStep === 1 ? "block" : "hidden sm:block"}>
        <p className="hidden sm:block text-sm font-semibold text-gray-700 mb-4">
          Select the services you need{" "}
          <span className="font-normal text-gray-500">({selected.size} selected)</span>
        </p>
        <div className="space-y-3 sm:space-y-6">
          {SERVICE_GROUPS.map((group, groupIndex) => {
            const allChecked = group.services.every((s) => selected.has(s));
            return (
              <div key={group.category} className="rounded-xl border border-gray-200 sm:rounded-none sm:border-0">
                <button type="button" aria-expanded={openCategory === group.category} aria-controls={`mobile-services-${groupIndex}`}
                  onClick={() => setOpenCategory(openCategory === group.category ? null : group.category)}
                  className="flex min-h-14 w-full items-center justify-between gap-3 p-4 text-left text-sm font-semibold text-gray-900 sm:hidden">
                  <span>{group.category}</span>
                  <span className="shrink-0 text-xs text-gray-500">{group.services.filter((service) => selected.has(service) && !(group.category === "Additional Services" && service === "Author Profile Page")).length} selected {openCategory === group.category ? "−" : "+"}</span>
                </button>
                <div id={`mobile-services-${groupIndex}`} className={openCategory === group.category ? "px-3 pb-3 sm:p-0" : "hidden sm:block sm:p-0"}>
                {group.category === "Design & Formatting" && <p className="mb-3 text-xs text-gray-500 sm:hidden">Choose one cover design option if you need a cover.</p>}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="hidden sm:block text-xs font-bold text-gray-500 uppercase tracking-widest">
                    {group.category}
                  </h3>
                  <button
                    type="button"
                    onClick={() => toggleAll(group.services, !allChecked)}
                    className="hidden sm:block text-xs text-gray-400 hover:text-gray-700 transition-colors ml-1"
                  >
                    {allChecked ? "Deselect all" : "Select all"}
                  </button>
                </div>
                <div className="space-y-2">
                  {group.services.map((service) => (
                    <label
                      key={service}
                      className={`${group.category === "Additional Services" && service === "Author Profile Page" ? "hidden sm:flex" : "flex"} relative items-center gap-3 px-4 py-2.5 rounded-lg border cursor-pointer transition-all focus-within:ring-2 focus-within:ring-amber-500 ${
                        selected.has(service)
                          ? "bg-gray-900 border-gray-900 text-white"
                          : "bg-white border-gray-200 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected.has(service)}
                        onChange={() => toggle(service)}
                        className="sr-only"
                      />
                      <span
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                          selected.has(service) ? "bg-white border-white" : "border-gray-300"
                        }`}
                      >
                        {selected.has(service) && (
                          <svg className="w-2.5 h-2.5 text-gray-900" viewBox="0 0 12 12" fill="currentColor">
                            <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span className="text-sm font-medium">{service}
                        {MOBILE_SERVICE_HELP[service] && <span className={`mt-1 block text-xs font-normal sm:hidden ${selected.has(service) ? "text-gray-200" : "text-gray-500"}`}>{MOBILE_SERVICE_HELP[service]}</span>}
                      </span>
                    </label>
                  ))}
                </div>
                </div>
              </div>
            );
          })}
        </div>
        <label className="mt-4 flex items-center gap-3 rounded-xl border border-gray-200 p-4 text-sm text-gray-700 sm:hidden">
          <input type="checkbox" checked={needsGuidance} onChange={(e) => setNeedsGuidance(e.target.checked)} className="h-4 w-4 shrink-0 accent-gray-900" />
          I’m not sure — help me choose
        </label>
        <div className="sticky bottom-4 z-20 mt-5 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-lg sm:hidden">
          <span className="text-sm text-gray-700" aria-live="polite">{selected.size > 0 ? `${selected.size} selected` : needsGuidance ? "Help me choose" : "Choose your support"}</span>
          <button type="button" disabled={selected.size === 0 && !needsGuidance} onClick={() => goToStep(2)} className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white disabled:opacity-40">Continue →</button>
        </div>
      </div>

      {/* Contact form */}
      <div className={mobileStep === 2 ? "mt-4 sm:mt-8 lg:mt-0" : "hidden sm:block sm:mt-8 lg:mt-0"}>
        <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4 sm:hidden">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold text-gray-900">Your choices</h4>
            <button type="button" onClick={() => goToStep(1)} className="min-h-11 px-2 text-sm font-semibold underline text-gray-700">Edit choices</button>
          </div>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            {[...selected].map((service) => <li key={service}>{service}</li>)}
            {needsGuidance && <li>Help me choose publishing services</li>}
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="sticky top-8 space-y-4">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Your Contact Details</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="custom-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  id="custom-name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="custom-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  id="custom-email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="custom-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  id="custom-phone"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="custom-message" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Additional Notes{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  id="custom-message"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us about your book, timeline, or any specific requirements…"
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            {/* Selected services preview */}
            {selected.size > 0 && (
              <div className="hidden sm:block mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Selected Services ({selected.size})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from(selected).map((s) => (
                    <span key={s} className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="mt-5 w-full bg-gray-900 text-white font-semibold py-3.5 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending…" : "Get Custom Quote →"}
            </button>
            <p className="text-xs text-gray-500 text-center mt-3">
              We&apos;ll respond within 24 hours with a personalised quote.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
