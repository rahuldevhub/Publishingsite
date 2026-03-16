"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import ImageUpload from "@/app/admin/components/ImageUpload";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent";

type AuthorForm = {
  name: string;
  slug: string;
  bio: string;
  image_url: string;
  instagram: string;
  twitter: string;
};

export default function EditAuthorPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState<AuthorForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchAuthor() {
      const { data, error } = await supabase
        .from("authors")
        .select()
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Author not found.");
        setLoading(false);
        return;
      }

      setForm({
        name: data.name,
        slug: data.slug,
        bio: data.bio ?? "",
        image_url: data.image_url ?? "",
        instagram: data.instagram ?? "",
        twitter: data.twitter ?? "",
      });
      setLoading(false);
    }

    fetchAuthor();
  }, [id]);

  function handleChange(field: string, value: string) {
    setForm((f) => f ? { ...f, [field]: value } : f);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setError("");
    setSaving(true);

    const { error: updateError } = await supabase
      .from("authors")
      .update({
        name: form.name,
        slug: form.slug,
        bio: form.bio || null,
        image_url: form.image_url || null,
        instagram: form.instagram || null,
        twitter: form.twitter || null,
      })
      .eq("id", id);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/admin/authors"), 1200);
  }

  async function handleDelete() {
    if (!form) return;
    if (!confirm(`Are you sure you want to delete "${form.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    await supabase.from("authors").delete().eq("id", id);
    router.push("/admin/authors");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading author…</p>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-red-600 mb-4">{error || "Author not found."}</p>
          <Link href="/admin/authors" className="text-sm font-medium text-gray-900 underline underline-offset-2">
            Back to Authors
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
            <Link href="/admin/authors" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              ← Authors
            </Link>
            <span className="text-gray-300">/</span>
            <h1 className="text-lg font-semibold text-gray-900">Edit Author</h1>
          </div>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
          >
            {deleting ? "Deleting…" : "Delete Author"}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-200 px-8 py-8">
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
              Author updated successfully! Redirecting…
            </div>
          )}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name + Slug */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
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

            {/* Profile Image */}
            <ImageUpload
              label="Author Photo"
              value={form.image_url}
              onChange={(url) => handleChange("image_url", url)}
              folder="authors"
            />

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
              <textarea
                rows={5}
                value={form.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Instagram + Twitter */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Instagram URL</label>
                <input
                  type="url"
                  value={form.instagram}
                  onChange={(e) => handleChange("instagram", e.target.value)}
                  className={inputClass}
                  placeholder="https://instagram.com/…"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Twitter / X URL</label>
                <input
                  type="url"
                  value={form.twitter}
                  onChange={(e) => handleChange("twitter", e.target.value)}
                  className={inputClass}
                  placeholder="https://x.com/…"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
              <Link
                href="/admin/authors"
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
