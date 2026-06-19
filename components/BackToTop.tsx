"use client";

import { useEffect, useState } from "react";

/** Scroll-to-top button that fades in after scrolling down. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-24 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-cream text-brown shadow-md transition-all duration-300 hover:bg-brown hover:text-white ${
        show ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path d="m6 15 6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
