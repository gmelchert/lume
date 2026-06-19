"use client";

import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import type { Product } from "@/lib/schema";
import { ProductCard } from "./ProductCard";

const TABS = [
  { key: "ring", label: "Anéis" },
  { key: "accessories", label: "Acessórios" },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export function Catalog({ products }: { products: Product[] }) {
  const [tab, setTab] = useState<"ring" | "accessories">("ring");
  const [query, setQuery] = useState("");
  const visible = products.filter(
    (p) =>
      p.category === tab &&
      p.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <MotionConfig reducedMotion="user">
      <section id="produtos" className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex gap-8 sm:gap-12">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`relative pb-2 font-serif text-xl uppercase tracking-[0.2em] transition-colors sm:text-2xl ${
                  tab === t.key ? "text-brown-dark" : "text-muted hover:text-brown"
                }`}
              >
                {t.label}
                {tab === t.key && (
                  <motion.span
                    layoutId="catalog-tab-indicator"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-brown"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tab === "ring" ? "Buscar anéis" : "Buscar acessórios"}
            className="w-full border-b border-line bg-transparent pb-2 text-sm tracking-wide text-brown-dark placeholder:text-muted focus:border-brown focus:outline-none sm:w-64"
          />
        </div>

        {visible.length === 0 ? (
          <p className="mt-16 text-center text-muted">
            Em breve novos modelos. Fale conosco no WhatsApp.
          </p>
        ) : (
          <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="h-full"
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </MotionConfig>
  );
}
