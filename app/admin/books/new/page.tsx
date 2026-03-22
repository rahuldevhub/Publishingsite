"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import ImageUpload from "@/app/admin/components/ImageUpload";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent";

function generateSlug(title: string) {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const emptyForm = {
  title: "",
  subtitle: "",
  slug: "",
  short_description: "",
  description: "",
  cover_image: "",
  isbn: "",
  language: "English",
  page_count: "",
  genre: "",
  format: "Paperback",
  amazon_link: "",
  flipkart_link: "",
  publisher_link: "",
  purchase_link_international: "",
  purchase_link_pothi: "",
  purchase_link_library: "",
  published_date: "",
  author_id: "",
  featured: false,
};

type Author = { id: string; name: string };

export default function NewBookPage() {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    supabase.from("authors").select("id, name").order("name").then(({ data }) => {
      if (data) setAuthors(data);
    });
  }, []);

  function handleTitleChange(value: string) {
    setForm((f) => ({ ...f, title: value, slug: generateSlug(value) }));
  }

  function handleChange(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: insertError } = await supabase.from("books").insert({
      title: form.title,
      subtitle: form.subtitle || null,
      slug: form.slug,
      short_description: form.short_description || null,
      description: form.description || null,
      cover_image: form.cover_image || null,
      gallery_images: [],
      isbn: form.isbn || null,
      language: form.language,
      page_count: form.page_count ? Number(form.page_count) : null,
      genre: form.genre,
      format: form.format,
      amazon_link: form.amazon_link || null,
      flipkart_link: form.flipkart_link || null,
      publisher_link: form.publisher_link || null,
      purchase_link_international: form.purchase_link_international || null,
      purchase_link_pothi: form.purchase_link_pothi || null,
      purchase_link_library: form.purchase_link_library || null,
      published_date: form.published_date || null,
      author_id: form.author_id,
      featured: form.featured,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/admin/books"), 1200);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/admin/books" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ← Books
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-lg font-semibold text-gray-900">New Book</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-200 px-8 py-8">
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
              Book created successfully! Redirecting…
            </div>
          )}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title + Slug */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className={inputClass}
                  placeholder="The Great Novel"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => handleChange("slug", e.target.value)}
                  className={inputClass}
                  placeholder="the-great-novel"
                />
              </div>
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Subtitle</label>
              <input
                type="text"
                value={form.subtitle}
                onChange={(e) => handleChange("subtitle", e.target.value)}
                className={inputClass}
                placeholder="An optional subtitle"
              />
            </div>

            {/* Author + Published Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Author <span className="text-red-500">*</span></label>
                <select
                  required
                  value={form.author_id}
                  onChange={(e) => handleChange("author_id", e.target.value)}
                  className={`${inputClass} bg-white`}
                >
                  <option value="">Select an author…</option>
                  {authors.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Published Date</label>
                <input
                  type="date"
                  value={form.published_date}
                  onChange={(e) => handleChange("published_date", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Cover Image */}
            <ImageUpload
              label="Cover Image"
              value={form.cover_image}
              onChange={(url) => handleChange("cover_image", url)}
              folder="books"
            />

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Short Description</label>
              <textarea
                rows={2}
                value={form.short_description}
                onChange={(e) => handleChange("short_description", e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder="A brief one-line description…"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Description</label>
              <textarea
                rows={6}
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className={`${inputClass} resize-y`}
                placeholder="Full book description…"
              />
            </div>

            {/* Genre + Format */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Genre <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={form.genre}
                  onChange={(e) => handleChange("genre", e.target.value)}
                  className={inputClass}
                  placeholder="Fiction, Non-fiction, Poetry…"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Format <span className="text-red-500">*</span></label>
                <select
                  required
                  value={form.format}
                  onChange={(e) => handleChange("format", e.target.value)}
                  className={`${inputClass} bg-white`}
                >
                  <option>Paperback</option>
                  <option>Hardcover</option>
                  <option>eBook</option>
                  <option>Audiobook</option>
                </select>
              </div>
            </div>

            {/* Language + Page Count */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Language <span className="text-red-500">*</span></label>
                <select
                  required
                  value={form.language}
                  onChange={(e) => handleChange("language", e.target.value)}
                  className={`${inputClass} bg-white`}
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Tamil</option>
                  <option>Telugu</option>
                  <option>Bengali</option>
                  <option>Marathi</option>
                  <option>Gujarati</option>
                  <option>Kannada</option>
                  <option>Malayalam</option>
                  <option>Punjabi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Page Count</label>
                <input
                  type="number"
                  value={form.page_count}
                  onChange={(e) => handleChange("page_count", e.target.value)}
                  className={inputClass}
                  placeholder="256"
                />
              </div>
            </div>

            {/* ISBN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">ISBN</label>
              <input
                type="text"
                value={form.isbn}
                onChange={(e) => handleChange("isbn", e.target.value)}
                className={inputClass}
                placeholder="978-0-000-00000-0"
              />
            </div>

            {/* Purchase Links */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Purchase Links</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Amazon</label>
                  <input
                    type="url"
                    value={form.amazon_link}
                    onChange={(e) => handleChange("amazon_link", e.target.value)}
                    className={inputClass}
                    placeholder="https://amazon.in/…"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Flipkart</label>
                  <input
                    type="url"
                    value={form.flipkart_link}
                    onChange={(e) => handleChange("flipkart_link", e.target.value)}
                    className={inputClass}
                    placeholder="https://flipkart.com/…"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Publisher</label>
                  <input
                    type="url"
                    value={form.publisher_link}
                    onChange={(e) => handleChange("publisher_link", e.target.value)}
                    className={inputClass}
                    placeholder="https://…"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">International</label>
                  <input
                    type="url"
                    value={form.purchase_link_international}
                    onChange={(e) => handleChange("purchase_link_international", e.target.value)}
                    className={inputClass}
                    placeholder="https://…"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Pothi</label>
                  <input
                    type="url"
                    value={form.purchase_link_pothi}
                    onChange={(e) => handleChange("purchase_link_pothi", e.target.value)}
                    className={inputClass}
                    placeholder="https://pothi.com/…"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Library</label>
                  <input
                    type="url"
                    value={form.purchase_link_library}
                    onChange={(e) => handleChange("purchase_link_library", e.target.value)}
                    className={inputClass}
                    placeholder="https://…"
                  />
                </div>
              </div>
            </div>

            {/* Featured */}
            <div>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => handleChange("featured", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
              <Link
                href="/admin/books"
                className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading || success}
                className="px-4 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Saving…" : "Create Book"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
