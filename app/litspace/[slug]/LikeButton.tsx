"use client";

import { useState, useEffect } from "react";

export default function LikeButton({
  postId,
  initialCount,
}: {
  postId: string;
  initialCount: number;
}) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/litspace/like?postId=${postId}`)
      .then((r) => r.json())
      .then((data) => {
        setLiked(data.liked);
        setCount(data.count);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [postId]);

  async function handleLike() {
    if (loading) return;
    // Optimistic update
    const nextLiked = !liked;
    const nextCount = nextLiked ? count + 1 : count - 1;
    setLiked(nextLiked);
    setCount(nextCount);
    setLoading(true);

    try {
      const res = await fetch("/api/litspace/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
      const data = await res.json();
      setLiked(data.liked);
      setCount(data.count);
    } catch {
      // Revert on failure
      setLiked(liked);
      setCount(count);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      title={liked ? "Unlike this post" : "Like this post"}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all ${
        liked
          ? "bg-red-50 border-red-200 text-red-600"
          : "bg-white border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-500"
      } disabled:opacity-60`}
    >
      <svg
        className={`w-5 h-5 transition-all ${
          liked ? "fill-red-500 stroke-red-500" : "fill-none stroke-current"
        }`}
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      <span className="text-sm font-medium">{count}</span>
    </button>
  );
}
