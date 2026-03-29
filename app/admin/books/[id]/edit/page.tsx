"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import ImageUpload from "@/app/admin/components/ImageUpload";

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent";

type Author = { id: string; name: string };

type BookForm = {
  title: string;
  subtitle: string;
  slug: string;
  short_description: string;
  description: string;
  cover_image: string;
  isbn: string;
  language: string;
  page_count: number | string;
  genre: string;
  format: string;
  amazon_link: string;
  flipkart_link: string;
  publisher_link: string;
  purchase_link_international: string;
  purchase_link_pothi: string;
  purchase_link_library: string;
  published_date: string;
  author_id: string;
  featured: boolean;
};

export default function EditBookPage() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState<BookForm | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const [{ data: book, error: bookError }, { data: authorsData }] = await Promise.all([
        supabase.from("books").select().eq("id", id).single(),
        supabase.from("authors").select("id, name").order("name"),
      ]);

      if (bookError || !book) {
        setError("Book not found.");
        setLoading(false);
        return;
      }

      setForm({
        title: book.title,
        subtitle: book.subtitle ?? "",
        slug: book.slug,
        short_description: book.short_description ?? "",
        description: book.description ?? "",
        cover_image: book.cover_image ?? "",
        isbn: book.isbn ?? "",
        language: book.language,
        page_count: book.page_count ?? "",
        genre: book.genre,
        format: book.format,
        amazon_link: book.amazon_link ?? "",
        flipkart_link: book.flipkart_link ?? "",
        publisher_link: book.publisher_link ?? "",
        purchase_link_international: book.purchase_link_international ?? "",
        purchase_link_pothi: book.purchase_link_pothi ?? "",
        purchase_link_library: book.purchase_link_library ?? "",
        published_date: book.published_date?.split("T")[0] ?? "",
        author_id: book.author_id,
        featured: book.featured,
      });

      if (authorsData) setAuthors(authorsData);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  function handleChange(field: string, value: string | boolean | number) {
    setForm((f) => f ? { ...f, [field]: value } : f);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setError("");
    setSaving(true);

    const { error: updateError } = await supabase
      .from("books")
      .update({
        title: form.title,
        subtitle: form.subtitle || null,
        slug: form.slug,
        short_description: form.short_description || null,
        description: form.description || null,
        cover_image: form.cover_image || null,
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
      })
      .eq("id", id);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/admin/books"), 1200);
  }

  async function handleDelete() {
    if (!form) return;
    if (!confirm(`Are you sure you want to delete "${form.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    await supabase.from("books").delete().eq("id", id);
    router.push("/admin/books");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading book…</p>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-red-600 mb-4">{error || "Book not found."}</p>
          <Link href="/admin/books" className="text-sm font-medium text-gray-900 underline underline-offset-2">
            Back to Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/books" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              ← Books
            </Link>
            <span className="text-gray-300">/</span>
            <h1 className="text-lg font-semibold text-gray-900">Edit Book</h1>
          </div>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
          >
            {deleting ? "Deleting…" : "Delete Book"}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-200 px-8 py-8">
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
              Book updated successfully! Redirecting…
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
                  onChange={(e) => handleChange("title", e.target.value)}
                  className={inputClass}
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
                disabled={saving || success}
                className="px-4 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
