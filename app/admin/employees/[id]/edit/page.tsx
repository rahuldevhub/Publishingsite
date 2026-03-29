"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import ImageUpload from "@/app/admin/components/ImageUpload";

const EMPLOYEE_ID_RE = /^[A-Z0-9]+$/;

type Manager = { id: string; name: string; role: string };

type EmployeeForm = {
  name: string;
  slug: string;
  employee_id: string;
  role: string;
  department: string;
  bio: string;
  profile_photo: string;
  linkedin: string;
  employment_type: string;
  joined_date: string;
  active: boolean;
  display_order: number;
  reporting_manager_id: string;
};

export default function EditEmployeePage() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState<EmployeeForm | null>(null);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const [{ data, error }, { data: mgrs }] = await Promise.all([
        supabase.from("employees").select().eq("id", id).single(),
        supabase.from("employees").select("id, name, role").eq("active", true).order("name"),
      ]);

      if (error || !data) {
        setError("Employee not found.");
        setLoading(false);
        return;
      }

      setManagers((mgrs as Manager[]) ?? []);
      setForm({
        name: data.name,
        slug: data.slug,
        employee_id: data.employee_id ?? "",
        role: data.role,
        department: data.department,
        bio: data.bio ?? "",
        profile_photo: data.profile_photo ?? "",
        linkedin: data.linkedin ?? "",
        employment_type: data.employment_type,
        joined_date: data.joined_date?.split("T")[0] ?? "",
        active: data.active,
        display_order: data.display_order,
        reporting_manager_id: data.reporting_manager_id ?? "",
      });
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

    if (!EMPLOYEE_ID_RE.test(form.employee_id)) {
      setError("Employee ID must be uppercase letters and numbers only (e.g. EMP001).");
      return;
    }

    setSaving(true);

    const { error: updateError } = await supabase
      .from("employees")
      .update({
        name: form.name,
        slug: form.slug,
        employee_id: form.employee_id,
        role: form.role,
        department: form.department,
        bio: form.bio || null,
        profile_photo: form.profile_photo || null,
        linkedin: form.linkedin || null,
        employment_type: form.employment_type,
        joined_date: form.joined_date,
        active: form.active,
        display_order: Number(form.display_order),
        reporting_manager_id: form.reporting_manager_id || null,
      })
      .eq("id", id);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/admin/employees"), 1200);
  }

  async function handleDelete() {
    if (!form) return;
    if (!confirm(`Are you sure you want to delete "${form.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    await supabase.from("employees").delete().eq("id", id);
    router.push("/admin/employees");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading employee…</p>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-red-600 mb-4">{error || "Employee not found."}</p>
          <Link href="/admin/employees" className="text-sm font-medium text-gray-900 underline underline-offset-2">
            Back to Employees
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
            <Link href="/admin/employees" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              ← Employees
            </Link>
            <span className="text-gray-300">/</span>
            <h1 className="text-lg font-semibold text-gray-900">Edit Employee</h1>
          </div>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
          >
            {deleting ? "Deleting…" : "Delete Employee"}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-200 px-8 py-8">
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
              Employee updated successfully! Redirecting…
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
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => handleChange("slug", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* Employee ID + Reporting Manager */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Employee ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.employee_id}
                  onChange={(e) => handleChange("employee_id", e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent font-mono"
                  placeholder="e.g., EMP001, EMP002"
                />
                <p className="mt-1 text-xs text-gray-400">Uppercase letters and numbers only. Must be unique.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Reporting Manager</label>
                <select
                  value={form.reporting_manager_id}
                  onChange={(e) => handleChange("reporting_manager_id", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                >
                  <option value="">— None —</option>
                  {managers.filter((m) => m.id !== id).map((m) => (
                    <option key={m.id} value={m.id}>{m.name} – {m.role}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Role + Department */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Role <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={form.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Department <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={form.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
              <textarea
                rows={4}
                value={form.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
              />
            </div>

            {/* Profile Photo + LinkedIn */}
            <div className="grid grid-cols-2 gap-4">
              <ImageUpload
                label="Profile Photo"
                value={form.profile_photo}
                onChange={(url) => handleChange("profile_photo", url)}
                folder="employees"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn URL</label>
                <input
                  type="url"
                  value={form.linkedin}
                  onChange={(e) => handleChange("linkedin", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="https://linkedin.com/in/…"
                />
              </div>
            </div>

            {/* Employment Type + Joined Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Employment Type <span className="text-red-500">*</span></label>
                <select
                  required
                  value={form.employment_type}
                  onChange={(e) => handleChange("employment_type", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Joined Date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  required
                  value={form.joined_date}
                  onChange={(e) => handleChange("joined_date", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* Display Order + Active */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Display Order</label>
                <input
                  type="number"
                  min={0}
                  value={form.display_order}
                  onChange={(e) => handleChange("display_order", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div className="flex items-end pb-2.5">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => handleChange("active", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
              <Link
                href="/admin/employees"
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
