"use client";

import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    quote:
      "I submitted my poem on a Tuesday. It was live by Wednesday. Seeing my name on a published page felt unreal.",
    author: "Priya R., Chennai",
  },
  {
    quote:
      "I've been writing on Wattpad for 2 years but never felt like a real author. Litspace gave me that.",
    author: "Aryan S., Pune",
  },
  {
    quote:
      "Submitted my short story at night. Got the notification next morning. Shared it on Instagram and my friends couldn't believe I was published.",
    author: "Meera K., Hyderabad",
  },
  {
    quote:
      "I write poems in Tamil and translate them to English. This is the first platform that published my work without any judgement.",
    author: "Karthik V., Coimbatore",
  },
  {
    quote:
      "Honestly thought no one would care about my writing. Now I have a link I can share anywhere.",
    author: "Nisha T., Delhi",
  },
];

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function advance(to?: number) {
    setVisible(false);
    setTimeout(() => {
      setActive((prev) => (to !== undefined ? to : (prev + 1) % testimonials.length));
      setVisible(true);
    }, 300);
  }

  function startTimer() {
    timerRef.current = setInterval(() => advance(), 3000);
  }

  function stopTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
  }

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, []);

  const t = testimonials[active];

  return (
    <div
      className="bg-gray-50 rounded-2xl border border-gray-200 p-5"
      style={{ borderLeft: "4px solid #F26522" }}
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    >
      <div
        style={{
          transition: "opacity 0.3s ease",
          opacity: visible ? 1 : 0,
          minHeight: "5rem",
        }}
      >
        <p className="text-sm text-gray-700 leading-relaxed italic mb-3">
          &ldquo;{t.quote}&rdquo;
        </p>
        <p className="text-xs font-semibold text-gray-500">— {t.author}</p>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-1.5 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => { stopTimer(); advance(i); startTimer(); }}
            aria-label={`Testimonial ${i + 1}`}
            className="w-1.5 h-1.5 rounded-full transition-colors"
            style={{ backgroundColor: i === active ? "#F26522" : "#d1d5db" }}
          />
        ))}
      </div>
    </div>
  );
}
