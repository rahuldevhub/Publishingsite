"use client";

import { useEffect, useRef, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import Image from "next/image";
import Link from "next/link";

type Book = {
  id: string;
  title: string;
  slug: string;
  cover_image: string | null;
  author: { name: string } | null;
};

const PLACEHOLDER_COUNT = 10;

export default function BooksCarousel() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    supabase
      .from("books")
      .select("id, title, slug, cover_image, author:authors(name)")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(16)
      .then(({ data, error }) => {
        if (error) console.error("[BooksCarousel] Supabase error:", error);
        console.log("[BooksCarousel] fetched:", data);
        setBooks((data as unknown as Book[]) ?? []);
        setLoading(false);
      });
  }, []);

  function scroll(dir: "left" | "right") {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir === "right" ? 280 : -280, behavior: "smooth" });
  }

  const items = loading
    ? Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => ({ id: String(i), placeholder: true }))
    : books.length > 0
    ? books
    : Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => ({ id: String(i), placeholder: true }));

  return (
    <div className="relative">
      {/* Scroll buttons */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item) => {
          if ("placeholder" in item && item.placeholder) {
            return (
              <div
                key={item.id}
                className="shrink-0 w-36 animate-pulse"
              >
                <div className="w-36 h-52 rounded-xl bg-gray-200" style={{ aspectRatio: "2/3" }} />
                <div className="mt-2 h-3 bg-gray-200 rounded w-3/4" />
                <div className="mt-1 h-3 bg-gray-100 rounded w-1/2" />
              </div>
            );
          }
          const book = item as Book;
          return (
            <Link
              key={book.id}
              href={`/books/${book.slug}`}
              className="shrink-0 w-36 group"
            >
              <div className="w-36 h-52 rounded-xl overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow relative">
                {book.cover_image ? (
                  <Image
                    src={book.cover_image}
                    alt={book.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="144px"
                    loading="lazy"
                  />
                ) : (
                  <img src="https://placehold.co/150x220" alt="Placeholder Image" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                )}
              </div>
              <p className="mt-2 text-xs font-semibold text-gray-900 line-clamp-1 group-hover:text-gray-600 transition-colors">
                {book.title}
              </p>
              {book.author && (
                <p className="text-[10px] text-gray-500 line-clamp-1">{book.author.name}</p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
