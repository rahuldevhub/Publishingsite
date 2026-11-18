"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavLink = { label: string; href: string; badge?: string; sections?: { label: string; href: string }[] };

const NAV_LINKS: NavLink[] = [
  { label: "Home",          href: "/" },
  { label: "About", href: "/aboutus", sections: [
    { label: "Our Community", href: "/aboutus#virtual-meet" },
    { label: "Author Interviews", href: "/aboutus#author-interviews" },
    { label: "Anthologies & LitSpace", href: "/aboutus#anthologies-litspace" },
    { label: "Our Team", href: "/aboutus#our-team" },
  ] },
  { label: "Packages", href: "/packages", sections: [
    { label: "Compare Packages", href: "/packages#packages" },
    { label: "Build Your Own Package", href: "/packages#custom-builder" },
  ] },
  { label: "Books",         href: "/books" },
  { label: "Litspace",      href: "/litspace", badge: "Popular" },
  { label: "Case Studies",  href: "/case-studies" },
  { label: "Guides",        href: "/blog" },
  // { label: "Careers",  href: "/careers" },
  // { label: "Contact",  href: "/contact" },
];

function NavigationItem({ item, active, mobile = false, onNavigate }: {
  item: NavLink; active: boolean; mobile?: boolean; onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = `${mobile ? "mobile" : "desktop"}-${item.label.toLowerCase()}-sections`;

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  function navigate() {
    setOpen(false);
    onNavigate?.();
  }

  const stateClass = active
    ? mobile ? "bg-gray-900 text-white" : "bg-amber-50 text-gray-900 ring-1 ring-inset ring-amber-200/60"
    : open ? "bg-stone-100/80 text-gray-900" : "text-gray-600 hover:bg-stone-100/70 hover:text-gray-900";

  return (
    <div
      ref={containerRef}
      className={mobile ? "" : "relative"}
      onPointerEnter={(event) => {
        if (!mobile && item.sections && event.pointerType === "mouse") setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (!mobile && event.pointerType === "mouse") setOpen(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
    >
      <div className={`flex items-center rounded-xl text-sm font-medium transition-colors duration-200 ${stateClass}`}>
        <Link
          href={item.href}
          aria-current={active ? "page" : undefined}
          onClick={navigate}
          className={`flex items-center gap-1.5 rounded-xl transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${mobile ? "flex-1 px-4 py-3" : item.sections ? "py-2 pl-3 pr-1" : "px-3 py-2"}`}
        >
          {item.label}
          {item.badge && <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-400/15 text-amber-600 border border-amber-400/30 leading-none">{item.badge}</span>}
        </Link>
        {item.sections && (
          <button
            ref={toggleRef}
            type="button"
            aria-label={`${item.label} sections`}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
            className={`flex shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-amber-400/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${mobile ? "mr-1 h-10 w-10" : "mr-1 h-8 w-6"}`}
          >
            <svg className={`h-3.5 w-3.5 opacity-70 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m5 7.5 5 5 5-5" />
            </svg>
          </button>
        )}
      </div>
      {item.sections && (
        <div
          id={panelId}
          hidden={!open}
          className={mobile ? "ml-4 mt-1 border-l border-amber-200 pl-2 pb-2" : "absolute left-0 top-full z-10 w-64 pt-3"}
        >
          <div className={mobile ? "" : "rounded-2xl border border-stone-200/80 bg-[#fffdf8] p-2 shadow-[0_12px_36px_-12px_rgba(17,24,39,0.22)]"}>
          {item.sections.map((section) => (
            <Link key={section.href} href={section.href} onClick={navigate} className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-amber-100/60 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400">
              {section.label}
            </Link>
          ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname                = usePathname();
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);
  const drawerCloseBtnRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

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

  // Escape closes the drawer; move focus in on open, return it on close.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (menuOpen) {
      wasOpenRef.current = true;
      drawerCloseBtnRef.current?.focus();
      function onKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") setMenuOpen(false);
      }
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }
    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      hamburgerBtnRef.current?.focus();
    }
  }, [menuOpen]);


  return (
    <>
      {/* ── Header bar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fffdf8] shadow-[0_2px_14px_-8px_rgba(56,37,9,0.18)] lg:bg-white lg:shadow-md">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-3 lg:py-[5px] flex items-center gap-3 lg:gap-4">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5 shrink-0 lg:mr-2 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400">
            <span className="relative block h-[58px] w-[58px] shrink-0 overflow-hidden bg-white lg:h-[76px] lg:w-[76px]">
              <Image
                src="/logo.png"
                alt="Ritera Publishing Logo"
                width={400}
                height={400}
                className="absolute left-1/2 top-1/2 h-[76px] w-[76px] max-w-none -translate-x-1/2 -translate-y-1/2 lg:h-[96px] lg:w-[96px]"
                priority
              />
            </span>
            <span className="flex flex-col lg:hidden">
              <span className="font-[family-name:var(--font-playfair)] text-[17px] leading-5 font-semibold tracking-tight text-gray-900">Ritera Publishing</span>
              <span className="mt-1 text-[10px] leading-3 tracking-[0.02em] text-stone-500">Your story starts here</span>
            </span>
          </Link>

          {/* Desktop nav — center */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_LINKS.map((item) => (
              <NavigationItem key={item.href} item={item} active={pathname === item.href} />
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-auto shrink-0">
            {/* Hamburger */}
            <button
              ref={hamburgerBtnRef}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl border border-amber-900/10 bg-white/70 text-gray-700 hover:border-amber-400/60 hover:bg-amber-50 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
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
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-amber-200/30 via-amber-500/60 to-amber-200/30 lg:hidden" />
      </header>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-0 z-50 lg:hidden"
          aria-modal="true"
          aria-label="Mobile navigation"
          role="dialog"
        >
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
                ref={drawerCloseBtnRef}
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
              {NAV_LINKS.map((item) => (
                <NavigationItem key={item.href} item={item} active={pathname === item.href} mobile onNavigate={() => setMenuOpen(false)} />
              ))}
            </nav>

            {/* Drawer footer CTA */}
            <div className="p-4 border-t border-gray-100 space-y-2">
              <Link
                href="/packages"
                className="flex items-center justify-center w-full py-3 bg-amber-400 text-gray-900 font-bold rounded-xl text-sm hover:bg-amber-300 transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                Get Started →
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center w-full py-3 border border-gray-200 text-gray-600 font-medium rounded-xl text-sm hover:border-gray-400 transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
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
