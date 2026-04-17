"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function LitspaceActions({
  id,
  title,
  approved,
}: {
  id: string;
  title: string;
  approved: boolean;
}) {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleToggleApproval() {
    setToggling(true);
    if (!approved) {
      // Approving — go through API so the approval email is sent
      await fetch(`/api/admin/litspace-posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: true }),
      });
    } else {
      // Rejecting — no email needed
      await supabase.from("litspace_posts").update({ approved: false }).eq("id", id);
    }
    router.refresh();
    setToggling(false);
  }

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;
    setDeleting(true);
    await supabase.from("litspace_posts").delete().eq("id", id);
    router.refresh();
  }

  return (
    <div className="flex items-center justify-end gap-3">
      <button
        onClick={handleToggleApproval}
        disabled={toggling}
        className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors disabled:opacity-50 ${
          approved
            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
            : "bg-green-100 text-green-700 hover:bg-green-200"
        }`}
      >
        {toggling ? "…" : approved ? "Reject" : "Approve"}
      </button>
      <Link
        href={`/admin/litspace-posts/${id}/edit`}
        className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors disabled:opacity-50"
      >
        {deleting ? "Deleting…" : "Delete"}
      </button>
    </div>
  );
}
