"use client";

import { useEffect, useRef, useState } from "react";

const POPUP_KEY = "rv_popup_dismissed";

type View = "welcome" | "form" | "success";

function FloatingButton({ onClick }: { onClick: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "32px",
        left: "50%",
        transform: visible
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(80px)",
        zIndex: 999,
        background: "linear-gradient(135deg, #c9a84c, #b5873a)",
        color: "white",
        fontWeight: 600,
        fontSize: "0.9rem",
        padding: "14px 28px",
        borderRadius: "50px",
        boxShadow: "0 8px 24px rgba(181,135,58,0.4)",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease, transform 0.5s ease",
        fontFamily: "Georgia, serif",
      }}
    >
      ✨ Register for Exclusive Access
    </button>
  );
}

export default function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isIn, setIsIn] = useState(false);
  const [view, setView] = useState<View>("welcome");
  const [contentVisible, setContentVisible] = useState(true);
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);

  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const ctaRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  function dismissWithFloat() {
    setIsIn(false);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem(POPUP_KEY, "1");
      setShowFloatingBtn(true);
    }, 380);
  }

  function transitionTo(newView: View) {
    setContentVisible(false);
    setTimeout(() => {
      setView(newView);
      setContentVisible(true);
    }, 150);
  }

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setSubmitError("");

    let valid = true;
    if (!formName.trim()) {
      setNameError("Name is required");
      valid = false;
    }
    if (!formEmail.trim()) {
      setEmailError("Email is required");
      valid = false;
    }
    if (!valid) return;

    setLoading(true);
    try {
      const res = await fetch("/api/reviewer-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, email: formEmail, phone: formPhone }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setSubmitError("Something went wrong. Please try again.");
      } else {
        transitionTo("success");
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fieldStyle: React.CSSProperties = {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(201,168,76,0.3)",
    background: "rgba(255,255,255,0.8)",
    fontSize: "0.95rem",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "Georgia, serif",
    outline: "none",
    color: "#1a1008",
  };

  const goldPillBtn: React.CSSProperties = {
    display: "block",
    width: "100%",
    padding: "15px 32px",
    background: "linear-gradient(135deg, #c9a84c, #b5873a)",
    color: "#fff",
    borderRadius: "50px",
    fontWeight: 600,
    fontSize: "0.95rem",
    border: "none",
    cursor: "pointer",
    letterSpacing: "0.03em",
    boxShadow: "0 8px 24px rgba(181,135,58,0.38)",
    textAlign: "center",
    fontFamily: "Georgia, serif",
    transition: "filter 0.2s ease",
  };

  return (
    <>
      {showFloatingBtn && (
        <FloatingButton
          onClick={() => {
            setShowFloatingBtn(false);
            localStorage.removeItem(POPUP_KEY);
            setView("form");
            setContentVisible(true);
            setIsVisible(true);
            requestAnimationFrame(() => {
              requestAnimationFrame(() => setIsIn(true));
            });
          }}
        />
      )}

      {isVisible && (
        <div
          onClick={dismissWithFloat}
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
            onMouseMove={view === "welcome" ? onCardMouseMove : undefined}
            onMouseLeave={view === "welcome" ? onCardMouseLeave : undefined}
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
            {/* Content wrapper with fade transition */}
            <div
              style={{
                opacity: contentVisible ? 1 : 0,
                transition: "opacity 0.15s ease",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* ── WELCOME VIEW ── */}
              {view === "welcome" && (
                <>
                  <div
                    style={{ fontSize: "3rem", marginBottom: "18px", lineHeight: 1 }}
                  >
                    ✨
                  </div>

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

                  <button
                    ref={ctaRef}
                    onClick={() => transitionTo("form")}
                    style={{ ...goldPillBtn, marginBottom: "16px" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.filter =
                        "brightness(1.12)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.filter =
                        "brightness(1)";
                    }}
                  >
                    Register Now
                  </button>

                  <button
                    onClick={dismissWithFloat}
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
                </>
              )}

              {/* ── FORM VIEW ── */}
              {view === "form" && (
                <div style={{ width: "100%", textAlign: "left" }}>
                  <button
                    onClick={() => transitionTo("welcome")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      color: "#8a6a3a",
                      fontFamily: "Georgia, serif",
                      padding: 0,
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    ← Back
                  </button>

                  <h2
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "#1a1008",
                      marginTop: 0,
                      marginBottom: "8px",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    Let&apos;s get you registered
                  </h2>

                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#5a4030",
                      marginTop: 0,
                      marginBottom: "20px",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    We&apos;ll be in touch with your exclusive content.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      width: "100%",
                    }}
                  >
                    <div>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        style={fieldStyle}
                        onFocus={(e) => {
                          e.currentTarget.style.outline =
                            "2px solid rgba(201,168,76,0.5)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.outline = "none";
                        }}
                      />
                      {nameError && (
                        <p
                          style={{
                            color: "red",
                            fontSize: "0.78rem",
                            margin: "4px 0 0",
                            fontFamily: "Georgia, serif",
                          }}
                        >
                          {nameError}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Your email address"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        style={fieldStyle}
                        onFocus={(e) => {
                          e.currentTarget.style.outline =
                            "2px solid rgba(201,168,76,0.5)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.outline = "none";
                        }}
                      />
                      {emailError && (
                        <p
                          style={{
                            color: "red",
                            fontSize: "0.78rem",
                            margin: "4px 0 0",
                            fontFamily: "Georgia, serif",
                          }}
                        >
                          {emailError}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="tel"
                        placeholder="Your phone number (optional)"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        style={fieldStyle}
                        onFocus={(e) => {
                          e.currentTarget.style.outline =
                            "2px solid rgba(201,168,76,0.5)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.outline = "none";
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        ...goldPillBtn,
                        marginTop: "4px",
                        opacity: loading ? 0.7 : 1,
                        cursor: loading ? "not-allowed" : "pointer",
                      }}
                    >
                      {loading ? "Sending..." : "Send ✨"}
                    </button>

                    {submitError && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "0.85rem",
                          margin: "4px 0 0",
                          textAlign: "center",
                          fontFamily: "Georgia, serif",
                        }}
                      >
                        {submitError}
                      </p>
                    )}
                  </form>
                </div>
              )}

              {/* ── SUCCESS VIEW ── */}
              {view === "success" && (
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{ fontSize: "3rem", marginBottom: "18px", lineHeight: 1 }}
                  >
                    ✅
                  </div>

                  <h2
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: "#1a1008",
                      marginTop: 0,
                      marginBottom: "14px",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    You&apos;re in!
                  </h2>

                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#5a4030",
                      marginTop: 0,
                      marginBottom: "28px",
                      fontFamily: "Georgia, serif",
                      lineHeight: 1.6,
                    }}
                  >
                    We&apos;ll reach out to {formEmail} — watch your inbox.
                  </p>

                  <button
                    onClick={dismissWithFloat}
                    style={goldPillBtn}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.filter =
                        "brightness(1.12)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.filter =
                        "brightness(1)";
                    }}
                  >
                    Continue exploring →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
