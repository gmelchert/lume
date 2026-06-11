"use client";

import { useState } from "react";
import type { Product } from "@/lib/schema";
import { ProductCard } from "./ProductCard";

const TABS = [
  { key: "ring", label: "Anéis" },
  { key: "bracelet", label: "Pulseiras" },
] as const;

export function Catalog({ products }: { products: Product[] }) {
  const [tab, setTab] = useState<"ring" | "bracelet">("ring");
  const visible = products.filter((p) => p.category === tab);

  return (
    <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
      <div className="flex justify-center gap-8 sm:gap-12">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`border-b-2 pb-2 font-serif text-xl uppercase tracking-[0.2em] transition-colors sm:text-2xl ${
              tab === t.key
                ? "border-brown text-brown-dark"
                : "border-transparent text-muted hover:text-brown"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-16 text-center text-muted">
          Em breve novos modelos. Fale conosco no WhatsApp.
        </p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
