import { whatsappUrl } from "@/lib/whatsapp";

export function SiteFooter() {
  return (
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
  );
}
