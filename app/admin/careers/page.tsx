import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import Link from "next/link";
import CareerActions from "./CareerActions";

const selectClass =
  "px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent";

export default async function CareersPage({
  searchParams,
}: {
  searchParams: Promise<{ job_type?: string; status?: string; location?: string }>;
}) {
  const supabase = createServerClient();
  const cookieStore = await cookies();
  if (!cookieStore.get("admin_session")) {
    redirect("/admin/login");
  }

  const { job_type, status, location } = await searchParams;

  // Fetch distinct locations for filter
  const { data: allCareers } = await supabase.from("careers").select("location");
  const locations = [...new Set(allCareers?.map((c) => c.location).filter(Boolean))].sort();

  let query = supabase
    .from("careers")
    .select("id, title, location, job_type, experience_level, status, created_at")
    .order("created_at", { ascending: false });

  if (job_type) query = query.eq("job_type", job_type);
  if (status) query = query.eq("status", status);
  if (location) query = query.eq("location", location);

  const { data: careers, error } = await query;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              ← Dashboard
            </Link>
            <span className="text-gray-300">/</span>
            <h1 className="text-lg font-semibold text-gray-900">Careers</h1>
          </div>
          <Link
            href="/admin/careers/new"
            className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            + Add New Job
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Filters */}
        <form method="GET" className="flex flex-wrap items-center gap-3 mb-6">
          <select name="job_type" defaultValue={job_type ?? ""} className={selectClass}>
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>
          <select name="status" defaultValue={status ?? ""} className={selectClass}>
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
          {locations.length > 0 && (
            <select name="location" defaultValue={location ?? ""} className={selectClass}>
              <option value="">All Locations</option>
              {locations.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          )}
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Filter
          </button>
          {(job_type || status || location) && (
            <Link
              href="/admin/careers"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Clear
            </Link>
          )}
        </form>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            Failed to load careers: {error.message}
          </div>
        )}

        {!careers?.length ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-sm">No job postings found.</p>
            <Link href="/admin/careers/new" className="mt-4 inline-block text-sm font-medium text-gray-900 underline underline-offset-2">
              Create your first job posting
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Title</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Location</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Job Type</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Experience</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-right px-6 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {careers.map((career) => (
                  <tr key={career.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 max-w-xs">
                      <div className="truncate">{career.title}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{career.location}</td>
                    <td className="px-6 py-4 text-gray-600">{career.job_type}</td>
                    <td className="px-6 py-4 text-gray-600">{career.experience_level}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        career.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {career.status === "active" ? "Active" : "Closed"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <CareerActions id={career.id} title={career.title} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
