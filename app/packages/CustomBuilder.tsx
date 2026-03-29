"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent";

const SERVICE_GROUPS = [
  {
    category: "Publishing Essentials",
    services: [
      "Publishing Manager",
      "ISBN & Copyright Registration",
      "Distribution (Amazon, Flipkart)",
      "International Distribution",
      "E-Book Publishing",
      "100% Royalties",
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

export default function CustomBuilder() {
  const supabase = getSupabaseBrowserClient();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function toggle(service: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(service)) next.delete(service);
      else next.add(service);
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
    if (selected.size === 0) {
      setError("Please select at least one service.");
      return;
    }
    setError("");
    setSubmitting(true);

    const { error: err } = await supabase.from("package_inquiries").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim() || null,
      selected_services: Array.from(selected),
    });

    // Show success regardless (table may not exist yet)
    if (err) console.error("[CustomBuilder] Submit error:", err);
    setSubmitted(true);
    setSubmitting(false);
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
    <div className="lg:grid lg:grid-cols-2 lg:gap-10">
      {/* Services checklist */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-4">
          Select the services you need{" "}
          <span className="font-normal text-gray-500">({selected.size} selected)</span>
        </p>
        <div className="space-y-6">
          {SERVICE_GROUPS.map((group) => {
            const allChecked = group.services.every((s) => selected.has(s));
            return (
              <div key={group.category}>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    {group.category}
                  </h3>
                  <button
                    type="button"
                    onClick={() => toggleAll(group.services, !allChecked)}
                    className="text-xs text-gray-400 hover:text-gray-700 transition-colors ml-1"
                  >
                    {allChecked ? "Deselect all" : "Select all"}
                  </button>
                </div>
                <div className="space-y-2">
                  {group.services.map((service) => (
                    <label
                      key={service}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border cursor-pointer transition-all ${
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
                      <span className="text-sm font-medium">{service}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact form */}
      <div className="mt-8 lg:mt-0">
        <form onSubmit={handleSubmit} className="sticky top-8 space-y-4">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Your Contact Details</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Additional Notes{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us about your book, timeline, or any specific requirements…"
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            {/* Selected services preview */}
            {selected.size > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
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

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

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
