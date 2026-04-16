"use client";

import { useState, useMemo } from "react";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  selected_services: string[] | null;
  created_at: string;
};

const PAGE_SIZE = 10;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ServicePills({
  services,
  expanded,
  onToggle,
}: {
  services: string[];
  expanded: boolean;
  onToggle: () => void;
}) {
  if (services.length === 0) return <span className="text-gray-400">—</span>;

  const visible = expanded ? services : services.slice(0, 3);
  const extra = services.length - 3;

  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((s, i) => (
        <span
          key={i}
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
        >
          {s}
        </span>
      ))}
      {!expanded && extra > 0 && (
        <button
          onClick={onToggle}
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
        >
          +{extra} more
        </button>
      )}
      {expanded && (
        <button
          onClick={onToggle}
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
        >
          Show less
        </button>
      )}
    </div>
  );
}

export default function PackageInquiriesClient({
  inquiries,
}: {
  inquiries: Inquiry[];
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggleExpanded(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return inquiries;
    return inquiries.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        (r.phone ?? "").toLowerCase().includes(q)
    );
  }, [inquiries, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, filtered.length);
  const pageRows = filtered.slice(start, end);

  return (
    <div>
      {/* Search + count row */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by name, email or phone..."
          className="flex-1 max-w-sm px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        />
        <span className="text-sm text-gray-500">
          {filtered.length} {filtered.length === 1 ? "inquiry" : "inquiries"}
        </span>
      </div>

      {pageRows.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-sm">
            {search.trim()
              ? "No results match your search."
              : "No package inquiries yet."}
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Full Name</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Email</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Phone</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Selected Services</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Notes</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pageRows.map((row) => {
                  const services = Array.isArray(row.selected_services)
                    ? row.selected_services
                    : [];
                  const notes = row.message ?? "";
                  return (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 align-top font-medium text-gray-900 whitespace-nowrap">
                        {row.name}
                      </td>
                      <td className="px-6 py-3 align-top text-gray-600">
                        {row.email}
                      </td>
                      <td className="px-6 py-3 align-top text-gray-600 whitespace-nowrap">
                        {row.phone ?? <span className="text-gray-400">—</span>}
                      </td>
                      <td className="px-6 py-3 align-top max-w-xs">
                        <ServicePills
                          services={services}
                          expanded={expanded.has(row.id)}
                          onToggle={() => toggleExpanded(row.id)}
                        />
                      </td>
                      <td className="px-6 py-3 align-top text-gray-600 max-w-xs">
                        {notes ? (
                          <span title={notes}>
                            {notes.length > 60 ? notes.slice(0, 60) + "…" : notes}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-3 align-top text-gray-500 whitespace-nowrap">
                        {formatDate(row.created_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {filtered.length === 0 ? 0 : start + 1}–{end} of{" "}
              {filtered.length} results
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-500">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
