"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Translates its children vertically as the page scrolls. Disabled under reduced motion. */
export function Parallax({
  children,
  speed = 0.25,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;
    const update = () => {
      const rect = wrap.getBoundingClientRect();
      setY(rect.top * -speed);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={wrapRef} className={className}>
      <div className="h-full w-full" style={{ transform: `translate3d(0, ${y}px, 0)` }}>
        {children}
      </div>
    </div>
  );
}
