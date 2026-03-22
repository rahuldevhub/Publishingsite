"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent";

function generateSlug(title: string) {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

type Category = { id: string; name: string };

const emptyForm = {
  title: "",
  slug: "",
  subtitle: "",
  excerpt: "",
  content: "",
  writer_name: "",
  writer_email: "",
  author_bio: "",
  category_id: "",
  meta_title: "",
  meta_description: "",
  approved: false,
  featured: false,
};

export default function NewLitspacePostPage() {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    supabase.from("litspace_categories").select("id, name").order("name").then(({ data }) => {
      if (data) setCategories(data);
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

    const { error: insertError } = await supabase.from("litspace_posts").insert({
      title: form.title,
      slug: form.slug,
      subtitle: form.subtitle || null,
      excerpt: form.excerpt || null,
      content: form.content,
      writer_name: form.writer_name,
      writer_email: form.writer_email || null,
      author_bio: form.author_bio || null,
      category_id: form.category_id,
      meta_title: form.meta_title || null,
      meta_description: form.meta_description || null,
      approved: form.approved,
      featured: form.featured,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/admin/litspace-posts"), 1200);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/admin/litspace-posts" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ← Litspace Posts
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-lg font-semibold text-gray-900">New Post</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-200 px-8 py-8">
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
              Post created successfully! Redirecting…
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
                  placeholder="My Story"
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
                  placeholder="my-story"
                />
              </div>
            </div>

            {/* Writer Name + Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Writer Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={form.writer_name}
                  onChange={(e) => handleChange("writer_name", e.target.value)}
                  className={inputClass}
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Writer Email</label>
                <input
                  type="email"
                  value={form.writer_email}
                  onChange={(e) => handleChange("writer_email", e.target.value)}
                  className={inputClass}
                  placeholder="jane@example.com"
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
                placeholder="An optional subtitle for the post"
              />
            </div>

            {/* Author Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Author Bio</label>
              <textarea
                rows={3}
                value={form.author_bio}
                onChange={(e) => handleChange("author_bio", e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder="A short bio about the writer…"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category <span className="text-red-500">*</span></label>
              <select
                required
                value={form.category_id}
                onChange={(e) => handleChange("category_id", e.target.value)}
                className={`${inputClass} bg-white`}
              >
                <option value="">Select a category…</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt</label>
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={(e) => handleChange("excerpt", e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder="A brief summary…"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Content <span className="text-red-500">*</span></label>
              <textarea
                rows={14}
                required
                value={form.content}
                onChange={(e) => handleChange("content", e.target.value)}
                className={`${inputClass} resize-y`}
                placeholder="Write the post content here…"
              />
            </div>

            {/* Meta Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Title</label>
              <input
                type="text"
                value={form.meta_title}
                onChange={(e) => handleChange("meta_title", e.target.value)}
                className={inputClass}
                placeholder="SEO title"
              />
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Description</label>
              <textarea
                rows={2}
                value={form.meta_description}
                onChange={(e) => handleChange("meta_description", e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder="SEO description…"
              />
            </div>

            {/* Approved + Featured */}
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.approved}
                  onChange={(e) => handleChange("approved", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                <span className="text-sm font-medium text-gray-700">Approved</span>
              </label>
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
                href="/admin/litspace-posts"
                className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading || success}
                className="px-4 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Saving…" : "Create Post"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
