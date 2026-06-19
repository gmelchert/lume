import { asc } from "drizzle-orm";
import Image from "next/image";
import { Catalog } from "@/components/Catalog";
import { Testimonials } from "@/components/Testimonials";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { BackToTop } from "@/components/BackToTop";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  DeliveryIcon,
  DiamondIcon,
  EngraveIcon,
  HeartIcon,
} from "@/components/FeatureIcons";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { whatsappUrl } from "@/lib/whatsapp";
import { INSTAGRAM_IMAGES, INSTAGRAM_URL } from "@/constants";

export const dynamic = "force-dynamic";

const features = [
  {
    title: "Acabamento Premium",
    description: "Peças sofisticadas feitas com excelência.",
    Icon: DiamondIcon,
  },
  {
    title: "Gravação Personalizada",
    description: "Seu amor eternizado em cada detalhe.",
    Icon: EngraveIcon,
  },
  {
    title: "Entrega Segura",
    description: "Enviamos para todo o Brasil com segurança.",
    Icon: DeliveryIcon,
  },
  {
    title: "Atendimento Humanizado",
    description: "Suporte rápido, atencioso e personalizado.",
    Icon: HeartIcon,
  },
];

export default async function Home() {
  const all = await db
    .select()
    .from(products)
    .orderBy(asc(products.sortOrder), asc(products.createdAt));

  return (
    <>
      <SiteHeader />

      <section className="relative overflow-hidden bg-cream-dark">
        <Parallax className="absolute top-[-15%] left-0 right-0 h-[130%]" speed={0.25}>
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/lume-landscape.jpg')" }}
          />
        </Parallax>
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-left sm:py-24">
          <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-brown">O símbolo</p>
          <h1 className="mt-4 font-serif text-brown-dark">
            <span className="block text-5xl sm:text-7xl">PERFEITO</span>
            <span className="mt-2 block text-3xl sm:text-4xl">
              PARA O SEU <em>AMOR</em>
            </span>
          </h1>
          <p className="mt-6 max-w-md text-muted">
            Anéis e acessórios com acabamento premium e design sofisticado.
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
          </Reveal>
        </div>
        <a
          href="#produtos"
          aria-label="Ver produtos"
          className="absolute inset-x-0 bottom-6 z-10 mx-auto flex w-fit text-brown/80 transition-colors hover:text-brown motion-safe:animate-bounce"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
          <Reveal className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-brown">Por que escolher a</p>
            <h2 className="mt-3 font-serif text-4xl tracking-[0.15em] text-brown-dark sm:text-5xl">
              LUME?
            </h2>
            <span className="mx-auto mt-4 block h-px w-16 bg-line" />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:divide-x sm:divide-line lg:grid-cols-4">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 70} className="px-6 text-center">
                <feature.Icon className="mx-auto h-10 w-10 text-brown" />
                <h3 className="mt-6 text-sm uppercase tracking-[0.2em] text-brown-dark">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{feature.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Catalog products={all} />

      <Testimonials />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brown">Siga a Lume</p>
              <h2 className="mt-3 font-serif text-4xl text-brown-dark sm:text-5xl">No Instagram</h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                Acompanhe de perto novidades, clientes e pedidos especiais.
              </p>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex w-fit items-center border border-brown px-6 py-3 text-xs uppercase tracking-widest text-brown transition-colors hover:bg-brown hover:text-white"
            >
              Seguir @lumealiancas
            </a>
          </Reveal>

          <Reveal className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {INSTAGRAM_IMAGES.map(imgSrc => (
              <a
                key={imgSrc}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener"
                className="group block overflow-hidden bg-white"
              >
                <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-cream">
                  <Image
                    src={imgSrc}
                    alt="Publicação da Lume no Instagram"
                    fill
                    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex items-center gap-4 bg-gray-50 px-3 py-3 text-brown-dark">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="#ed4956"
                    stroke="#ed4956"
                    strokeWidth="1.8"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m17 2 4 4-4 4" />
                    <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                    <path d="m7 22-4-4 4-4" />
                    <path d="M21 13v1a4 4 0 0 1-4 4H3" />
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </div>
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-cream bg-cover bg-center"
        style={{ backgroundImage: "url('/footer-lume-img.png')" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-linear-to-br from-cream-dark to-cream opacity-60"
        />
        <Reveal className="relative mx-auto max-w-2xl px-6 py-24 text-center sm:py-32">
          <p className="text-sm uppercase tracking-[0.3em] text-brown">Seu amor merece</p>
          <h2 className="mt-4 font-serif text-5xl text-brown-dark sm:text-6xl">Algo eterno.</h2>
          <p className="mx-auto mt-6 max-w-md text-muted">
            Garanta agora a sua aliança personalizada, com gravação grátis e envio para todo o
            Brasil.
          </p>
          <a
            href={whatsappUrl("Olá! Vim pelo site da Lume.")}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-block bg-brown px-8 py-4 text-sm uppercase tracking-widest text-white transition-colors hover:bg-brown-dark"
          >
            Falar no WhatsApp →
          </a>
        </Reveal>
      </section>

      <SiteFooter />

      <FloatingWhatsApp />
      <BackToTop />
    </>
  );
}
