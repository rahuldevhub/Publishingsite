"use client";

import { useEffect } from "react";
import Link from "next/link";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: (...args: any[]) => void;
  }
}

/** Fires an additional PageView for the LitSpace page on mount. */
export function LitspacePixelPageView() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, []);
  return null;
}

/** Wraps a Link and fires fbq('track', 'Lead') on click. */
export function SubmitWorkButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  function handleClick() {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead");
    }
  }
  return (
    <Link href="/litspace/submit" className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
