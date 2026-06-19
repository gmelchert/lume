"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/schema";
import { whatsappUrl } from "@/lib/whatsapp";

/** Product quick-view overlay — opens over the page, closes on ESC / backdrop / ×. */
export function QuickViewModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={product.title}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm motion-safe:animate-[fadeIn_200ms_ease-out]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-[90vh] w-full max-w-3xl overflow-hidden bg-cream shadow-2xl sm:grid-cols-2 motion-safe:animate-[popIn_250ms_cubic-bezier(0.22,1,0.36,1)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream/80 text-xl text-brown-dark backdrop-blur transition-colors hover:bg-brown hover:text-white"
        >
          ×
        </button>

        <div className="relative aspect-[4/5] sm:aspect-auto sm:min-h-[28rem]">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col overflow-y-auto p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-brown">
            {product.category === "ring" ? "Anel" : "Acessório"}
          </p>
          <h2 className="mt-2 font-serif text-3xl text-brown-dark">{product.title}</h2>
          <p className="mt-1 text-xs uppercase tracking-widest text-muted">
            {product.material}
          </p>
          <p className="mt-5 flex-1 text-sm leading-relaxed text-ink">
            {product.description}
          </p>
          <a
            href={whatsappUrl(`Olá! Tenho interesse no produto "${product.title}".`)}
            target="_blank"
            rel="noopener"
            className="mt-8 bg-brown px-6 py-3 text-center text-xs uppercase tracking-widest text-white transition-colors hover:bg-brown-dark"
          >
            Falar no WhatsApp →
          </a>
          <Link
            href={`/produtos/${product.id}`}
            className="mt-3 text-center text-xs uppercase tracking-widest text-brown underline underline-offset-4 transition-colors hover:text-brown-dark"
          >
            Ver página completa →
          </Link>
        </div>
      </div>
    </div>
  );
}
