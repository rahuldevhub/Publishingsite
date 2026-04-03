"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent";

type CsForm = {
  title: string;
  slug: string;
  author_name: string;
  content: string;
  pdf_url: string;
  meta_title: string;
  meta_description: string;
  keywords: string;
  faq_data: string;
  featured: boolean;
  published: boolean;
};

export default function EditCaseStudyPage() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState<CsForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data, error: fetchError } = await supabase
        .from("case_studies")
        .select("title, slug, author_name, content, pdf_url, meta_title, meta_description, keywords, faq_data, featured, published")
        .eq("id", id)
        .single();

      if (fetchError || !data) {
        setError("Case study not found.");
        setLoading(false);
        return;
      }

      setForm({
        title: data.title,
        slug: data.slug,
        author_name: data.author_name,
        content: data.content ?? "",
        pdf_url: data.pdf_url ?? "",
        meta_title: data.meta_title ?? "",
        meta_description: data.meta_description ?? "",
        keywords: data.keywords ?? "",
        faq_data: data.faq_data ? JSON.stringify(data.faq_data, null, 2) : "",
        featured: data.featured,
        published: data.published,
      });
      setLoading(false);
    }
    fetchData();
  }, [id]);

  function handleChange(field: string, value: string | boolean) {
    setForm((f) => f ? { ...f, [field]: value } : f);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setError("");
    setSaving(true);

    let parsedFaq = null;
    if (form.faq_data.trim()) {
      try { parsedFaq = JSON.parse(form.faq_data); }
      catch { setError("FAQ data must be valid JSON."); setSaving(false); return; }
    }

    const res = await fetch(`/api/admin/case-studies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        slug: form.slug,
        author_name: form.author_name,
        content: form.content || null,
        pdf_url: form.pdf_url || null,
        meta_title: form.meta_title || null,
        meta_description: form.meta_description || null,
        keywords: form.keywords || null,
        faq_data: parsedFaq,
        featured: form.featured,
        published: form.published,
        updated_at: new Date().toISOString(),
      }),
    });

    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to save changes.");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/admin/case-studies"), 1200);
  }

  async function handleDelete() {
    if (!form) return;
    if (!confirm(`Delete "${form.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    await fetch(`/api/admin/case-studies/${id}`, { method: "DELETE" });
    router.push("/admin/case-studies");
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-sm text-gray-500">Loading…</p></div>;
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-red-600 mb-4">{error || "Not found."}</p>
          <Link href="/admin/case-studies" className="text-sm font-medium text-gray-900 underline underline-offset-2">Back to Case Studies</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/case-studies" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">← Case Studies</Link>
            <span className="text-gray-300">/</span>
            <h1 className="text-lg font-semibold text-gray-900">Edit Case Study</h1>
          </div>
          <button onClick={handleDelete} disabled={deleting} className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors disabled:opacity-50">
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-200 px-8 py-8">
          {success && <div className="mb-6 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">Updated successfully! Redirecting…</div>}
          {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title + Slug */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title <span className="text-red-500">*</span></label>
                <input type="text" required value={form.title} onChange={(e) => handleChange("title", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug <span className="text-red-500">*</span></label>
                <input type="text" required value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} className={inputClass} />
              </div>
            </div>

            {/* Author Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Author Name <span className="text-red-500">*</span></label>
              <input type="text" required value={form.author_name} onChange={(e) => handleChange("author_name", e.target.value)} className={inputClass} />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Content</label>
              <textarea rows={12} value={form.content} onChange={(e) => handleChange("content", e.target.value)} className={`${inputClass} resize-y`} />
              <p className="mt-1 text-xs text-gray-400">Use ## Heading for subheadings. Separate paragraphs with a blank line.</p>
            </div>

            {/* PDF URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">PDF URL</label>
              <input type="url" value={form.pdf_url} onChange={(e) => handleChange("pdf_url", e.target.value)} className={inputClass} placeholder="https://…/case-study.pdf" />
            </div>

            {/* Meta Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Title</label>
              <input type="text" value={form.meta_title} onChange={(e) => handleChange("meta_title", e.target.value)} className={inputClass} placeholder="SEO title" />
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Description</label>
              <textarea rows={2} value={form.meta_description} onChange={(e) => handleChange("meta_description", e.target.value)} className={`${inputClass} resize-none`} />
            </div>

            {/* SEO Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">SEO Keywords</label>
              <input type="text" value={form.keywords} onChange={(e) => handleChange("keywords", e.target.value)} className={inputClass} placeholder="self publishing success India, author case study" />
              <p className="mt-1 text-xs text-gray-400">Comma-separated</p>
            </div>

            {/* FAQ JSON */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">FAQ (JSON format)</label>
              <textarea rows={4} value={form.faq_data} onChange={(e) => handleChange("faq_data", e.target.value)} className={`${inputClass} resize-y font-mono text-xs`} placeholder={`[{"question": "How long did it take?", "answer": "We published in 3 weeks."}]`} />
              <p className="mt-1 text-xs text-gray-400">Must be valid JSON array.</p>
            </div>

            {/* Featured + Published */}
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={(e) => handleChange("featured", e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900" />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={(e) => handleChange("published", e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900" />
                <span className="text-sm font-medium text-gray-700">Published</span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
              <Link href="/admin/case-studies" className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Cancel</Link>
              <button type="submit" disabled={saving || success} className="px-4 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
