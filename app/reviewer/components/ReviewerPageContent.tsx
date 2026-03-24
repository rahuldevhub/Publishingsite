"use client";

import { useEffect, useRef, useState } from "react";

const GOLD = "#b5873a";
const GOLD_LIGHT = "rgba(201,168,76,0.15)";
const PAGE_BG = "#faf6f0";

const NOISE_URL =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">` +
      `<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" ` +
      `numOctaves="4" stitchTiles="stitch"/></filter>` +
      `<rect width="100%" height="100%" filter="url(#n)" opacity="0.4"/></svg>`
  );

const KEYFRAMES = `
  @keyframes rv-rotate-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes rv-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes rv-draw-line {
    from { width: 0px; }
    to   { width: 48px; }
  }
  @keyframes rv-draw-line-80 {
    from { width: 0px; }
    to   { width: 80px; }
  }
  @keyframes rv-shimmer-text {
    0%, 100% { letter-spacing: 0.01em; color: #b5873a; }
    50%       { letter-spacing: 0.06em; color: #d4a855; text-shadow: 0 0 20px rgba(181,135,58,0.4); }
  }
  @keyframes rv-particle-float {
    0%   { transform: translateY(0px); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(-100vh); opacity: 0; }
  }
  @keyframes rv-name-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.72; }
  }
  @keyframes rv-welcome-in {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes rv-name-in {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes rv-ink-drop {
    0%   { opacity: 0; transform: translateY(0px); }
    40%  { opacity: 1; transform: translateY(20px); }
    100% { opacity: 0; transform: translateY(20px); }
  }
  @keyframes rv-aurora1 {
    0%   { transform: translate(0, 0) scale(1); }
    50%  { transform: translate(60px, 40px) scale(1.08); }
    100% { transform: translate(0, 0) scale(1); }
  }
  @keyframes rv-aurora2 {
    0%   { transform: translate(0, 0) scale(1); }
    50%  { transform: translate(-50px, -60px) scale(1.05); }
    100% { transform: translate(0, 0) scale(1); }
  }
  @keyframes rv-aurora3 {
    0%   { transform: translate(0, 0); }
    33%  { transform: translate(-80px, 50px); }
    66%  { transform: translate(60px, -40px); }
    100% { transform: translate(0, 0); }
  }
  @keyframes rv-sparkle-out {
    0%   { opacity: 1; transform: translate(0, 0) scale(1); }
    100% { opacity: 0; transform: var(--sparkle-end) scale(0); }
  }
  @keyframes rv-confetti-fall {
    0%   { opacity: 1; transform: translateY(-20px) rotate(0deg); }
    100% { opacity: 0; transform: translateY(40px) rotate(var(--confetti-rotate)); }
  }
  @keyframes rv-breathe {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.03); }
  }
`;

const PARTICLES = [
  { size: 5, left: "15px",    right: undefined, bottomPct: 15, delay: 0,   dur: 13, opacity: 0.15 },
  { size: 4, left: "50px",    right: undefined, bottomPct: 42, delay: 3,   dur: 16, opacity: 0.12 },
  { size: 7, left: "28px",    right: undefined, bottomPct: 65, delay: 6,   dur: 11, opacity: 0.18 },
  { size: 5, left: undefined, right: "15px",    bottomPct: 25, delay: 1.5, dur: 14, opacity: 0.14 },
  { size: 4, left: undefined, right: "55px",    bottomPct: 52, delay: 4,   dur: 12, opacity: 0.12 },
  { size: 6, left: undefined, right: "32px",    bottomPct: 10, delay: 7,   dur: 15, opacity: 0.16 },
];

const SPARKLE_DIRS = [
  { x: -35, y: -30 },
  { x: 35,  y: -30 },
  { x: -25, y: 20  },
  { x: 25,  y: 20  },
  { x: 0,   y: -40 },
];

const CONFETTI_PIECES = [
  { x: -50, color: "#c9a84c", rotate: "30deg"  },
  { x: -30, color: "#e8b4a0", rotate: "-45deg" },
  { x: -10, color: "#fdf8f0", rotate: "60deg"  },
  { x: 10,  color: "#c9a84c", rotate: "-30deg" },
  { x: 30,  color: "#e8b4a0", rotate: "90deg"  },
  { x: 50,  color: "#fdf8f0", rotate: "-60deg" },
  { x: -20, color: "#c9a84c", rotate: "45deg"  },
  { x: 20,  color: "#e8b4a0", rotate: "-90deg" },
];

