"use client";

import { useState } from "react";
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

function generateSlug(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function NewAuthorPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    slug: "",
    bio: "",
    image_url: "",
    instagram: "",
    twitter: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleNameChange(value: string) {
    setForm((f) => ({ ...f, name: value, slug: generateSlug(value) }));
  }

  function handleChange(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: insertError } = await supabase.from("authors").insert({
      name: form.name,
      slug: form.slug,
      bio: form.bio || null,
      image_url: form.image_url || null,
      instagram: form.instagram || null,
      twitter: form.twitter || null,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/admin/authors"), 1200);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/admin/authors" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ← Authors
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-lg font-semibold text-gray-900">New Author</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-200 px-8 py-8">
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
              Author created successfully! Redirecting…
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
                  onChange={(e) => handleNameChange(e.target.value)}
                  className={inputClass}
                  placeholder="Jane Smith"
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
                  placeholder="jane-smith"
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
                placeholder="A short bio about the author…"
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
                disabled={loading || success}
                className="px-4 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Saving…" : "Create Author"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
