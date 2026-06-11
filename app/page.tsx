import { asc } from "drizzle-orm";
import { Catalog } from "@/components/Catalog";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { whatsappUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function Home() {
  const all = await db
    .select()
    .from(products)
    .orderBy(asc(products.sortOrder), asc(products.createdAt));

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line bg-cream/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-5 text-center">
          <span className="font-serif text-2xl tracking-[0.35em] text-brown-dark">LUME</span>
        </div>
      </header>

      <section className="bg-cream-dark">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-24">
          <p className="text-sm uppercase tracking-[0.3em] text-brown">O símbolo</p>
          <h1 className="mt-4 font-serif text-brown-dark">
            <span className="block text-5xl sm:text-7xl">PERFEITO</span>
            <span className="mt-2 block text-3xl sm:text-4xl">
              PARA O SEU <em>AMOR</em>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-muted">
            Anéis e pulseiras com acabamento premium e design sofisticado.
          </p>
          <a
            href={whatsappUrl("Olá! Vim pelo site da Lume.")}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-block bg-brown px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-brown-dark"
          >
            Falar no WhatsApp →
          </a>
        </div>
      </section>

      <Catalog products={all} />

      <footer className="bg-brown-dark py-12 text-center text-cream">
        <p className="font-serif text-xl tracking-[0.35em]">LUME</p>
        <p className="mt-2 text-sm opacity-80">O símbolo perfeito para o seu amor.</p>
        <a
          href={whatsappUrl("Olá! Vim pelo site da Lume.")}
          target="_blank"
          rel="noopener"
          className="mt-4 inline-block text-sm underline underline-offset-4"
        >
          WhatsApp: +55 11 98675-8444
        </a>
        <p className="mt-8 text-xs opacity-60">
          © {new Date().getFullYear()} Lume. Todos os direitos reservados.
        </p>
      </footer>
    </>
  );
}
