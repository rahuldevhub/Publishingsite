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
  slug: "",
  excerpt: "",
  content: "",
  featured_image: "",
  category_id: "",
  author_id: "",
  reading_time: 5,
  meta_title: "",
  meta_description: "",
  featured: false,
  published: false,
};

type Option = { id: string; name: string };

export default function NewBlogPostPage() {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [categories, setCategories] = useState<Option[]>([]);
  const [authors, setAuthors] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchOptions() {
      const [{ data: cats }, { data: auths }] = await Promise.all([
        supabase.from("blog_categories").select("id, name").order("name"),
        supabase.from("authors").select("id, name").order("name"),
      ]);
      if (cats) setCategories(cats);
      if (auths) setAuthors(auths);
    }
    fetchOptions();
  }, []);

  function handleTitleChange(value: string) {
    setForm((f) => ({ ...f, title: value, slug: generateSlug(value) }));
  }

  function handleChange(field: string, value: string | boolean | number) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: insertError } = await supabase.from("blog_posts").insert({
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt || null,
      content: form.content,
      featured_image: form.featured_image || null,
      category_id: form.category_id,
      author_id: form.author_id,
      reading_time: Number(form.reading_time),
      meta_title: form.meta_title || null,
      meta_description: form.meta_description || null,
      featured: form.featured,
      published: form.published,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/admin/blog-posts"), 1200);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/admin/blog-posts" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ← Blog Posts
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-lg font-semibold text-gray-900">New Blog Post</h1>
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
                  placeholder="My Blog Post"
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
                  placeholder="my-blog-post"
                />
              </div>
            </div>

            {/* Category + Author */}
            <div className="grid grid-cols-2 gap-4">
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
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt</label>
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={(e) => handleChange("excerpt", e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder="Short summary of the post…"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Content <span className="text-red-500">*</span></label>
              <textarea
                rows={12}
                required
                value={form.content}
                onChange={(e) => handleChange("content", e.target.value)}
                className={`${inputClass} resize-y`}
                placeholder="Write your post content here…"
              />
            </div>

            {/* Featured Image + Reading Time */}
            <div className="grid grid-cols-2 gap-4">
              <ImageUpload
                label="Featured Image"
                value={form.featured_image}
                onChange={(url) => handleChange("featured_image", url)}
                folder="blog"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Reading Time (minutes) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  required
                  min={1}
                  value={form.reading_time}
                  onChange={(e) => handleChange("reading_time", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Meta Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Title</label>
              <input
                type="text"
                value={form.meta_title}
                onChange={(e) => handleChange("meta_title", e.target.value)}
                className={inputClass}
                placeholder="SEO title (defaults to post title if empty)"
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

            {/* Featured + Published */}
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => handleChange("featured", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => handleChange("published", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                <span className="text-sm font-medium text-gray-700">Published</span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
              <Link
                href="/admin/blog-posts"
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
