"use client";

import { useState, useRef, useEffect } from "react";

const cards = [
  {
    id: "author-story",
    category: "AUTHOR CORNER",
    title: "Listen to what Shahitha says",
    emoji: "📚",
    area: "author",
    image: undefined as string | undefined,
    video: "/landingvideo/shahithavideo.mp4",
    hoverGradient: "linear-gradient(135deg,#0f766e 0%,#134e4a 100%)",
  },
  {
    id: "testimonial",
    category: "TESTIMONIAL",
    title: "Author Signing Event",
    emoji: "⭐",
    area: "testimonial",
    image: "/landingvideo/authorsign.webp",
    video: undefined as string | undefined,
    hoverGradient: "linear-gradient(135deg,#7c3aed 0%,#4c1d95 100%)",
  },
  {
    id: "launch",
    category: "VIRTUAL MEET",
    title: "Monthly author virtual meetup — March 2026",
    emoji: "🚀",
    area: "launch",
    image: "/landingvideo/virtualmeet1.webp",
    video: undefined as string | undefined,
    hoverGradient: "linear-gradient(135deg,#d97706 0%,#92400e 100%)",
    live: false,
  },
  {
    id: "community",
    category: "AUTHOR INTERVIEW",
    title: "Listen to what the Industrial Expert says",
    emoji: "🎙️",
    area: "community",
    image: undefined as string | undefined,
    video: "/landingvideo/v1.mp4",
    hoverGradient: "linear-gradient(135deg,#1d4ed8 0%,#1e1b4b 100%)",
  },
  {
    id: "process",
    category: "WORKSPACE",
    title: "Our Workspace walkthrough",
    emoji: "🎨",
    area: "process",
    image: "/landingvideo/workspace.webp",
    video: undefined as string | undefined,
    hoverGradient: "linear-gradient(135deg,#be185d 0%,#831843 100%)",
  },
  {
    id: "milestone",
    category: "MILESTONE",
    title: "4500 copies sold!",
    emoji: "🏆",
    area: "milestone",
    image: "/images/Jadejulep2.webp",
    video: undefined as string | undefined,
    hoverGradient: "linear-gradient(135deg,#b45309 0%,#78350f 100%)",
  },
];

/** Loads video only when it scrolls into view — prevents loading 8MB of video on page load. */
function LazyVideo({
  src,
  poster,
  style,
}: {
  src: string;
  poster?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setLoaded(true); io.disconnect(); } },
      { threshold: 0.05, rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!loaded || !el) return;
    el.load();
    el.play().catch(() => {});
  }, [loaded]);

  return (
    <video ref={ref} poster={poster} preload="none" loop muted playsInline style={style}>
      {loaded && <source src={src} type="video/mp4" />}
    </video>
  );
}

