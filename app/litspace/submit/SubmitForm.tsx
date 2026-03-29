"use client";

import { useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent";

function generateSlug(title: string): string {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Date.now().toString(36)
  );
}

type Category = { id: string; name: string };

export default function SubmitForm({ categories }: { categories: Category[] }) {
  const supabase = getSupabaseBrowserClient();
  const [form, setForm] = useState({
    title: "",
    category_id: "",
    writer_name: "",
    writer_email: "",
    content: "",
    excerpt: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const slug = generateSlug(form.title);
    const excerpt =
      form.excerpt.trim() ||
      form.content.trim().replace(/\s+/g, " ").slice(0, 200);

    const { error: err } = await supabase.from("litspace_posts").insert({
      title: form.title.trim(),
      slug,
      writer_name: form.writer_name.trim(),
      writer_email: form.writer_email.trim(),
      content: form.content.trim(),
      excerpt,
      category_id: form.category_id || null,
      approved: false,
      featured: false,
    });

    if (err) {
      setError("Something went wrong. Please try again.");
    } else {
      setSubmitted(true);
    }
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 px-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Submission Received!</h2>
        <p className="text-gray-600 leading-relaxed mb-8 max-w-md mx-auto">
          Thank you for sharing your work with us! Your submission is under review. We&apos;ll notify
          you via email once it&apos;s approved and published on LitSpace.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/litspace"
            className="bg-gray-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors"
          >
            Browse LitSpace
          </Link>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ title: "", category_id: "", writer_name: "", writer_email: "", content: "", excerpt: "" });
            }}
            className="border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Give your piece a title"
          className={inputClass}
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
        <select
          value={form.category_id}
          onChange={(e) => handleChange("category_id", e.target.value)}
          className={`${inputClass} bg-white`}
        >
          <option value="">Select a category…</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Writer Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.writer_name}
            onChange={(e) => handleChange("writer_name", e.target.value)}
            placeholder="Jane Smith"
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
            value={form.writer_email}
            onChange={(e) => handleChange("writer_email", e.target.value)}
            placeholder="jane@example.com"
            className={inputClass}
          />
          <p className="mt-1 text-xs text-gray-500">We&apos;ll notify you when your piece is published.</p>
        </div>
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Your Writing <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          value={form.content}
          onChange={(e) => handleChange("content", e.target.value)}
          rows={14}
          placeholder="Share your poem, story, or article here…"
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Short Summary{" "}
          <span className="text-gray-400 font-normal">(optional — auto-generated if left blank)</span>
        </label>
        <textarea
          value={form.excerpt}
          onChange={(e) => handleChange("excerpt", e.target.value)}
          rows={2}
          placeholder="A brief description of your piece (shown in cards and previews)"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gray-900 text-white font-semibold py-3.5 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting…" : "Submit for Review →"}
      </button>
    </form>
  );
}
