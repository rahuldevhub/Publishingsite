"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EmployeeActions({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) return;
    setDeleting(true);

    const { error } = await supabase.from("employees").delete().eq("id", id);

    if (error) {
      alert(`Failed to delete "${name}": ${error.message}`);
      setDeleting(false);
      return;
    }

    router.refresh();
  }

  return (
    <div className="flex items-center justify-end gap-3">
      <Link
        href={`/admin/employees/${id}/edit`}
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
