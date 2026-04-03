"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CaseStudyActions({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;
    setDeleting(true);
    await fetch(`/api/admin/case-studies/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="flex items-center justify-end gap-3">
      <Link href={`/admin/case-studies/${id}/edit`} className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
        Edit
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="text-red-500 hover:text-red-700 font-medium transition-colors disabled:opacity-50"
      >
        {deleting ? "Deleting…" : "Delete"}
      </button>
    </div>
  );
}
