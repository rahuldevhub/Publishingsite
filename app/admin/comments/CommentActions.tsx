"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  id: string;
  authorName: string;
  content: string;
  approved: boolean;
  preview: string;
  renderInline?: boolean;
  renderActions?: boolean;
};

export default function CommentActions({
  id,
  authorName,
  content,
  approved,
  preview,
  renderInline,
  renderActions,
}: Props) {
  const router = useRouter();
  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [expanded, setExpanded] = useState(false);

  async function handleToggleApproval() {
    setToggling(true);
    await supabase.from("comments").update({ approved: !approved }).eq("id", id);
    router.refresh();
    setToggling(false);
  }

  async function handleDelete() {
    if (!confirm(`Delete this comment by "${authorName}"? This cannot be undone.`)) return;
    setDeleting(true);
    await supabase.from("comments").delete().eq("id", id);
    router.refresh();
  }

  // Renders the comment preview text with expand/collapse toggle
  if (renderInline) {
    const needsExpand = content.length > 80;
    return (
      <div>
        <p className="text-gray-700 text-sm leading-relaxed">
          {expanded ? content : preview}
        </p>
        {needsExpand && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-1 text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    );
  }

  // Renders approve + delete action buttons
  if (renderActions) {
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

  return null;
}
