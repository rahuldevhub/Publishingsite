"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
const FEATURES = [
  { title: "Editorial",  desc: "Perfect every manuscript" },
  { title: "Publishing", desc: "ISBN · Print · Distribute" },
  { title: "Support",    desc: "Dedicated expert guidance" },
  { title: "Events",     desc: "Launches · Author interviews" },
];

// ─── Easing ──────────────────────────────────────────────────────────────────
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

// ─── Section ─────────────────────────────────────────────────────────────────

export default function EditorialAboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible,      setVisible]     = useState(false);
  const [imgHovered,   setImgHovered]  = useState(false);

  useEffect(() => {
    const observe = (
      el: Element | null,
      setter: (v: boolean) => void,
      threshold: number,
    ) => {
      if (!el) return () => {};
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } },
        { threshold },
      );
      obs.observe(el);
      return () => obs.disconnect();
    };

    const c1 = observe(sectionRef.current, setVisible, 0.05);
    return () => { c1(); };
  }, []);

  const fu = (delay: number, extra?: React.CSSProperties): React.CSSProperties => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? "none" : "translateY(24px)",
    transition: `opacity 0.7s ${EASE} ${delay}ms, transform 0.7s ${EASE} ${delay}ms`,
    ...extra,
  });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="editorial-heading"
      className="relative overflow-hidden bg-white"
    >
      {/*
        Premium detail: paired radial glows frame both columns.
        Left glow — warm amber behind the image.
        Right glow — softer amber behind the content column.
        Together they give the section a handcrafted, lit-from-within quality.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 70% 65% at 24% 54%, rgba(245,158,11,0.05) 0%, transparent 68%)",
            "radial-gradient(ellipse 55% 60% at 78% 42%, rgba(245,158,11,0.028) 0%, transparent 62%)",
          ].join(", "),
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20 lg:pt-14 lg:pb-14">
        {/*
          3 fr image / 2 fr content, 72 px column gap.
          Default align-items:stretch → both columns identical height.
          Mobile: flex-col, 40 px row gap.
        */}
        <div
          className="flex flex-col gap-10 lg:grid"
          style={{ gridTemplateColumns: "3fr 2fr", columnGap: "88px" }}
        >

          {/* ── Image ─────────────────────────────────────────────────────── */}
          <div
            className="min-w-0 relative aspect-[4/3] lg:aspect-auto cursor-default"
            onMouseEnter={() => setImgHovered(true)}
            onMouseLeave={() => setImgHovered(false)}
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible
                ? (imgHovered ? "scale(1.015)" : "scale(1)")
                : "scale(0.97)",
              transition: `opacity 0.8s ${EASE} 0ms, transform 0.6s ease-out 0ms`,
            }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                borderRadius: "26px",
                boxShadow:
                  "0 10px 48px -8px rgba(0,0,0,0.14), 0 3px 14px -3px rgba(0,0,0,0.06)",
              }}
            >
              <Image
                src="/images/home/rakesh-sharma-silent-turning-author-hero.webp"
                alt="Rakesh Sharma, author of The Silent Turning, published by Ritera Publishing"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover object-[50%_14%] sm:object-[50%_28%]"
                loading="lazy"
                priority={false}
              />
            </div>
          </div>

          {/* ── Content ───────────────────────────────────────────────────── */}
          <div className="flex flex-col min-w-0 relative">

            {/*
              Editorial flourish: serif opening-quote at 9 % opacity.
              At this level it reads as an intentional design element
              rather than a ghost artefact.
            */}
            <div
              aria-hidden="true"
              style={{
                position:      "absolute",
                top:           "-20px",
                left:          "-8px",
                fontFamily:    "Georgia, 'Times New Roman', serif",
                fontSize:      "180px",
                lineHeight:    1,
                color:         "rgba(245,158,11,0.09)",
                fontStyle:     "normal",
                fontWeight:    700,
                pointerEvents: "none",
                userSelect:    "none",
                zIndex:        0,
              }}
            >
              &ldquo;
            </div>

            {/* Eyebrow */}
            <div style={{ ...fu(0), position: "relative", zIndex: 1 }}>
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-amber-500 mb-2.5">
                HOW EVERY GREAT BOOK BEGINS
              </p>
              {/* ──── ✦ ──── */}
              <div className="flex items-center gap-2 mb-5" aria-hidden="true">
                <div className="h-px bg-amber-400/50" style={{ width: "24px" }} />
                <span className="text-amber-400/60" style={{ fontSize: "8px", lineHeight: 1 }}>✦</span>
                <div className="h-px bg-amber-400/50" style={{ width: "24px" }} />
              </div>
            </div>

            {/*
              Heading — maxWidth forces the elegant 3-line editorial wrap:
                Every Great Book
                Begins With Someone
                Who Believes In It.
              lineHeight 1.02 for tight luxurious leading.
            */}
            <div style={{ ...fu(100), position: "relative", zIndex: 1 }}>
              <h2
                id="editorial-heading"
                className="font-serif text-gray-900"
                style={{
                  fontSize:     "clamp(28px, 3.4vw, 46px)",
                  lineHeight:   1.02,
                  marginBottom: "24px",
                }}
              >
                {/* Explicit breaks guarantee the 3-line editorial wrap at all sizes */}
                Every Great Book<br />
                Begins With Someone<br />
                Who{" "}
                <em
                  style={{
                    background:           "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor:  "transparent",
                    backgroundClip:       "text",
                    fontStyle:            "italic",
                  }}
                >
                  Believes In It.
                </em>
              </h2>
            </div>

            {/*
              Paragraphs — no artificial max-width cap; the content column
              (≈ 474 px on desktop) provides the natural measure.
              24 px between paragraphs → 32 px to feature cards.
            */}
            <div style={fu(180)}>
              <p className="text-gray-500 leading-relaxed text-[15px] lg:text-[16px] mb-7">
                At Ritera Publishing, every author is paired with a dedicated publishing
                team that transforms ideas into professionally published books. From
                editing and design to printing, distribution, and marketing, we guide
                every step with transparency, creativity, and care.
              </p>
              <p className="text-gray-500 leading-relaxed text-[15px] lg:text-[16px]">
                Publishing is more than printing a book. It&apos;s about building an
                author&apos;s journey, helping stories reach readers across India and
                the world while creating a publishing experience that&apos;s personal,
                seamless, and trustworthy.
              </p>
            </div>

            {/* Feature cards — 32 px below paragraphs */}
            <div style={fu(260, { marginTop: "32px" })}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {FEATURES.map((f) => (
                  <div
                    key={f.title}
                    className="
                      border border-gray-200 rounded-[20px]
                      px-4 py-[14px] bg-white min-h-[68px] flex flex-col justify-center
                      transition-all duration-[250ms] ease-out
                      hover:-translate-y-0.5
                      hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]
                      hover:border-amber-300 hover:bg-amber-50/30
                    "
                  >
                    <p className="text-[12px] font-bold text-gray-900 mb-1 leading-snug">
                      {f.title}
                    </p>
                    <p className="text-[11px] text-gray-400 leading-snug">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA — 32 px below feature cards */}
            <div style={fu(340, { marginTop: "32px" })}>
              <Link
                href="/packages"
                className="
                  group inline-flex items-center gap-3 px-8 bg-gray-900 text-white
                  font-semibold rounded-xl text-sm
                  transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                  hover:bg-gray-800 hover:-translate-y-[2px]
                  hover:shadow-[0_12px_36px_rgba(0,0,0,0.28)]
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-offset-2 focus-visible:outline-amber-400
                "
                style={{ height: "52px" }}
              >
                Start Your Publishing Journey
                <svg
                  className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

          </div>{/* /content */}
        </div>{/* /grid */}
      </div>
    </section>
  );
}
