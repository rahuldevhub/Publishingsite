"use client";

import { useEffect, useRef, useState } from "react";

const GOLD = "#b5873a";
const GOLD_LIGHT = "rgba(201,168,76,0.15)";
const PAGE_BG = "#faf6f0";

const KEYFRAMES = `
  @keyframes rv-blob1 {
    0%   { transform: translate(0, 0) scale(1); }
    100% { transform: translate(-40px, 30px) scale(1.08); }
  }
  @keyframes rv-blob2 {
    0%   { transform: translate(0, 0) scale(1); }
    100% { transform: translate(30px, -25px) scale(1.05); }
  }
  @keyframes rv-rotate-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes rv-label-in {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes rv-heading-in {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes rv-name-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.72; }
  }
  @keyframes rv-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes rv-draw-line {
    from { width: 0px; }
    to   { width: 48px; }
  }
  @keyframes rv-shimmer-text {
    0%, 100% { letter-spacing: 0.01em; color: ${GOLD}; }
    50%       { letter-spacing: 0.06em; color: #d4a855; text-shadow: 0 0 20px rgba(181,135,58,0.4); }
  }
  @keyframes rv-particle-float {
    0%   { transform: translateY(0px); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(-100vh); opacity: 0; }
  }
`;

// 6 particles — hard pixel constraints, never over content
const PARTICLES = [
  { size: 5, left: "15px",     right: undefined, bottomPct: 15, delay: 0,   dur: 13, opacity: 0.15 },
  { size: 4, left: "50px",     right: undefined, bottomPct: 42, delay: 3,   dur: 16, opacity: 0.12 },
  { size: 7, left: "28px",     right: undefined, bottomPct: 65, delay: 6,   dur: 11, opacity: 0.18 },
  { size: 5, left: undefined,  right: "15px",    bottomPct: 25, delay: 1.5, dur: 14, opacity: 0.14 },
  { size: 4, left: undefined,  right: "55px",    bottomPct: 52, delay: 4,   dur: 12, opacity: 0.12 },
  { size: 6, left: undefined,  right: "32px",    bottomPct: 10, delay: 7,   dur: 15, opacity: 0.16 },
];

// ── 3D Tilt Benefit Card ──────────────────────────────────────────────────────
function BenefitCard({
  icon,
  text,
  animDelay,
}: {
  icon: string;
  text: string;
  animDelay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    const shine = shineRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = (e.clientX - cx) / (rect.width / 2);
    const ny = (e.clientY - cy) / (rect.height / 2);
    const rotX = -ny * 12;
    const rotY = nx * 12;

    el.style.transition = "transform 0.1s ease, box-shadow 0.1s ease";
    el.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
    el.style.boxShadow = "0 20px 40px rgba(0,0,0,0.10), 0 0 0 1px rgba(201,168,76,0.4)";

    if (shine) {
      const sx = 50 - nx * 35;
      const sy = 50 - ny * 35;
      shine.style.background = `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.55) 0%, transparent 65%)`;
      shine.style.opacity = "1";
    }
  }

  function onMouseLeave() {
    const el = cardRef.current;
    const shine = shineRef.current;
    if (el) {
      el.style.transition = "transform 0.5s ease, box-shadow 0.5s ease";
      el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0)";
      el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
    }
    if (shine) shine.style.opacity = "0";
  }

  return (
    <div
      ref={cardRef}
      data-animate="fade-up"
      data-delay={animDelay}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        opacity: 0,
        transform: "translateY(28px)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "linear-gradient(135deg, #ffffff 0%, #fdf8f0 100%)",
        border: `1px solid ${GOLD_LIGHT}`,
        borderRadius: "16px",
        padding: "28px 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        cursor: "default",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <div
        ref={shineRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          transition: "opacity 0.15s ease",
          pointerEvents: "none",
          borderRadius: "16px",
        }}
      />
      <span
        style={{
          fontSize: "30px",
          lineHeight: 1,
          display: "inline-block",
          marginBottom: "8px",
          filter: "drop-shadow(0 2px 4px rgba(181,135,58,0.2))",
          position: "relative",
        }}
      >
        {icon}
      </span>
      <p
        style={{
          margin: 0,
          fontSize: "0.95rem",
          fontWeight: 500,
          color: "#2c2016",
          lineHeight: 1.5,
          position: "relative",
        }}
      >
        {text}
      </p>
    </div>
  );
}

