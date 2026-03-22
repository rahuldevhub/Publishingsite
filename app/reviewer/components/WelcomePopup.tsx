"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const POPUP_KEY = "rv_popup_dismissed";

export default function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isIn, setIsIn] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In development, always show the popup so it can be tested
    if (
      process.env.NODE_ENV !== "development" &&
      localStorage.getItem(POPUP_KEY)
    ) {
      return;
    }

    const t = setTimeout(() => {
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsIn(true));
      });
    }, 1000);

    return () => clearTimeout(t);
  }, []);

  function close() {
    setIsIn(false);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem(POPUP_KEY, "1");
    }, 380);
  }

  // Magnetic button: track mouse position on card, pull button toward cursor
  function onCardMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const btn = ctaRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 80) {
      const pull = (80 - dist) / 80;
      btn.style.transform = `translate(${dx * pull * 0.3}px, ${dy * pull * 0.3}px)`;
      btn.style.transition = "transform 0.1s ease";
    } else {
      btn.style.transform = "translate(0, 0)";
      btn.style.transition = "transform 0.3s ease";
    }
  }

  function onCardMouseLeave() {
    const btn = ctaRef.current;
    if (btn) {
      btn.style.transform = "translate(0, 0)";
      btn.style.transition = "transform 0.4s ease";
    }
  }

  if (!isVisible) return null;

  return (
    <div
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        backgroundColor: isIn ? "rgba(20,10,0,0.5)" : "rgba(20,10,0,0)",
        backdropFilter: isIn ? "blur(12px)" : "blur(0px)",
        WebkitBackdropFilter: isIn ? "blur(12px)" : "blur(0px)",
        transition:
          "background-color 0.4s ease, backdrop-filter 0.4s ease, -webkit-backdrop-filter 0.4s ease",
      }}
    >
      {/* Card */}
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={onCardMouseMove}
        onMouseLeave={onCardMouseLeave}
        style={{
          background: "linear-gradient(160deg, #fffdf8 0%, #fdf3e3 100%)",
          border: "1px solid rgba(201,168,76,0.3)",
          borderRadius: "24px",
          padding: "48px 40px",
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
          fontFamily: "Georgia, serif",
          boxShadow:
            "0 32px 64px rgba(0,0,0,0.22), 0 8px 24px rgba(181,135,58,0.1)",
          opacity: isIn ? 1 : 0,
          transform: isIn
            ? "scale(1) translateY(0)"
            : "scale(0.85) translateY(20px)",
          transition:
            "opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Emoji */}
        <div
          style={{ fontSize: "3rem", marginBottom: "18px", lineHeight: 1 }}
        >
          ✨
        </div>

        {/* Headline */}
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "#1a1008",
            marginTop: 0,
            marginBottom: "14px",
            lineHeight: 1.15,
          }}
        >
          You made it.
        </h2>

        {/* Body */}
        <p
          style={{
            fontSize: "0.95rem",
            color: "#5a4030",
            lineHeight: 1.7,
            marginTop: 0,
            marginBottom: "28px",
            maxWidth: "300px",
          }}
        >
          It&apos;s great to have you here — your exclusive content &amp;
          special interview has just been unlocked.
        </p>

        {/* CTA — full-width gold gradient pill with magnetic pull */}
        <Link
          ref={ctaRef}
          href="/contact"
          onClick={() => localStorage.setItem(POPUP_KEY, "1")}
          style={{
            display: "block",
            width: "100%",
            padding: "15px 32px",
            background: "linear-gradient(135deg, #c9a84c, #b5873a)",
            color: "#fff",
            borderRadius: "50px",
            fontWeight: 600,
            fontSize: "0.95rem",
            textDecoration: "none",
            letterSpacing: "0.03em",
            marginBottom: "16px",
            boxShadow: "0 8px 24px rgba(181,135,58,0.38)",
            textAlign: "center",
            transition: "filter 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.filter =
              "brightness(1.12)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.filter =
              "brightness(1)";
          }}
        >
          Register Now
        </Link>

        {/* Dismiss */}
        <button
          onClick={close}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "0.85rem",
            color: "#8a6a3a",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            padding: "4px 8px",
            marginTop: "4px",
            transition: "text-decoration 0.15s",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.textDecoration =
              "underline";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.textDecoration =
              "none";
          }}
        >
          Continue exploring →
        </button>
      </div>
    </div>
  );
}
