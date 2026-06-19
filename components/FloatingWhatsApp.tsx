"use client";

import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/whatsapp";

/** Persistent WhatsApp button that fades in after the hero. */
export function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappUrl("Olá! Vim pelo site da Lume.")}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brown text-white shadow-lg transition-all duration-300 hover:bg-brown-dark motion-safe:hover:scale-105 ${
        show ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.41a8.2 8.2 0 0 1 2.42 5.83c0 4.54-3.7 8.24-8.25 8.24a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24Zm-3.2 4.43c-.15 0-.4.06-.6.28-.21.22-.8.78-.8 1.9 0 1.12.82 2.2.93 2.36.12.15 1.6 2.44 3.88 3.42.54.23.96.37 1.29.48.54.17 1.03.15 1.42.09.43-.06 1.33-.54 1.52-1.07.19-.53.19-.98.13-1.07-.06-.09-.21-.15-.44-.27-.23-.11-1.33-.66-1.54-.73-.21-.08-.36-.11-.5.11-.15.22-.58.73-.71.88-.13.15-.26.17-.49.06-.23-.12-.97-.36-1.85-1.14-.68-.61-1.14-1.36-1.28-1.59-.13-.22-.01-.34.1-.46.1-.1.23-.26.34-.39.12-.13.15-.22.23-.37.08-.15.04-.28-.02-.39-.06-.11-.5-1.22-.69-1.67-.18-.43-.37-.37-.5-.38l-.42-.01Z" />
      </svg>
    </a>
  );
}
