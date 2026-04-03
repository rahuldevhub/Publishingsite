"use client";

import { useState } from "react";
import LeadCapturePopup from "./LeadCapturePopup";

type Props = { pdfUrl: string; sourceSlug: string };

export default function DownloadButton({ pdfUrl, sourceSlug }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 transition-colors text-sm shadow-lg shadow-amber-400/20"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        Download PDF Case Study
      </button>
      <LeadCapturePopup
        isOpen={open}
        onClose={() => setOpen(false)}
        pdfUrl={pdfUrl}
        sourceSlug={sourceSlug}
      />
    </>
  );
}
