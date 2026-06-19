import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, asc, eq, ne } from "drizzle-orm";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { whatsappUrl } from "@/lib/whatsapp";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { BackToTop } from "@/components/BackToTop";

export const dynamic = "force-dynamic";

const HIGHLIGHTS = [
  "Acabamento premium",
  "Gravação personalizada",
  "Entrega segura para todo o Brasil",
];

async function getProduct(id: number) {
  const rows = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return rows[0];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(Number(id));
  if (!product) return { title: "Produto não encontrado — Lume" };
  return {
    title: `${product.title} — Lume`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId)) notFound();

  const product = await getProduct(numId);
  if (!product) notFound();

  const related = await db
    .select()
    .from(products)
    .where(and(eq(products.category, product.category), ne(products.id, product.id)))
    .orderBy(asc(products.sortOrder), asc(products.createdAt))
    .limit(4);

  const categoryLabel = product.category === "ring" ? "Anel" : "Acessório";

  return (
    <>
      <SiteHeader />

      <main className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
          <Reveal>
            <nav className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-muted">
              <Link href="/" className="transition-colors hover:text-brown">
                Início
              </Link>
              <span>/</span>
              <Link href="/#produtos" className="transition-colors hover:text-brown">
                {product.category === "ring" ? "Anéis" : "Acessórios"}
              </Link>
              <span>/</span>
              <span className="text-brown-dark">{product.title}</span>
            </nav>
          </Reveal>

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="group relative aspect-[3/4] overflow-hidden border border-line bg-cream-dark lg:sticky lg:top-24">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="flex flex-col">
                <p className="text-xs uppercase tracking-[0.3em] text-brown">{categoryLabel}</p>
                <h1 className="mt-3 font-serif text-4xl text-brown-dark sm:text-5xl">
                  {product.title}
                </h1>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted">
                  {product.material}
                </p>
                <p className="mt-6 text-sm leading-relaxed text-ink">{product.description}</p>

                <ul className="mt-8 space-y-3">
                  {HIGHLIGHTS.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-ink">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="h-5 w-5 shrink-0 text-brown"
                      >
                        <path d="m5 12 5 5 9-11" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-8 text-sm uppercase tracking-[0.2em] text-brown-dark">
                  Valor sob consulta
                </p>

                <a
                  href={whatsappUrl(`Olá! Tenho interesse no produto "${product.title}".`)}
                  target="_blank"
                  rel="noopener"
                  className="mt-4 bg-brown px-8 py-4 text-center text-sm uppercase tracking-widest text-white transition-colors hover:bg-brown-dark"
                >
                  Falar no WhatsApp →
                </a>
                <Link
                  href="/#produtos"
                  className="mt-4 text-center text-xs uppercase tracking-widest text-brown underline underline-offset-4 transition-colors hover:text-brown-dark"
                >
                  ← Voltar ao catálogo
                </Link>
              </div>
            </Reveal>
          </div>

          {related.length > 0 && (
            <div className="mt-20">
              <Reveal className="text-center">
                <h2 className="font-serif text-3xl tracking-[0.15em] text-brown-dark sm:text-4xl">
                  Você também pode gostar
                </h2>
                <span className="mx-auto mt-4 block h-px w-16 bg-line" />
              </Reveal>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p, i) => (
                  <Reveal key={p.id} delay={Math.min(i, 7) * 70} className="h-full">
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
      <BackToTop />
    </>
  );
}
