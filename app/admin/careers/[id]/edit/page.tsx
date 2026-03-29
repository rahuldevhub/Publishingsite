"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent";

type CareerForm = {
  title: string;
  slug: string;
  short_description: string;
  description: string;
  responsibilities: string;
  requirements: string;
  skills: string;
  location: string;
  job_type: string;
  experience_level: string;
  salary_range: string;
  application_email: string;
  application_link: string;
  meta_title: string;
  meta_description: string;
  status: string;
};

export default function EditCareerPage() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState<CareerForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchCareer() {
      const { data, error } = await supabase
        .from("careers")
        .select()
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Job posting not found.");
        setLoading(false);
        return;
      }

      setForm({
        title: data.title,
        slug: data.slug,
        short_description: data.short_description ?? "",
        description: data.description,
        responsibilities: data.responsibilities,
        requirements: data.requirements,
        skills: data.skills,
        location: data.location,
        job_type: data.job_type,
        experience_level: data.experience_level,
        salary_range: data.salary_range ?? "",
        application_email: data.application_email,
        application_link: data.application_link ?? "",
        meta_title: data.meta_title ?? "",
        meta_description: data.meta_description ?? "",
        status: data.status,
      });
      setLoading(false);
    }

    fetchCareer();
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
      .from("careers")
      .update({
        title: form.title,
        slug: form.slug,
        short_description: form.short_description || null,
        description: form.description,
        responsibilities: form.responsibilities,
        requirements: form.requirements,
        skills: form.skills,
        location: form.location,
        job_type: form.job_type,
        experience_level: form.experience_level,
        salary_range: form.salary_range || null,
        application_email: form.application_email,
        application_link: form.application_link || null,
        meta_title: form.meta_title || null,
        meta_description: form.meta_description || null,
        status: form.status,
      })
      .eq("id", id);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/admin/careers"), 1200);
  }

  async function handleDelete() {
    if (!form) return;
    if (!confirm(`Are you sure you want to delete "${form.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    await supabase.from("careers").delete().eq("id", id);
    router.push("/admin/careers");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading job posting…</p>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-red-600 mb-4">{error || "Job posting not found."}</p>
          <Link href="/admin/careers" className="text-sm font-medium text-gray-900 underline underline-offset-2">
            Back to Careers
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
            <Link href="/admin/careers" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              ← Careers
            </Link>
            <span className="text-gray-300">/</span>
            <h1 className="text-lg font-semibold text-gray-900">Edit Job Posting</h1>
          </div>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
          >
            {deleting ? "Deleting…" : "Delete Posting"}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-200 px-8 py-8">
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
              Job posting updated successfully! Redirecting…
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
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Title <span className="text-red-500">*</span></label>
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

            {/* Job Type + Experience Level */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Type <span className="text-red-500">*</span></label>
                <select
                  required
                  value={form.job_type}
                  onChange={(e) => handleChange("job_type", e.target.value)}
                  className={`${inputClass} bg-white`}
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Remote</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Experience Level <span className="text-red-500">*</span></label>
                <select
                  required
                  value={form.experience_level}
                  onChange={(e) => handleChange("experience_level", e.target.value)}
                  className={`${inputClass} bg-white`}
                >
                  <option>Entry</option>
                  <option>Mid-level</option>
                  <option>Senior</option>
                  <option>Lead</option>
                </select>
              </div>
            </div>

            {/* Location + Salary Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Location <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Salary Range</label>
                <input
                  type="text"
                  value={form.salary_range}
                  onChange={(e) => handleChange("salary_range", e.target.value)}
                  className={inputClass}
                  placeholder="₹6L – ₹10L per annum"
                />
              </div>
            </div>

            {/* Application Email + Link */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Application Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  required
                  value={form.application_email}
                  onChange={(e) => handleChange("application_email", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Application Link</label>
                <input
                  type="url"
                  value={form.application_link}
                  onChange={(e) => handleChange("application_link", e.target.value)}
                  className={inputClass}
                  placeholder="https://…"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Status <span className="text-red-500">*</span></label>
              <select
                required
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className={`${inputClass} bg-white`}
              >
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </div>

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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Description <span className="text-red-500">*</span></label>
              <textarea
                rows={6}
                required
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Responsibilities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Responsibilities <span className="text-red-500">*</span></label>
              <textarea
                rows={6}
                required
                value={form.responsibilities}
                onChange={(e) => handleChange("responsibilities", e.target.value)}
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Requirements <span className="text-red-500">*</span></label>
              <textarea
                rows={6}
                required
                value={form.requirements}
                onChange={(e) => handleChange("requirements", e.target.value)}
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Skills <span className="text-red-500">*</span></label>
              <textarea
                rows={4}
                required
                value={form.skills}
                onChange={(e) => handleChange("skills", e.target.value)}
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

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
              <Link
                href="/admin/careers"
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
