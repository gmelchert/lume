import Image from "next/image";
import type { Product } from "@/lib/schema";
import { whatsappUrl } from "@/lib/whatsapp";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col border border-line bg-cream-dark p-4">
      <div className="relative aspect-[4/5]">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <h3 className="mt-4 font-serif text-xl text-brown-dark">{product.title}</h3>
      <p className="text-xs uppercase tracking-widest text-muted">{product.material}</p>
      <p className="mt-2 flex-1 text-sm">{product.description}</p>
      <a
        href={whatsappUrl(`Olá! Tenho interesse no produto "${product.title}".`)}
        target="_blank"
        rel="noopener"
        className="mt-4 border border-brown px-4 py-2 text-center text-xs uppercase tracking-widest text-brown transition-colors hover:bg-brown hover:text-white"
      >
        Falar no WhatsApp
      </a>
    </div>
  );
}