// ── Dot divider ───────────────────────────────────────────────────────────────
function DotDivider() {
  return (
    <div
      data-animate="fade-up"
      style={{
        opacity: 0,
        transform: "translateY(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        margin: "48px 0",
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: i === 1 ? "6px" : "4px",
            height: i === 1 ? "6px" : "4px",
            borderRadius: "50%",
            backgroundColor: i === 1 ? GOLD : "rgba(181,135,58,0.35)",
          }}
        />
      ))}
    </div>
  );
}

// ── Section card wrapper ──────────────────────────────────────────────────────
function SectionCard({
  children,
  animDelay = 0,
}: {
  children: React.ReactNode;
  animDelay?: number;
}) {
  return (
    <div
      data-animate="fade-up"
      data-delay={animDelay}
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: "20px",
        padding: "40px 48px",
        border: `1px solid ${GOLD_LIGHT}`,
        boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
        marginBottom: "80px",
      }}
    >
      {children}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ReviewerPageContent({
  displayName,
}: {
  displayName: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [heroReady, setHeroReady] = useState(false);
  const [thankYouVisible, setThankYouVisible] = useState(false);

  // 1 — inject keyframes
  useEffect(() => {
    if (document.querySelector("style[data-rv3]")) {
      setHeroReady(true);
      return;
    }
    const tag = document.createElement("style");
    tag.setAttribute("data-rv3", "1");
    tag.textContent = KEYFRAMES;
    document.head.appendChild(tag);
    setHeroReady(true);
    return () => {
      document.querySelector("style[data-rv3]")?.remove();
    };
  }, []);

  // 2 — scroll: parallax hero ONLY (0.5x) + blob drift (0.15x) + progress bar
  useEffect(() => {
    const hero = heroRef.current;
    const blob1 = blob1Ref.current;
    const blob2 = blob2Ref.current;
    const progress = progressRef.current;

    function onScroll() {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;

      if (progress) {
        progress.style.width = `${Math.min((y / Math.max(docH, 1)) * 100, 100)}%`;
      }

      // Desktop only
      if (window.innerWidth <= 768) return;

      // Hero moves at 0.5x — ONLY the hero wrapper, not content below
      if (hero) hero.style.transform = `translateY(${y * 0.5}px)`;

      // Blobs drift at 0.15x for depth feel
      if (blob1) blob1.style.transform = `translateY(${-y * 0.15}px)`;
      if (blob2) blob2.style.transform = `translateY(${y * 0.12}px)`;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 3 — IntersectionObserver for scroll-triggered elements
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = Array.from(
      container.querySelectorAll<HTMLElement>("[data-animate]")
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = parseInt(el.dataset.delay ?? "0", 10);
          const type = el.dataset.animate;

          setTimeout(() => {
            if (type === "fade-up") {
              el.style.transition =
                "opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)";
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
              if (el.dataset.hasThankyou === "1") {
                setTimeout(() => setThankYouVisible(true), 750);
              }
            } else if (type === "divider") {
              el.style.transition = "width 0.6s cubic-bezier(0.22,1,0.36,1)";
              el.style.width = "48px";
            }
          }, delay);

          io.unobserve(el);
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        position: "relative",
        background: PAGE_BG,
        fontFamily: "Georgia, serif",
      }}
    >
      {/* ── Scroll progress bar ── */}
      <div
        ref={progressRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "4px",
          width: "0%",
          background: "linear-gradient(90deg, #c9a84c, #e8c96a, #c9a84c)",
          boxShadow: "0 0 8px rgba(201,168,76,0.6)",
          zIndex: 1000,
          pointerEvents: "none",
        }}
      />

      {/* ── Background blobs ── */}
      <div
        ref={blob1Ref}
        aria-hidden
        style={{
          position: "fixed",
          top: "-10%",
          right: "-5%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.14) 0%, transparent 70%)",
          animation: "rv-blob1 20s ease-in-out infinite alternate",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        ref={blob2Ref}
        aria-hidden
        style={{
          position: "fixed",
          bottom: "-10%",
          left: "-8%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(180,100,80,0.08) 0%, transparent 70%)",
          animation: "rv-blob2 24s ease-in-out infinite alternate",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Decorative rotating glyph — right side ── */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: "10%",
          right: "-80px",
          fontSize: "400px",
          color: "#b5873a",
          opacity: 0.06,
          fontFamily: "serif",
          lineHeight: 1,
          animation: "rv-rotate-slow 60s linear infinite",
          transformOrigin: "center",
          pointerEvents: "none",
          zIndex: 0,
          userSelect: "none",
        }}
      >
        ✦
      </div>

      {/* ── Bottom vignette ── */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "300px",
          background:
            "radial-gradient(ellipse at bottom center, rgba(180,100,60,0.05), transparent)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Floating gold particles — hard edge constraints ── */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          aria-hidden
          style={{
            position: "fixed",
            bottom: `${p.bottomPct}%`,
            ...(p.left ? { left: p.left } : {}),
            ...(p.right ? { right: p.right } : {}),
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: "radial-gradient(circle, #e8c96a, #b5873a)",
            opacity: p.opacity,
            animation: `rv-particle-float ${p.dur}s ${p.delay}s ease-in infinite`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 1: HERO — parallax layer (zIndex 1)
          The heroRef div receives translateY(y * 0.5) on scroll.
          It sits BELOW the content layer in stacking order.
      ═══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "100px",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        <div
          ref={heroRef}
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            paddingBottom: "60px",
            willChange: "transform",
          }}
        >
          {/* Label */}
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#c9a84c",
              marginBottom: "20px",
              marginTop: 0,
              opacity: heroReady ? undefined : 0,
              animation: heroReady
                ? "rv-label-in 0.6s 0.1s cubic-bezier(0.22,1,0.36,1) both"
                : undefined,
            }}
          >
            A note, just for you
          </p>

          {/* Heading — "Welcome," on line 1, "{name} ✨" on line 2 */}
          <h1
            style={{
              fontSize: "clamp(3.5rem, 9vw, 6rem)",
              fontWeight: 800,
              color: "#1a1008",
              lineHeight: 1.05,
              marginTop: 0,
              marginBottom: 0,
              letterSpacing: "-0.02em",
              opacity: heroReady ? undefined : 0,
              animation: heroReady
                ? "rv-heading-in 0.85s 0.3s cubic-bezier(0.22,1,0.36,1) both"
                : undefined,
            }}
          >
            Welcome,
            <br />
            <span
              style={{
                color: "#c9a84c",
                animation: heroReady
                  ? "rv-name-pulse 3s 1.2s ease-in-out infinite"
                  : undefined,
              }}
            >
              {displayName}
            </span>{" "}
            ✨
          </h1>

          {/* Gold underline accent under h1 */}
          <div
            style={{
              width: "80px",
              height: "3px",
              background: "linear-gradient(90deg, #c9a84c, transparent)",
              marginTop: "16px",
              marginBottom: "24px",
              opacity: heroReady ? undefined : 0,
              animation: heroReady ? "rv-fade-in 0.6s 0.9s ease both" : undefined,
            }}
          />

          {/* Subtitle */}
          <p
            style={{
              fontSize: "1.1rem",
              color: "#6b5040",
              fontStyle: "italic",
              marginTop: 0,
              marginBottom: "40px",
              lineHeight: 1.8,
              opacity: heroReady ? undefined : 0,
              animation: heroReady
                ? "rv-fade-in 0.8s 0.85s ease both"
                : undefined,
            }}
          >
            If you are here, this page was meant only for you.
          </p>

          {/* Hero divider */}
          <div
            style={{
              height: "2px",
              background: `linear-gradient(90deg, ${GOLD}, rgba(181,135,58,0.3))`,
              width: heroReady ? undefined : 0,
              animation: heroReady
                ? "rv-draw-line 0.6s 1s cubic-bezier(0.22,1,0.36,1) both"
                : undefined,
            }}
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 2: CONTENT — solid background layer (zIndex 2)
          This layer renders ON TOP of the parallax hero, covering it
          as you scroll. Each section has the page background so the
          hero text cannot bleed through.
      ═══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          background: PAGE_BG,
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "120px",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>

          {/* ── Para 1 ── */}
          <p
            data-animate="fade-up"
            data-has-thankyou="1"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              fontSize: "1.05rem",
              color: "#3d2b1f",
              lineHeight: 1.9,
              marginTop: 0,
              marginBottom: "80px",
              maxWidth: "680px",
            }}
          >
            Some readers read books. Some live them. And a rare few, like you,
            help stories travel beyond pages, beyond shelves, and into hearts.
            Your presence in the literary world is not just noticed — it is
            felt. Every post, every reflection, every quiet moment you spend
            with a book becomes a bridge, connecting stories to new readers,
            new conversations, and new life. Today, we simply wanted to pause
            and say:{" "}
            <span
              style={{
                position: "relative",
                display: "inline-block",
                color: GOLD,
                fontWeight: "bold",
                animation: thankYouVisible
                  ? "rv-shimmer-text 3s 0.3s ease-in-out infinite"
                  : undefined,
              }}
            >
              thank you.
              <span
                style={{
                  position: "absolute",
                  bottom: "-2px",
                  left: 0,
                  height: "1.5px",
                  background: GOLD,
                  width: thankYouVisible ? "100%" : "0%",
                  transition: thankYouVisible
                    ? "width 0.6s 0.2s ease"
                    : undefined,
                }}
              />
            </span>
          </p>

          {/* ── Your place in our story — card ── */}
          <SectionCard>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#1a1008",
                marginTop: 0,
                marginBottom: "20px",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}
            >
              Your place in our story
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "#3d2b1f",
                lineHeight: 1.9,
                margin: 0,
                maxWidth: "600px",
              }}
            >
              You are now a cherished part of our extended literary circle — a
              space built not just on books, but on shared passion, trust, and
              the magic of storytelling.
            </p>
          </SectionCard>

          {/* ── For our favourite reviewer — card ── */}
          <SectionCard animDelay={40}>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#1a1008",
                marginTop: 0,
                marginBottom: "28px",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}
            >
              For our favourite reviewer
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px",
                alignItems: "stretch",
              }}
            >
              <BenefitCard
                icon="📖"
                text="Early glimpses into upcoming stories"
                animDelay={0}
              />
              <BenefitCard
                icon="🎁"
                text="Quiet surprises meant only for you"
                animDelay={120}
              />
              <BenefitCard
                icon="✉️"
                text="Invitations to special literary moments"
                animDelay={240}
              />
              <BenefitCard
                icon="🌿"
                text="A closer connection with our publishing journey"
                animDelay={360}
              />
            </div>
          </SectionCard>

          {/* ── Cinematic blockquote ── */}
          <blockquote
            data-animate="fade-up"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              borderLeft: `3px solid ${GOLD}`,
              paddingLeft: "20px",
              margin: "0 0 80px 0",
              fontSize: "1.15rem",
              color: "#8a6a3a",
              fontStyle: "italic",
              lineHeight: 1.8,
            }}
          >
            Because stories grow stronger when they travel through voices like
            yours.
          </blockquote>

          {/* ── Dot divider ── */}
          <DotDivider />

          {/* ── Let the story continue — card ── */}
          <SectionCard animDelay={40}>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#1a1008",
                marginTop: 0,
                marginBottom: "20px",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}
            >
              Let the story continue…
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "#3d2b1f",
                lineHeight: 1.9,
                margin: 0,
                maxWidth: "600px",
              }}
            >
              If this little surprise brought a smile, a thought, or a feeling
              — let it live beyond this moment. Stories are, after all, meant
              to be shared, seen, and felt in the world around us. However you
              choose to carry this story forward, know that you are always part
              of ours.
            </p>
          </SectionCard>

          {/* ── Signature ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "16px",
            }}
          >
            <div
              style={{
                width: "120px",
                height: 0,
                borderTop: "1px solid rgba(201,168,76,0.2)",
                marginBottom: "32px",
              }}
            />
            <p
              data-animate="fade-up"
              data-delay="400"
              style={{
                opacity: 0,
                transform: "translateY(30px)",
                fontSize: "0.95rem",
                color: "#b5873a",
                fontStyle: "italic",
                letterSpacing: "0.08em",
                margin: 0,
                textAlign: "center",
              }}
            >
              🖋 with warmth, gratitude, and ink — Ritera Publishing
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
