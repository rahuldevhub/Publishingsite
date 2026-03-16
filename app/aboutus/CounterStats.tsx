"use client";

import { useState, useEffect, useRef } from "react";

const STATS = [
  { value: 500, suffix: "+", label: "Books Published" },
  { value: 100, suffix: "%", label: "Author Royalties" },
  { value: 50,  suffix: "+", label: "Countries Reached" },
  { value: null, display: "24/7", label: "Expert Support" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function CounterStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-2xl border border-gray-200 px-6 py-8 text-center shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-2">
            {stat.value !== null ? (
              <AnimatedCounter target={stat.value} suffix={stat.suffix!} />
            ) : (
              stat.display
            )}
          </div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
