"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Reveals its children (fade + rise) when scrolled into view. Respects reduced motion. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? "opacity-100 translate-y-0" : "motion-safe:translate-y-6 motion-safe:opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
