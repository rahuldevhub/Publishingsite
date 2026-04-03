import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import Link from "next/link";
import EmployeeActions from "./EmployeeActions";

const STATUS_STYLES: Record<string, string> = {
  "Currently Working":       "bg-green-100 text-green-700",
  "Resigned":                "bg-gray-100 text-gray-600",
  "Absconded":               "bg-red-100 text-red-700",
  "Internship Completed":    "bg-blue-100 text-blue-700",
  "Internship Discontinued": "bg-orange-100 text-orange-700",
  "Contract Ended":          "bg-gray-100 text-gray-600",
  "Terminated":              "bg-red-100 text-red-700",
};

function EmploymentStatusBadge({ status }: { status: string }) {
  const cls = STATUS_STYLES[status] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
}

export default async function EmployeesPage() {
  const supabase = createServerClient();
  const cookieStore = await cookies();
  if (!cookieStore.get("admin_session")) {
    redirect("/admin/login");
  }

  const { data: employees, error } = await supabase
    .from("employees")
    .select("id, name, employee_id, role, department, employment_type, active, employment_status, display_order")
    .order("display_order", { ascending: true });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              ← Dashboard
            </Link>
            <span className="text-gray-300">/</span>
            <h1 className="text-lg font-semibold text-gray-900">Employees</h1>
          </div>
          <Link
            href="/admin/employees/new"
            className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            + Add New Employee
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            Failed to load employees: {error.message}
          </div>
        )}

        {!employees?.length ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-sm">No employees found.</p>
            <Link href="/admin/employees/new" className="mt-4 inline-block text-sm font-medium text-gray-900 underline underline-offset-2">
              Add your first employee
            </Link>
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
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Type</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-right px-6 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{emp.name}</td>
                    <td className="px-6 py-4">
                      {emp.employee_id ? (
                        <span className="font-mono text-xs bg-gray-100 text-gray-900 px-2 py-1 rounded">
                          {emp.employee_id}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{emp.role}</td>
                    <td className="px-6 py-4 text-gray-600">{emp.department}</td>
                    <td className="px-6 py-4 text-gray-600">{emp.employment_type}</td>
                    <td className="px-6 py-4">
                      <EmploymentStatusBadge status={emp.employment_status ?? "Currently Working"} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <EmployeeActions id={emp.id} name={emp.name} />
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
