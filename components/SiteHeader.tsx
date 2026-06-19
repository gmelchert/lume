import Link from "next/link";
import { ScrollProgress } from "./ScrollProgress";

export function SiteHeader() {
  return (
    <>
      <ScrollProgress />
      <header className="sticky top-0 z-20 border-b border-line bg-cream/20 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-5 text-center">
        <Link href="/" className="font-serif text-2xl tracking-[0.35em] text-brown-dark">
          LUME
        </Link>
        <p className="mt-1 text-sm tracking-[0.2em] text-brown-dark/70">Alianças & Jóias</p>
        </div>
      </header>
    </>
  );
}
