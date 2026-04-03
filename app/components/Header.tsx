"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS: { label: string; href: string; badge?: string }[] = [
  { label: "Home",          href: "/" },
  { label: "About",         href: "/aboutus" },
  { label: "Packages",      href: "/packages", badge: "NEW" },
  { label: "Books",         href: "/books" },
  { label: "Litspace",      href: "/litspace", badge: "Popular" },
  { label: "Case Studies",  href: "/case-studies" },
  // { label: "Blog",     href: "/blog",     badge: "3" },
  // { label: "Careers",  href: "/careers" },
  // { label: "Contact",  href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname                = usePathname();

  // Auto-hide on admin routes
  if (pathname.startsWith("/admin")) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close mobile menu on route change
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const textBase   = "text-gray-600";
  const textHover  = "hover:text-gray-900 hover:bg-gray-50";
  const textActive = "text-gray-900 bg-gray-100";

  return (
    <>
      {/* ── Header bar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 h-16 flex items-center gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 mr-2">
            <Image
              src="/logo.png"
              alt="Ritera Publishing Logo"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav — center */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_LINKS.map(({ label, href, badge }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive ? textActive : `${textBase} ${textHover}`
                  }`}
                >
                  {label}
                  {badge && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-red-500 text-white leading-none">
                      {badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 ml-auto shrink-0">
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" aria-modal="true" role="dialog">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* Slide-in drawer */}
          <aside className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Ritera Publishing Logo"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                />
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {NAV_LINKS.map(({ label, href, badge }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span>{label}</span>
                    {badge && (
                      <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-red-500 text-white leading-none">
                        {badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Drawer footer CTA */}
            <div className="p-4 border-t border-gray-100 space-y-2">
              <Link
                href="/packages"
                className="flex items-center justify-center w-full py-3 bg-amber-400 text-gray-900 font-bold rounded-xl text-sm hover:bg-amber-300 transition-colors"
              >
                Get Started →
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center w-full py-3 border border-gray-200 text-gray-600 font-medium rounded-xl text-sm hover:border-gray-400 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
