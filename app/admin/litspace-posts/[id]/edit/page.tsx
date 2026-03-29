"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent";

type Category = { id: string; name: string };

type PostForm = {
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  content: string;
  writer_name: string;
  writer_email: string;
  author_bio: string;
  category_id: string;
  meta_title: string;
  meta_description: string;
  approved: boolean;
  featured: boolean;
};

export default function EditLitspacePostPage() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState<PostForm | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [approving, setApproving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const [{ data: post, error: postError }, { data: cats }] = await Promise.all([
        supabase.from("litspace_posts").select().eq("id", id).single(),
        supabase.from("litspace_categories").select("id, name").order("name"),
      ]);

      if (postError || !post) {
        setError("Post not found.");
        setLoading(false);
        return;
      }

      setForm({
        title: post.title,
        slug: post.slug,
        subtitle: post.subtitle ?? "",
        excerpt: post.excerpt ?? "",
        content: post.content,
        writer_name: post.writer_name,
        writer_email: post.writer_email,
        author_bio: post.author_bio ?? "",
        category_id: post.category_id,
        meta_title: post.meta_title ?? "",
        meta_description: post.meta_description ?? "",
        approved: post.approved,
        featured: post.featured,
      });

      if (cats) setCategories(cats);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  function handleChange(field: string, value: string | boolean) {
    setForm((f) => f ? { ...f, [field]: value } : f);
  }

  async function handleToggleApproval() {
    if (!form) return;
    setApproving(true);
    const newValue = !form.approved;
    await supabase.from("litspace_posts").update({ approved: newValue }).eq("id", id);
    setForm((f) => f ? { ...f, approved: newValue } : f);
    setApproving(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setError("");
    setSaving(true);

    const { error: updateError } = await supabase
      .from("litspace_posts")
      .update({
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
      })
      .eq("id", id);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/admin/litspace-posts"), 1200);
  }

  async function handleDelete() {
    if (!form) return;
    if (!confirm(`Are you sure you want to delete "${form.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    await supabase.from("litspace_posts").delete().eq("id", id);
    router.push("/admin/litspace-posts");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading post…</p>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-red-600 mb-4">{error || "Post not found."}</p>
          <Link href="/admin/litspace-posts" className="text-sm font-medium text-gray-900 underline underline-offset-2">
            Back to Litspace Posts
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
            <Link href="/admin/litspace-posts" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              ← Litspace Posts
            </Link>
            <span className="text-gray-300">/</span>
            <h1 className="text-lg font-semibold text-gray-900">Edit Post</h1>
          </div>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
          >
            {deleting ? "Deleting…" : "Delete Post"}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-4">
        {/* Approval Banner */}
        <div className={`rounded-xl border px-6 py-4 flex items-center justify-between ${
          form.approved
            ? "bg-green-50 border-green-200"
            : "bg-yellow-50 border-yellow-200"
        }`}>
          <div className="flex items-center gap-3">
            <span className={`w-2.5 h-2.5 rounded-full ${form.approved ? "bg-green-500" : "bg-yellow-400"}`} />
            <div>
              <p className={`text-sm font-semibold ${form.approved ? "text-green-800" : "text-yellow-800"}`}>
                {form.approved ? "This post is approved and visible to the public" : "This post is pending approval"}
              </p>
              <p className={`text-xs mt-0.5 ${form.approved ? "text-green-600" : "text-yellow-600"}`}>
                Submitted by {form.writer_name} · {form.writer_email}
              </p>
            </div>
          </div>
          <button
            onClick={handleToggleApproval}
            disabled={approving}
            className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${
              form.approved
                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {approving ? "Updating…" : form.approved ? "Reject Post" : "Approve Post"}
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 px-8 py-8">
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
              Post updated successfully! Redirecting…
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
                href="/admin/litspace-posts"
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
