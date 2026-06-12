"use client";

import { useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "A qualidade superou minhas expectativas. As alianças são lindas e o acabamento impecável!",
    author: "Cliente LUME",
    amount: 5,
  },
  {
    quote:
      "Chegou perfeito e muito bem embalado. Atendimento nota 10, recomendo demais!",
    author: "Cliente LUME",
    amount: 5,
  },
  {
    quote:
      "A gravação ficou linda e super delicada. Minha noiva amou!",
    author: "Cliente LUME",
    amount: 5,
  },
];

function Stars({ amount }: { amount: number }) {
  return (
    <div className="flex justify-center gap-1 text-brown">
      {Array.from({ length: amount }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="m12 2 3 6.5 7 .8-5.2 4.8 1.5 6.9L12 17.6 5.2 21l1.5-6.9L1.5 9.3l7-.8L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, testimonials.length - 1));
    const card = track.children[clamped] as HTMLElement;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = (track.children[0] as HTMLElement).offsetWidth;
    setActive(Math.round(track.scrollLeft / cardWidth));
  };

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-brown">Quem compra,</p>
          <h2 className="mt-3 font-serif text-4xl tracking-[0.15em] text-brown-dark sm:text-5xl">
            Recomenda
          </h2>
        </div>

        <div className="relative mt-12">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => scrollTo(active - 1)}
            className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-cream text-brown transition-colors hover:bg-brown hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
              <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            ref={trackRef}
            onScroll={onScroll}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((t) => (
              <figure
                key={t.quote}
                className="shrink-0 basis-full snap-center border border-line bg-cream-dark/30 px-8 py-10 text-center sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"
              >
                <Stars amount={t.amount} />
                <blockquote className="mt-5 text-sm italic leading-relaxed text-ink">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 text-sm text-muted">— {t.author}</figcaption>
              </figure>
            ))}
          </div>

          <button
            type="button"
            aria-label="Próximo"
            onClick={() => scrollTo(active + 1)}
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-line bg-cream text-brown transition-colors hover:bg-brown hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
              <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((t, i) => (
            <button
              key={t.quote}
              type="button"
              aria-label={`Ir para depoimento ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                active === i ? "bg-brown" : "bg-line"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
