"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { ShelfBook } from "./BooksCarousel";
import { positionShelfTooltip, type ShelfRect } from "@/lib/bookshelf-tooltip";

export default function ShelfBookLink({ book, className, children }: {
  book: ShelfBook; className: string; children: ReactNode;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const touchRef = useRef(false);
  const touchOpenRef = useRef(false);
  const [preview, setPreview] = useState<"hover" | "focus" | "touch" | null>(null);

  const reveal = (mode: "hover" | "focus" | "touch") => {
    window.dispatchEvent(new Event("ritera:shelf-preview"));
    touchOpenRef.current = mode === "touch";
    setPreview(mode);
  };

  const placeCard = useCallback((card: HTMLDivElement | null) => {
    cardRef.current = card;
    if (!card || !linkRef.current) return;
    const cover = linkRef.current.querySelector<HTMLElement>("[data-shelf-cover]");
    if (!cover) return;
    const rect = cover.getBoundingClientRect();
    const obstacles: ShelfRect[] = Array.from(document.querySelectorAll<HTMLElement>(
      "[data-bookshelf-showcase] [data-shelf-cover], a[href='/books']",
    )).filter(el => el !== cover).map(el => el.getBoundingClientRect())
      .filter(r => r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < window.innerHeight);
    // Keep the illuminated shelf edges clear as well as the book covers.
    const cabinet = linkRef.current.closest("[data-shelf-cabinet]")?.getBoundingClientRect();
    if (cabinet) {
      for (const [top, bottom] of [[0.02, 0.085], [0.46, 0.52], [0.89, 0.97]]) {
        obstacles.push({ left: cabinet.left, right: cabinet.right,
          top: cabinet.top + cabinet.height * top, bottom: cabinet.top + cabinet.height * bottom });
      }
    }
    const position = positionShelfTooltip(rect, card.getBoundingClientRect(),
      { width: window.innerWidth, height: window.innerHeight }, obstacles);
    if (position) {
      card.style.left = `${position.left}px`;
      card.style.top = `${position.top}px`;
      card.dataset.positioned = "true";
    } else {
      delete card.dataset.positioned;
    }
  }, []);

  useLayoutEffect(() => {
    if (preview) placeCard(cardRef.current);
  }, [preview, placeCard]);

  useEffect(() => {
    const dismiss = () => { touchOpenRef.current = false; setPreview(null); };
    const scroll = () => {
      if (touchOpenRef.current || linkRef.current?.matches(":focus-visible")) placeCard(cardRef.current);
      else dismiss();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (cardRef.current?.contains(document.activeElement)) linkRef.current?.focus();
        dismiss();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!linkRef.current?.contains(event.target as Node) && !cardRef.current?.contains(event.target as Node)) dismiss();
    };
    window.addEventListener("ritera:shelf-preview", dismiss);
    window.addEventListener("keydown", escape);
    window.addEventListener("resize", scroll);
    window.addEventListener("scroll", scroll, true);
    document.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("ritera:shelf-preview", dismiss);
      window.removeEventListener("keydown", escape);
      window.removeEventListener("resize", scroll);
      window.removeEventListener("scroll", scroll, true);
      document.removeEventListener("pointerdown", outside);
    };
  }, [placeCard]);


  return <>
    <Link
      ref={linkRef}
      href={`/books/${book.slug}`}
      aria-label={`${book.title.trim()}${book.author ? ` by ${book.author.name}` : ""}. View book`}
      className={`${className} shelf-book-link rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300`}
      data-preview={preview ?? undefined}
      onPointerEnter={event => { if (event.pointerType === "mouse" && window.matchMedia("(min-width: 640px)").matches && !document.querySelector(".shelf-book-link:focus-visible")) reveal("hover"); }}
      onPointerLeave={() => { if (preview === "hover") setPreview(null); }}
      onPointerDown={event => { touchRef.current = event.pointerType !== "mouse" || window.matchMedia("(max-width: 639px)").matches; }}
      onFocus={event => {
        if (touchRef.current && touchOpenRef.current) return;
        if (!touchRef.current || event.currentTarget.matches(":focus-visible")) {
          // Keyboard focus should expose the entire mobile slide, without a smooth
          // intermediate scroll that briefly clips the focused book or its preview.
          event.currentTarget.closest(".snap-center")?.scrollIntoView({ behavior: "instant", block: "nearest", inline: "start" });
          reveal("focus");
        }
      }}
      onBlur={event => { if (!cardRef.current?.contains(event.relatedTarget as Node) && preview !== "touch") setPreview(null); }}
      onClick={event => {
        if (touchRef.current && event.detail !== 0 && !touchOpenRef.current) {
          event.preventDefault();
          reveal("touch");
        }
      }}
    >{children}</Link>
    {preview && createPortal(
      <div ref={placeCard} role="tooltip" className="shelf-book-preview pointer-events-none fixed z-[60] w-48 max-w-[calc(100vw-32px)] rounded-[10px] border border-white/10 bg-gray-900/95 px-2.5 py-1.5 text-white shadow-lg backdrop-blur-sm">
        <p className="text-[11px] leading-[14px] font-medium break-words">{book.title}</p>
        {book.author && <p className="mt-0.5 text-[10px] leading-[14px] text-amber-200">{book.author.name}</p>}
      </div>, document.body,
    )}
  </>;
}
