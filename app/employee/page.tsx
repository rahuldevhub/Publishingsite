import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const metadata: Metadata = {
  title: "Our Team | Ritera Publishing",
  description: "Meet the dedicated team behind Ritera Publishing.",
};

type Employee = {
  id: string;
  employee_id: string | null;
  name: string;
  role: string;
  department: string;
  profile_photo: string | null;
  employment_type: string;
  active: boolean;
  display_order: number;
  reporting_manager: { name: string } | null;
};

export default async function EmployeeDirectoryPage() {
  const { data: employees, error } = await supabase
    .from("employees")
    .select(
      "id, employee_id, name, role, department, profile_photo, employment_type, active, display_order, reporting_manager:reporting_manager_id(name)"
    )
    .eq("active", true)
    .order("display_order", { ascending: true });

  const typedEmployees = (employees ?? []) as unknown as Employee[];

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Our Team</h1>
          <p className="text-sm text-gray-500 mt-1">Meet the people behind Ritera Publishing</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            Failed to load employees: {error.message}
          </div>
        )}

        {typedEmployees.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-500 text-sm">No team members found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Name</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Employee ID</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Role</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Department</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Reporting Manager</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {typedEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link
                        href={`/employee/${emp.employee_id ?? emp.id}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
                          {emp.profile_photo ? (
                            <Image
                              src={emp.profile_photo}
                              alt={emp.name}
                              width={32}
                              height={32}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-500">
                              {emp.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                          {emp.name}
                        </span>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      {emp.employee_id ? (
                        <span className="font-mono text-xs bg-gray-100 text-gray-900 px-2 py-1 rounded">
                          {emp.employee_id}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-900">{emp.role}</td>
                    <td className="px-6 py-4 text-gray-900">{emp.department}</td>
                    <td className="px-6 py-4 text-gray-900">
                      {emp.reporting_manager?.name ?? <span className="text-gray-400">—</span>}
                    </td>
                    <td className="px-6 py-4 text-gray-900">{emp.employment_type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
