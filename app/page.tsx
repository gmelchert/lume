import { asc } from "drizzle-orm";
import { Catalog } from "@/components/Catalog";
import { Testimonials } from "@/components/Testimonials";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { whatsappUrl } from "@/lib/whatsapp";
import { INSTAGRAM_IMGS, INSTAGRAM_URL } from "@/constants";

export const dynamic = "force-dynamic";

type IconProps = { className?: string };

const features = [
  {
    title: "Acabamento Premium",
    description: "Peças sofisticadas feitas com excelência.",
    Icon: ({ className }: IconProps) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
        <path d="M6 3h12l3 5-9 13L3 8l3-5Z" strokeLinejoin="round" />
        <path d="M3 8h18M9 3 7.5 8 12 21 16.5 8 15 3" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Gravação Personalizada",
    description: "Seu amor eternizado em cada detalhe.",
    Icon: ({ className }: IconProps) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
        <circle cx="12" cy="15" r="6" />
        <path d="m9 6 3-3 3 3-3 4-3-4Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Entrega Segura",
    description: "Enviamos para todo o Brasil com segurança.",
    Icon: ({ className }: IconProps) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
        <path d="M1 5h13v11H1zM14 8h5l3 4v4h-8z" strokeLinejoin="round" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: "Atendimento Humanizado",
    description: "Suporte rápido, atencioso e personalizado.",
    Icon: ({ className }: IconProps) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
        <path d="M12 21S3 14.5 3 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 2.5C21 14.5 12 21 12 21Z" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default async function Home() {
  const all = await db
    .select()
    .from(products)
    .orderBy(asc(products.sortOrder), asc(products.createdAt));

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line bg-cream/20 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-5 text-center">
          <span className="font-serif text-2xl tracking-[0.35em] text-brown-dark">LUME</span>
          <p className="mt-1 text-sm tracking-[0.2em] text-brown-dark/70">Alianças</p>
        </div>
      </header>

      <section
        className="bg-cream-dark bg-cover bg-center"
        style={{ backgroundImage: "url('/lume-landscape.jpg')" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-16 text-left sm:py-24">
          <p className="text-sm uppercase tracking-[0.3em] text-brown">O símbolo</p>
          <h1 className="mt-4 font-serif text-brown-dark">
            <span className="block text-5xl sm:text-7xl">PERFEITO</span>
            <span className="mt-2 block text-3xl sm:text-4xl">
              PARA O SEU <em>AMOR</em>
            </span>
          </h1>
          <p className="mt-6 max-w-md text-muted">
            Anéis e pulseiras com acabamento premium e design sofisticado.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#produtos"
              className="inline-block border border-brown px-8 py-3 text-sm uppercase tracking-widest text-brown transition-colors hover:bg-brown hover:text-white"
            >
              Ver Produtos
            </a>
            <a
              href={whatsappUrl("Olá! Vim pelo site da Lume.")}
              target="_blank"
              rel="noopener"
              className="inline-block bg-brown px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-brown-dark"
            >
              Falar no WhatsApp →
            </a>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-brown">Por que escolher a</p>
            <h2 className="mt-3 font-serif text-4xl tracking-[0.15em] text-brown-dark sm:text-5xl">
              LUME?
            </h2>
            <span className="mx-auto mt-4 block h-px w-16 bg-line" />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:divide-x sm:divide-line lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="px-6 text-center">
                <feature.Icon className="mx-auto h-10 w-10 text-brown" />
                <h3 className="mt-6 text-sm uppercase tracking-[0.2em] text-brown-dark">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Catalog products={all} />

      <Testimonials />

      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 pb-10 sm:grid-cols-3 sm:gap-8 sm:pb-12">
          <div className="flex flex-col justify-center text-center sm:text-left">
            <p className="text-sm uppercase tracking-[0.3em] text-brown">Siga a Lume</p>
            <h2 className="mt-2 font-serif text-4xl tracking-[0.15em] text-brown-dark">
              No Instagram
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Acompanhe de perto nossas novidades, clientes e pedidos especiais.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex items-center justify-center gap-2 self-center border border-brown px-6 py-3 text-xs uppercase tracking-widest text-brown transition-colors hover:bg-brown hover:text-white sm:self-start"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              Seguir Instagam
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:col-span-2 lg:grid-cols-4">
            {INSTAGRAM_IMGS.map((imgSrc, i) => (
              <a
                key={imgSrc}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener"
                className="aspect-square overflow-hidden bg-cream-dark"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc}
                  alt={`Lume no Instagram ${i}`}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-brown-dark py-7 text-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:gap-6 sm:text-left">
          <p className="font-serif text-xl tracking-[0.35em]">LUME</p>
          <p className="text-sm opacity-80">O símbolo perfeito para o seu amor.</p>
          <a
            href={whatsappUrl("Olá! Vim pelo site da Lume.")}
            target="_blank"
            rel="noopener"
            className="text-sm underline underline-offset-4"
          >
            WhatsApp: +55 11 92467-7227
          </a>
          <p className="text-xs opacity-60">
            © {new Date().getFullYear()} Lume. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