const STATS = [
  { target: 500,  suffix: "+", label: "Books Published"  },
  { target: 1200, suffix: "+", label: "Happy Authors"    },
  { target: 12,   suffix: "+", label: "Years of Stories" },
];

const SUBTITLE = "If you are here, this page was meant only for you.";

// ── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref     = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const steps = 40;
        const stepVal = target / steps;
        let current = 0;
        const iv = setInterval(() => {
          current += stepVal;
          if (current >= target) { setCount(target); clearInterval(iv); }
          else setCount(Math.floor(current));
        }, 1500 / steps);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── 3D Flip Benefit Card ──────────────────────────────────────────────────────
function BenefitCard({
  icon, text, animDelay, isMobile,
}: {
  icon: string; text: string; animDelay: number; isMobile: boolean;
}) {
  const cardRef        = useRef<HTMLDivElement>(null);
  const shineRef       = useRef<HTMLDivElement>(null);
  const borderGlowRef  = useRef<HTMLDivElement>(null);
  const borderAngle    = useRef(0);
  const borderInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const observed       = useRef(false);

  // Flip-in + pulse glow
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || observed.current) return;
        observed.current = true;
        setTimeout(() => {
          if (isMobile) {
            el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
            el.style.opacity = "1";
            el.style.transform = "none";
          } else {
            el.style.transition =
              "opacity 0.5s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)";
            el.style.opacity = "1";
            el.style.transform = "perspective(600px) rotateY(0deg)";
            // Pulse glow after flip completes
            setTimeout(() => {
              el.style.boxShadow = "0 0 0 4px rgba(201,168,76,0.3), 0 2px 8px rgba(0,0,0,0.04)";
              setTimeout(() => {
                el.style.transition = "box-shadow 0.6s ease";
                el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
              }, 100);
            }, 500);
          }
        }, animDelay);
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animDelay, isMobile]);

  // Cleanup liquid border interval on unmount
  useEffect(() => {
    return () => {
      if (borderInterval.current) clearInterval(borderInterval.current);
    };
  }, []);

  function startBorder() {
    if (isMobile) return;
    if (borderInterval.current) clearInterval(borderInterval.current);
    borderInterval.current = setInterval(() => {
      borderAngle.current = (borderAngle.current + 3) % 360;
      const bg = borderGlowRef.current;
      if (bg) {
        bg.style.background = `conic-gradient(from ${borderAngle.current}deg, transparent 0deg, rgba(201,168,76,0.6) 60deg, transparent 120deg)`;
        bg.style.opacity = "1";
      }
    }, 16);
  }

  function stopBorder() {
    if (borderInterval.current) { clearInterval(borderInterval.current); borderInterval.current = null; }
    const bg = borderGlowRef.current;
    if (bg) bg.style.opacity = "0";
  }

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isMobile) return;
    const el    = cardRef.current;
    const shine = shineRef.current;
    if (!el) return;
    const rect  = el.getBoundingClientRect();
    const mx    = e.clientX - rect.left;
    const my    = e.clientY - rect.top;
    const cx    = rect.width / 2;
    const cy    = rect.height / 2;
    const nx    = (mx - cx) / cx;
    const ny    = (my - cy) / cy;

    el.style.transition = "transform 0.1s ease, box-shadow 0.1s ease";
    el.style.transform  = `perspective(600px) rotateX(${-ny * 12}deg) rotateY(${nx * 12}deg) translateY(-8px)`;
    el.style.boxShadow  = "0 20px 40px rgba(0,0,0,0.10), 0 0 0 1px rgba(201,168,76,0.4)";

    if (shine) {
      shine.style.background = `radial-gradient(circle at ${mx}px ${my}px, rgba(201,168,76,0.12) 0%, transparent 60%)`;
      shine.style.opacity = "1";
    }
  }

  function onMouseLeave() {
    if (isMobile) return;
    const el    = cardRef.current;
    const shine = shineRef.current;
    if (el) {
      el.style.transition = "transform 0.5s ease, box-shadow 0.5s ease";
      el.style.transform  = "perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0)";
      el.style.boxShadow  = "0 2px 8px rgba(0,0,0,0.04)";
    }
    if (shine) shine.style.opacity = "0";
    stopBorder();
  }

  return (
    /* Liquid border wrapper */
    <div style={{ position: "relative", borderRadius: "16px", padding: "1px" }}>
      {/* Rotating conic border — shown only on hover */}
      <div
        ref={borderGlowRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "16px",
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
          background: `conic-gradient(from 0deg, transparent 0deg, rgba(201,168,76,0.6) 60deg, transparent 120deg)`,
        }}
      />
      {/* Actual card */}
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={startBorder}
        onMouseLeave={onMouseLeave}
        style={{
          opacity: 0,
          transform: isMobile
            ? "translateY(20px)"
            : "perspective(600px) rotateY(90deg)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          background: "linear-gradient(135deg, #ffffff 0%, #fdf8f0 100%)",
          border: `1px solid ${GOLD_LIGHT}`,
          borderRadius: "15px",
          padding: "28px 24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          cursor: "default",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Torch glow layer */}
        <div
          ref={shineRef}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            transition: "opacity 0.15s ease",
            pointerEvents: "none",
            borderRadius: "15px",
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

// ── Section card wrapper — slides in from specified direction ─────────────────
function SectionCard({
  children,
  animDelay = 0,
  slideFrom = "up",
}: {
  children: React.ReactNode;
  animDelay?: number;
  slideFrom?: "left" | "right" | "up";
}) {
  const initialTransform =
    slideFrom === "left"  ? "translateX(-60px)" :
    slideFrom === "right" ? "translateX(60px)"  :
                            "translateY(60px)";

  return (
    <div
      data-animate="slide-in"
      data-delay={animDelay}
      style={{
        opacity: 0,
        transform: initialTransform,
        background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(253,248,240,0.5) 100%)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderRadius: "24px",
        padding: "48px 52px",
        border: "1px solid rgba(201,168,76,0.2)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
        marginBottom: "80px",
      }}
    >
      {children}
    </div>
  );
}

// ── Stats row ─────────────────────────────────────────────────────────────────
function StatsRow() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "40px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {STATS.map((stat, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            textAlign: "center",
            borderRight: i < STATS.length - 1 ? "1px solid rgba(201,168,76,0.2)" : "none",
            padding: "0 16px",
          }}
        >
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "#c9a84c", lineHeight: 1.2 }}>
            {visible ? <AnimatedCounter target={stat.target} suffix={stat.suffix} /> : `0${stat.suffix}`}
          </div>
          <div style={{ fontSize: "0.8rem", color: "#5a4030", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "6px" }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ReviewerPageContent({ displayName }: { displayName: string }) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const heroRef       = useRef<HTMLDivElement>(null);
  const aurora1Ref    = useRef<HTMLDivElement>(null);
  const aurora2Ref    = useRef<HTMLDivElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);
  const signatureRef  = useRef<HTMLDivElement>(null);
  const sigObserved   = useRef(false);
  const luminousEls   = useRef<HTMLElement[]>([]);

  // Cursor + scroll tracking refs (no re-renders)
  const mouseX     = useRef(0);
  const mouseY     = useRef(0);
  const scrollYVal = useRef(0);

  const [heroReady,       setHeroReady]       = useState(false);
  const [inkDrop,         setInkDrop]         = useState(false);
  const [labelVisible,    setLabelVisible]    = useState(false);
  const [welcomeIn,       setWelcomeIn]       = useState(false);
  const [nameIn,          setNameIn]          = useState(false);
  const [typewriterChars, setTypewriterChars] = useState(0);
  const [thankYouVisible, setThankYouVisible] = useState(false);
  const [showSparkle,     setShowSparkle]     = useState(false);
  const [showConfetti,    setShowConfetti]    = useState(false);
  const [isMobile,        setIsMobile]        = useState(false);

  // Detect mobile after mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // 1 — inject keyframes
  useEffect(() => {
    if (document.querySelector("style[data-rv3]")) { setHeroReady(true); return; }
    const tag = document.createElement("style");
    tag.setAttribute("data-rv3", "1");
    tag.textContent = KEYFRAMES;
    document.head.appendChild(tag);
    setHeroReady(true);
    return () => { document.querySelector("style[data-rv3]")?.remove(); };
  }, []);

  // 2 — hero entrance sequence
  useEffect(() => {
    if (!heroReady) return;
    setInkDrop(true);
    const t1 = setTimeout(() => { setInkDrop(false); setLabelVisible(true); }, 500);
    const t2 = setTimeout(() => setWelcomeIn(true), 800);
    const t3 = setTimeout(() => setNameIn(true), 1000);
    const t4 = setTimeout(() => {
      if (window.innerWidth < 768) { setTypewriterChars(SUBTITLE.length); return; }
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setTypewriterChars(i);
        if (i >= SUBTITLE.length) clearInterval(iv);
      }, 35);
    }, 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [heroReady]);

  // 3 — aurora transform helper (cursor + scroll combined)
  function updateAuroras() {
    const a1 = aurora1Ref.current;
    const a2 = aurora2Ref.current;
    const mx = mouseX.current;
    const my = mouseY.current;
    const sy = scrollYVal.current;
    if (a1) a1.style.transform = `translateX(${mx * 0.02}px) translateY(${my * 0.02 - sy * 0.1}px)`;
    if (a2) a2.style.transform = `translateX(${-mx * 0.015}px) translateY(${-my * 0.015 + sy * 0.08}px)`;
  }

  // 4 — scroll listener: progress + parallax + para opacity + auroras
  useEffect(() => {
    const progress = progressRef.current;
    console.log("[ReviewerPage] scroll listener attached");

    function onScroll() {
      const y    = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;

      // Progress bar
      if (progress) progress.style.width = `${Math.min((y / Math.max(docH, 1)) * 100, 100)}%`;

      if (window.innerWidth <= 768) return;

      // Hero parallax — content lags at 0.5x scroll speed
      const hero = heroRef.current;
      if (hero) hero.style.transform = `translateY(${y * 0.5}px)`;

      // Auroras
      scrollYVal.current = y;
      updateAuroras();

      // Paragraph luminous opacity
      const centerY = window.innerHeight / 2;
      luminousEls.current.forEach((el) => {
        const rect   = el.getBoundingClientRect();
        const elMid  = rect.top + rect.height / 2;
        const dist   = Math.abs(elMid - centerY) / (window.innerHeight / 2);
        el.style.opacity = String(Math.max(0.4, 1 - dist * 0.6));
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 5 — cursor-reactive auroras (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    function onMouseMove(e: MouseEvent) {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      updateAuroras();
    }

    container.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => container.removeEventListener("mousemove", onMouseMove);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  // 6 — IntersectionObserver: fade-up + slide-in + luminous paragraphs
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = Array.from(container.querySelectorAll<HTMLElement>("[data-animate]"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el    = entry.target as HTMLElement;
          const delay = parseInt(el.dataset.delay ?? "0", 10);
          const type  = el.dataset.animate;

          setTimeout(() => {
            const dur = "0.7s cubic-bezier(0.25,0.46,0.45,0.94)";

            if (type === "fade-up") {
              el.style.transition = `opacity ${dur}, transform ${dur}`;
              el.style.opacity    = "1";
              el.style.transform  = "translateY(0)";
              if (el.dataset.para)       luminousEls.current.push(el);
              if (el.dataset.hasThankyou === "1") {
                setTimeout(() => {
                  setThankYouVisible(true);
                  setShowSparkle(true);
                  setTimeout(() => setShowSparkle(false), 800);
                }, 750);
              }
            } else if (type === "slide-in") {
              el.style.transition = `opacity ${dur}, transform ${dur}`;
              el.style.opacity    = "1";
              el.style.transform  = "translate(0, 0)";
            }
          }, delay);

          io.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // 7 — Signature confetti observer
  useEffect(() => {
    const el = signatureRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || sigObserved.current) return;
        sigObserved.current = true;
        setTimeout(() => {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 1400);
        }, 500);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ minHeight: "100vh", position: "relative", background: PAGE_BG, fontFamily: "Georgia, serif" }}
    >
      {/* ── Scroll progress bar ── */}
      <div
        ref={progressRef}
        style={{
          position: "fixed", top: 0, left: 0, height: "4px", width: "0%",
          background: "linear-gradient(90deg, #c9a84c, #e8c96a, #c9a84c)",
          boxShadow: "0 0 8px rgba(201,168,76,0.6)", zIndex: 1000, pointerEvents: "none",
        }}
      />

      {/* ── Ink paper texture overlay ── */}
      <div
        aria-hidden
        style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          background: `url("${NOISE_URL}")`,
          opacity: 0.035,
          mixBlendMode: "multiply",
        }}
      />

      {/* ── Aurora background (desktop only) ── */}
      {!isMobile && (
        /* Breathing container */
        <div
          aria-hidden
          style={{
            position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
            animation: "rv-breathe 8s ease-in-out infinite",
          }}
        >
          {/* Aurora 1 wrapper — cursor+scroll offset */}
          <div
            ref={aurora1Ref}
            style={{
              position: "absolute", top: "5%", right: "10%",
              width: "400px", height: "200px",
              transition: "transform 0.8s ease",
            }}
          >
            <div
              style={{
                width: "100%", height: "100%", borderRadius: "50%",
                background: "rgba(201,168,76,0.08)", filter: "blur(60px)",
                animation: "rv-aurora1 20s ease-in-out infinite",
              }}
            />
          </div>

          {/* Aurora 2 wrapper */}
          <div
            ref={aurora2Ref}
            style={{
              position: "absolute", bottom: "10%", left: "5%",
              width: "400px", height: "200px",
              transition: "transform 0.8s ease",
            }}
          >
            <div
              style={{
                width: "100%", height: "100%", borderRadius: "50%",
                background: "rgba(180,80,60,0.05)", filter: "blur(60px)",
                animation: "rv-aurora2 26s ease-in-out infinite",
              }}
            />
          </div>

          {/* Aurora 3 — no cursor tracking, pure CSS */}
          <div
            style={{
              position: "absolute", top: "40%", left: "30%",
              width: "400px", height: "200px", borderRadius: "50%",
              background: "rgba(80,140,100,0.04)", filter: "blur(60px)",
              animation: "rv-aurora3 32s ease-in-out infinite",
            }}
          />
        </div>
      )}

      {/* ── Decorative rotating glyph ── */}
      <div
        aria-hidden
        style={{
          position: "fixed", top: "10%", right: "-80px",
          fontSize: "400px", color: "#b5873a", opacity: 0.06,
          fontFamily: "serif", lineHeight: 1,
          animation: "rv-rotate-slow 60s linear infinite",
          transformOrigin: "center", pointerEvents: "none", zIndex: 0, userSelect: "none",
        }}
      >
        ✦
      </div>

      {/* ── Bottom vignette ── */}
      <div
        aria-hidden
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, height: "300px",
          background: "radial-gradient(ellipse at bottom center, rgba(180,100,60,0.05), transparent)",
          pointerEvents: "none", zIndex: 0,
        }}
      />

      {/* ── Floating gold particles ── */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          aria-hidden
          style={{
            position: "fixed", bottom: `${p.bottomPct}%`,
            ...(p.left ? { left: p.left } : {}),
            ...(p.right ? { right: p.right } : {}),
            width: `${p.size}px`, height: `${p.size}px`,
            borderRadius: "50%",
            background: "radial-gradient(circle, #e8c96a, #b5873a)",
            opacity: p.opacity,
            animation: `rv-particle-float ${p.dur}s ${p.delay}s ease-in infinite`,
            pointerEvents: "none", zIndex: 0,
          }}
        />
      ))}

      {/* ══════════════════════════════════════════════════════════════
          HERO — normal flow with 0.5x parallax on heroRef content
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          overflow: "visible",
          paddingTop: "60px",
          paddingBottom: "60px",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        <div
          ref={heroRef}
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            width: "100%",
            position: "relative",
            willChange: "transform",
          }}
        >
          {/* Ink drop */}
          {inkDrop && (
            <div aria-hidden style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
              <div
                style={{
                  width: "12px", height: "12px", borderRadius: "50%",
                  background: "#c9a84c", animation: "rv-ink-drop 0.4s ease forwards",
                }}
              />
            </div>
          )}

          {/* Label with flanking gold lines */}
          {labelVisible && (
            <div
              style={{
                display: "flex", alignItems: "center", gap: "16px",
                marginBottom: "20px", animation: "rv-fade-in 0.4s ease both",
              }}
            >
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #c9a84c)" }} />
              <span
                style={{
                  fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.25em",
                  textTransform: "uppercase", color: "#c9a84c", whiteSpace: "nowrap",
                }}
              >
                A NOTE, JUST FOR YOU
              </span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
            </div>
          )}

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(3.5rem, 9vw, 6rem)", fontWeight: 800,
              color: "#1a1008", lineHeight: 1.05,
              marginTop: 0, marginBottom: 0, letterSpacing: "-0.02em",
            }}
          >
            <span
              style={{
                display: "block",
                opacity: welcomeIn ? 1 : 0,
                animation: welcomeIn ? "rv-welcome-in 0.7s cubic-bezier(0.22,1,0.36,1) both" : undefined,
              }}
            >
              Welcome,
            </span>
            <span
              style={{
                display: "block",
                opacity: nameIn ? 1 : 0,
                animation: nameIn ? "rv-name-in 0.7s 0.2s cubic-bezier(0.22,1,0.36,1) both" : undefined,
              }}
            >
              <span
                style={{
                  color: "#c9a84c",
                  animation: nameIn ? "rv-name-pulse 3s 1.2s ease-in-out infinite" : undefined,
                }}
              >
                {displayName}
              </span>{" "}✨
            </span>
          </h1>

          {/* Gold underline — draws 0 → 80px */}
          <div
            style={{
              height: "3px",
              background: "linear-gradient(90deg, #c9a84c, transparent)",
              marginTop: "16px", marginBottom: "24px",
              width: welcomeIn ? undefined : 0,
              animation: welcomeIn
                ? "rv-draw-line-80 0.5s 0.6s cubic-bezier(0.22,1,0.36,1) both"
                : undefined,
            }}
          />

          {/* Subtitle — typewriter on desktop */}
          <p
            style={{
              fontSize: "1.1rem", color: "#6b5040", fontStyle: "italic",
              marginTop: 0, marginBottom: "40px", lineHeight: 1.8, minHeight: "2em",
            }}
          >
            {isMobile ? (
              <span style={{ opacity: typewriterChars > 0 ? 1 : 0, transition: "opacity 0.6s ease" }}>
                {SUBTITLE}
              </span>
            ) : (
              SUBTITLE.split("").map((char, i) => (
                <span key={i} style={{ opacity: i < typewriterChars ? 1 : 0, transition: "opacity 0.05s ease" }}>
                  {char}
                </span>
              ))
            )}
          </p>

          {/* Hero divider */}
          <div
            style={{
              height: "2px",
              background: `linear-gradient(90deg, ${GOLD}, rgba(181,135,58,0.3))`,
              width: heroReady ? undefined : 0,
              animation: heroReady ? "rv-draw-line 0.6s 1s cubic-bezier(0.22,1,0.36,1) both" : undefined,
            }}
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          CONTENT — solid background (zIndex 5) covers hero on scroll
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          backgroundColor: PAGE_BG,
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
            data-para="1"
            style={{
              opacity: 0, transform: "translateY(24px)",
              fontSize: "1.05rem", color: "#3d2b1f",
              lineHeight: 1.9, marginTop: 0, marginBottom: "80px", maxWidth: "680px",
            }}
          >
            Some readers read books. Some live them. And a rare few, like you,
            help stories travel beyond pages, beyond shelves, and into hearts.
            Your presence in the literary world is not just noticed — it is
            felt. Every post, every reflection, every quiet moment you spend
            with a book becomes a bridge, connecting stories to new readers,
            new conversations, and new life. Today, we simply wanted to pause
            and say:{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <span
                style={{
                  color: GOLD, fontWeight: "bold",
                  animation: thankYouVisible
                    ? "rv-shimmer-text 3s 0.3s ease-in-out infinite"
                    : undefined,
                }}
              >
                thank you.
              </span>
              {/* Underline draw */}
              <span
                style={{
                  position: "absolute", bottom: "-2px", left: 0,
                  height: "1.5px", background: GOLD,
                  width: thankYouVisible ? "100%" : "0%",
                  transition: thankYouVisible ? "width 0.6s 0.2s ease" : undefined,
                }}
              />
              {/* Sparkle burst */}
              {showSparkle && SPARKLE_DIRS.map((dir, i) => (
                <span
                  key={i}
                  aria-hidden
                  style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: "4px", height: "4px", borderRadius: "50%",
                    background: "#c9a84c", pointerEvents: "none",
                    "--sparkle-end": `translate(${dir.x}px, ${dir.y}px)`,
                    animation: `rv-sparkle-out 0.6s ${i * 0.05}s ease-out forwards`,
                  } as React.CSSProperties}
                />
              ))}
            </span>
          </p>

          {/* ── Your place in our story — slides from LEFT ── */}
          <SectionCard slideFrom="left">
            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1a1008", marginTop: 0, marginBottom: "20px", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              Your place in our story
            </h2>
            <p
              data-para="1"
              style={{ fontSize: "1.05rem", color: "#3d2b1f", lineHeight: 1.9, margin: 0, maxWidth: "600px" }}
            >
              You are now a cherished part of our extended literary circle — a
              space built not just on books, but on shared passion, trust, and
              the magic of storytelling.
            </p>
          </SectionCard>

          {/* ── For our favourite reviewer — slides from RIGHT ── */}
          <SectionCard animDelay={40} slideFrom="right">
            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1a1008", marginTop: 0, marginBottom: "28px", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              For our favourite reviewer
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px", alignItems: "stretch",
              }}
            >
              <BenefitCard icon="📖" text="Early glimpses into upcoming stories"          animDelay={0}   isMobile={isMobile} />
              <BenefitCard icon="🎁" text="Quiet surprises meant only for you"           animDelay={150} isMobile={isMobile} />
              <BenefitCard icon="✉️" text="Invitations to special literary moments"      animDelay={300} isMobile={isMobile} />
              <BenefitCard icon="🌿" text="A closer connection with our publishing journey" animDelay={450} isMobile={isMobile} />
            </div>
          </SectionCard>

          {/* ── Cinematic blockquote ── */}
          <blockquote
            data-animate="fade-up"
            data-para="1"
            style={{
              opacity: 0, transform: "translateY(30px)",
              borderLeft: "none", paddingLeft: 0,
              margin: "0 0 48px 0", position: "relative",
            }}
          >
            <span
              style={{
                fontSize: "80px", color: "rgba(201,168,76,0.15)",
                lineHeight: 0, display: "block", marginBottom: "-20px",
                fontFamily: "Georgia, serif",
              }}
            >
              &ldquo;
            </span>
            <p
              style={{
                fontSize: "1.2rem", fontStyle: "italic",
                color: "#7a5c3a", letterSpacing: "0.02em",
                lineHeight: 1.8, margin: 0,
              }}
            >
              Because stories grow stronger when they travel through voices like yours.
            </p>
            <span
              style={{
                fontSize: "80px", color: "rgba(201,168,76,0.15)",
                lineHeight: 0, display: "block", marginTop: "10px",
                textAlign: "right", fontFamily: "Georgia, serif",
              }}
            >
              &rdquo;
            </span>
          </blockquote>

          {/* ── Stats ── */}
          <StatsRow />

          {/* ── Dot divider ── */}
          <DotDivider />

          {/* ── Let the story continue — slides up ── */}
          <SectionCard animDelay={40} slideFrom="up">
            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1a1008", marginTop: 0, marginBottom: "20px", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              Let the story continue…
            </h2>
            <p
              data-para="1"
              style={{ fontSize: "1.05rem", color: "#3d2b1f", lineHeight: 1.9, margin: 0, maxWidth: "600px" }}
            >
              If this little surprise brought a smile, a thought, or a feeling
              — let it live beyond this moment. Stories are, after all, meant
              to be shared, seen, and felt in the world around us. However you
              choose to carry this story forward, know that you are always part
              of ours.
            </p>
          </SectionCard>

          {/* ── Signature ── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "16px" }}>
            <div style={{ width: "120px", height: 0, borderTop: "1px solid rgba(201,168,76,0.2)", marginBottom: "32px" }} />
            <div ref={signatureRef} style={{ position: "relative" }}>
              {/* Confetti */}
              {showConfetti && CONFETTI_PIECES.map((piece, i) => (
                <span
                  key={i}
                  aria-hidden
                  style={{
                    position: "absolute", top: 0, left: "50%",
                    width: "4px", height: "4px",
                    background: piece.color, borderRadius: "1px",
                    pointerEvents: "none", marginLeft: `${piece.x}px`,
                    "--confetti-rotate": piece.rotate,
                    animation: `rv-confetti-fall 1.2s ${i * 0.08}s ease-in forwards`,
                  } as React.CSSProperties}
                />
              ))}
              <p
                data-animate="fade-up"
                data-delay="400"
                style={{
                  opacity: 0, transform: "translateY(30px)",
                  fontSize: "0.95rem", color: "#b5873a",
                  fontStyle: "italic", letterSpacing: "0.08em",
                  margin: 0, textAlign: "center",
                }}
              >
                🖋 with warmth, gratitude, and ink — Ritera Publishing
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
