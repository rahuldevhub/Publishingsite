"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function CareerActions({ id, title }: { id: string; title: string }) {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;
    setDeleting(true);
    await supabase.from("careers").delete().eq("id", id);
    router.refresh();
  }

  return (
    <div className="flex items-center justify-end gap-3">
      <Link
        href={`/admin/careers/${id}/edit`}
        className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
      >
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