export default function HeroBentoGrid({ compact = false }: { compact?: boolean }) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <>
      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1.1fr 1fr;
          grid-template-areas:
            "author testimonial launch"
            "author community  community"
            "author process    milestone";
          gap: 10px;
          width: 100%;
          height: 100%;
        }
        .bento-grid.compact {
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: auto auto auto;
          gap: 8px;
        }
        .bento-card-area-author    { grid-area: author; }
        .bento-card-area-testimonial { grid-area: testimonial; }
        .bento-card-area-launch    { grid-area: launch; }
        .bento-card-area-community { grid-area: community; }
        .bento-card-area-process   { grid-area: process; }
        .bento-card-area-milestone { grid-area: milestone; }

        .bento-float-1 { animation: bentoFloat1 6s ease-in-out infinite; }
        .bento-float-2 { animation: bentoFloat2 8s ease-in-out infinite; }
        @keyframes bentoFloat1 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes bentoFloat2 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }

        .bento-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(239,68,68,0.2);
          border: 1px solid rgba(239,68,68,0.35);
          border-radius: 20px;
          padding: 2px 8px;
          font-size: 9px;
          font-weight: 700;
          color: #fca5a5;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          width: fit-content;
          margin-top: 6px;
        }
        .bento-live-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ef4444;
          animation: bento-pulse 1.5s ease-in-out infinite;
        }
        @keyframes bento-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }

        /* Mobile */
        .bento-mobile {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 8px;
        }
        .bento-mobile::-webkit-scrollbar { display: none; }
        .bento-mobile-card {
          flex: 0 0 185px;
          scroll-snap-align: start;
          position: relative;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(15,15,20,0.85);
          backdrop-filter: blur(12px);
          overflow: hidden;
          min-height: 120px;
          transition: transform 0.3s ease;
          cursor: default;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .bento-mobile-card:active { transform: scale(0.97); }
        .bento-mobile-card[data-area="author"]    { flex: 0 0 210px; }
        .bento-mobile-card[data-area="community"] { flex: 0 0 230px; }
      `}</style>

      <div className={`bento-grid${compact ? " compact" : ""}`}>
        {cards.map((card, i) => {
          const isHovered = hoveredCard === card.id;
          const isFloating = i === 0 ? "bento-float-1" : i === 3 ? "bento-float-2" : "";
          const titleSize = compact
            ? (card.area === "author" ? "13px" : "11px")
            : (card.area === "author" ? "15px" : "12px");

          return (
            <div
              key={card.id}
              className={`bento-card-area-${card.area}${isHovered ? "" : ` ${isFloating}`}`}
              data-area={card.area}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                position: "relative",
                borderRadius: "14px",
                border: `1px solid ${isHovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
                background: "rgba(15,15,20,0.85)",
                backdropFilter: "blur(12px)",
                overflow: "hidden",
                cursor: "default",
                minHeight: compact ? "100px" : "120px",
                transform: isHovered ? "scale(1.025)" : undefined,
                boxShadow: isHovered ? "0 12px 40px rgba(0,0,0,0.5)" : "none",
                transition: "transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
              }}
            >
              {/* Layer 0: gradient fallback (behind media) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: card.hoverGradient,
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.4s ease",
                  zIndex: 0,
                }}
              />

              {/* Layer 1: media */}
              {card.video ? (
                <LazyVideo
                  src={card.video}
                  poster={card.image}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: isHovered ? 1 : 0.38,
                    transform: isHovered ? "scale(1.08)" : "scale(1)",
                    transition: "opacity 0.4s ease, transform 0.5s ease",
                    zIndex: 1,
                  }}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={card.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: isHovered ? 1 : 0.35,
                    transform: isHovered ? "scale(1.08)" : "scale(1)",
                    transition: "opacity 0.4s ease, transform 0.5s ease",
                    zIndex: 1,
                  }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              )}

              {/* Layer 2: dark overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 100%)",
                  opacity: isHovered ? 0.15 : 1,
                  transition: "opacity 0.4s ease",
                  zIndex: 2,
                }}
              />

              {/* Layer 3: content at top */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  padding: compact ? "10px" : "14px",
                }}
              >
                {/* Emoji — collapses on hover */}
                <div
                  style={{
                    fontSize: compact ? "22px" : "24px",
                    lineHeight: 1,
                    marginBottom: isHovered ? "0px" : "8px",
                    opacity: isHovered ? 0 : 1,
                    maxHeight: isHovered ? "0px" : "40px",
                    overflow: "hidden",
                    transition: "opacity 0.3s ease, max-height 0.35s ease, margin-bottom 0.35s ease",
                  }}
                >
                  {card.emoji}
                </div>

                {/* Text pill */}
                <div
                  style={{
                    borderRadius: "10px",
                    padding: "10px 14px",
                    background: isHovered ? "rgba(0,0,0,0.72)" : "transparent",
                    backdropFilter: isHovered ? "blur(10px)" : "none",
                    WebkitBackdropFilter: isHovered ? "blur(10px)" : "none",
                    boxShadow: isHovered ? "inset 0 0 0 1px rgba(255,255,255,0.12)" : "none",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                    transition: "background 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease",
                  }}
                >
                  <div
                    style={{
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(251,191,36,0.85)",
                      marginBottom: "4px",
                    }}
                  >
                    {card.category}
                  </div>
                  <div
                    style={{
                      fontSize: titleSize,
                      fontWeight: 700,
                      color: "#f1f5f9",
                      lineHeight: 1.35,
                    }}
                  >
                    {card.title}
                  </div>
                  {card.live && (
                    <div className="bento-live-badge">
                      <div className="bento-live-dot" />
                      Live
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export function HeroBentoGridMobile() {
  return (
    <>
      <style>{`
        .bento-mobile {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 8px;
        }
        .bento-mobile::-webkit-scrollbar { display: none; }
        .bento-mobile-card {
          flex: 0 0 185px;
          scroll-snap-align: start;
          position: relative;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(15,15,20,0.85);
          backdrop-filter: blur(12px);
          overflow: hidden;
          min-height: 120px;
          transition: transform 0.3s ease;
          cursor: default;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .bento-mobile-card:active { transform: scale(0.97); }
        .bento-mobile-card[data-area="author"]    { flex: 0 0 210px; }
        .bento-mobile-card[data-area="community"] { flex: 0 0 230px; }
        .bento-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(239,68,68,0.2);
          border: 1px solid rgba(239,68,68,0.35);
          border-radius: 20px;
          padding: 2px 8px;
          font-size: 9px;
          font-weight: 700;
          color: #fca5a5;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          width: fit-content;
          margin-top: 6px;
        }
        .bento-live-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ef4444;
          animation: bento-pulse 1.5s ease-in-out infinite;
        }
        @keyframes bento-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>

      <div className="bento-mobile">
        {cards.map((card) => (
          <div key={card.id} className="bento-mobile-card" data-area={card.area}>
            {/* Gradient fallback */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: card.hoverGradient,
                opacity: 0.15,
                zIndex: 0,
              }}
            />

            {/* Media */}
            {card.video ? (
              <LazyVideo
                src={card.video}
                poster={card.image}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.35,
                  zIndex: 1,
                }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={card.image}
                alt=""
                loading="lazy"
                decoding="async"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.35,
                  zIndex: 1,
                }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            )}

            {/* Dark overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.65) 100%)",
                zIndex: 2,
              }}
            />

            {/* Text pill — always frosted on mobile */}
            <div style={{ position: "relative", zIndex: 3, padding: "12px" }}>
              <div
                style={{
                  background: "rgba(0,0,0,0.65)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  borderRadius: "10px",
                  padding: "10px 12px",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(251,191,36,0.85)",
                    marginBottom: "4px",
                  }}
                >
                  {card.category}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#f1f5f9",
                    lineHeight: 1.35,
                  }}
                >
                  {card.title}
                </div>
                {card.live && (
                  <div className="bento-live-badge">
                    <div className="bento-live-dot" />
                    Live
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
