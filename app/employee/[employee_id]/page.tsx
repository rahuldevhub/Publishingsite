import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riterapublishing.com";

type PageProps = {
  params: Promise<{ employee_id: string }>;
};

type Employee = {
  id: string;
  employee_id: string;
  name: string;
  role: string;
  department: string;
  bio: string | null;
  profile_photo: string | null;
  linkedin: string | null;
  employment_type: string;
  joined_date: string | null;
  active: boolean;
  reporting_manager: { name: string; role: string; employee_id: string | null } | null;
};

async function getEmployee(employee_id: string): Promise<Employee | null> {
  const { data, error } = await supabase
    .from("employees")
    .select(
      "id, employee_id, name, role, department, bio, profile_photo, linkedin, employment_type, joined_date, active, reporting_manager:reporting_manager_id(name, role, employee_id)"
    )
    .eq("employee_id", employee_id)
    .single();

  if (error || !data) return null;
  return data as unknown as Employee;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { employee_id } = await params;
  const emp = await getEmployee(employee_id);
  if (!emp) return { title: "Employee Not Found | Ritera Publishing" };

  return {
    title: `${emp.name} (${emp.employee_id}) | Ritera Publishing`,
    description: emp.bio ?? `${emp.name} — ${emp.role} at Ritera Publishing.`,
    openGraph: {
      title: `${emp.name} | Ritera Publishing`,
      description: emp.bio ?? `${emp.role} at Ritera Publishing`,
      url: `${SITE_URL}/employee/${emp.employee_id}`,
      ...(emp.profile_photo && { images: [{ url: emp.profile_photo }] }),
    },
    alternates: { canonical: `${SITE_URL}/employee/${emp.employee_id}` },
  };
}

export default async function EmployeeProfilePage({ params }: PageProps) {
  const { employee_id } = await params;
  const emp = await getEmployee(employee_id);

  if (!emp || !emp.active) notFound();

  const joinedDate = emp.joined_date
    ? new Date(emp.joined_date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/employee" className="hover:text-gray-900 transition-colors">
            Our Team
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{emp.name}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Header band */}
          <div className="bg-gray-900 px-8 py-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-700 shrink-0 border-2 border-gray-600">
                {emp.profile_photo ? (
                  <Image
                    src={emp.profile_photo}
                    alt={emp.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-black text-gray-400">
                    {emp.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Identity */}
              <div className="flex-1">
                {/* Employee ID badge — prominent */}
                <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-600 rounded-lg px-3 py-1 mb-3">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">ID</span>
                  <span className="font-mono text-sm font-bold text-white">{emp.employee_id}</span>
                </div>

                <h1 className="text-2xl lg:text-3xl font-black text-white">{emp.name}</h1>
                <p className="text-gray-300 text-sm mt-1">{emp.role}</p>

                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="text-xs bg-gray-800 border border-gray-700 text-gray-300 px-3 py-1 rounded-full">
                    {emp.department}
                  </span>
                  <span className="text-xs bg-gray-800 border border-gray-700 text-gray-300 px-3 py-1 rounded-full">
                    {emp.employment_type}
                  </span>
                  {joinedDate && (
                    <span className="text-xs text-gray-400">
                      Joined {joinedDate}
                    </span>
                  )}
                </div>
              </div>

              {/* LinkedIn */}
              {emp.linkedin && (
                <a
                  href={emp.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-8 space-y-8">
            {/* Info grid */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Employee ID</p>
                <p className="font-mono font-bold text-gray-900 text-lg">{emp.employee_id}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Department</p>
                <p className="font-semibold text-gray-900">{emp.department}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Employment</p>
                <p className="font-semibold text-gray-900">{emp.employment_type}</p>
              </div>
            </div>

            {/* Reporting manager */}
            {emp.reporting_manager && (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Reporting Manager</p>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 w-fit">
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 shrink-0">
                    {emp.reporting_manager.name.charAt(0)}
                  </div>
                  <div>
                    {emp.reporting_manager.employee_id ? (
                      <Link
                        href={`/employee/${emp.reporting_manager.employee_id}`}
                        className="font-semibold text-gray-900 hover:text-gray-600 transition-colors text-sm"
                      >
                        {emp.reporting_manager.name}
                      </Link>
                    ) : (
                      <p className="font-semibold text-gray-900 text-sm">{emp.reporting_manager.name}</p>
                    )}
                    <p className="text-xs text-gray-500">{emp.reporting_manager.role}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Bio */}
            {emp.bio && (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">About</p>
                <p className="text-gray-900 leading-relaxed">{emp.bio}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/employee" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ← Back to Team Directory
          </Link>
        </div>
      </div>
    </main>
  );
}
