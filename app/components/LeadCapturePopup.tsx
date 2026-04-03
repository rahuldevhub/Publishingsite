"use client";

import { useState, useEffect, useCallback } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  sourceSlug: string;
};

export default function LeadCapturePopup({ isOpen, onClose, pdfUrl, sourceSlug }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Pre-fill from sessionStorage
  useEffect(() => {
    if (isOpen) {
      const saved = sessionStorage.getItem("lead_capture");
      if (saved) {
        try {
          const { name: n, email: e } = JSON.parse(saved);
          if (n) setName(n);
          if (e) setEmail(e);
        } catch {}
      }
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!email.trim()) { setError("Please enter your email."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          source: "case_study",
          source_slug: sourceSlug,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      // Save to sessionStorage for future pre-fill
      sessionStorage.setItem("lead_capture", JSON.stringify({ name: name.trim(), email: email.trim() }));

      setSuccess(true);
      setTimeout(() => {
        onClose();
        window.open(pdfUrl, "_blank");
        setSuccess(false);
      }, 800);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Download case study"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.7)" }}
        onClick={onClose}
      />

      {/* Card */}
      <div
        className="relative w-full bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-8"
        style={{ maxWidth: 480 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="w-12 h-12 bg-amber-400/10 rounded-xl flex items-center justify-center mb-5">
          <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-white mb-1">Get the Full Case Study</h2>
        <p className="text-sm text-gray-400 mb-6">
          Enter your details to download the complete PDF. Free, no spam.
        </p>

        {success ? (
          <div className="py-6 text-center">
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-green-400 font-semibold text-sm">Opening your PDF…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wide mb-1.5">
                Full Name <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wide mb-1.5">
                Email Address <span className="text-amber-400">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wide mb-1.5">
                Phone <span className="text-gray-600">(optional)</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-amber-400 text-gray-900 font-bold rounded-xl text-sm hover:bg-amber-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download Now
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-600">
              We respect your privacy. No spam, ever.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
