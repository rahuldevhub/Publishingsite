"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail]       = useState("");
  const [status, setStatus]     = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      if (!res.ok) throw new Error("Subscribe failed");
      setStatus("done");
    } catch (err) {
      console.error("[Newsletter] subscribe error:", err);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="flex items-center gap-2 text-green-400 text-sm">
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        You&apos;re subscribed! We&apos;ll be in touch.
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 min-w-0 px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2.5 bg-amber-400 text-gray-900 font-semibold rounded-lg text-sm hover:bg-amber-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
        >
          {status === "loading" ? "…" : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p role="alert" className="mt-2 text-sm text-red-400">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
