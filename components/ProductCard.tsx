import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/schema";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produtos/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-cream transition-all duration-300 hover:shadow-xl hover:shadow-brown/10 motion-safe:hover:-translate-y-1"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-linear-to-b from-cream to-cream-dark">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="flex flex-1 flex-col bg-white p-6">
        <p className="text-xs uppercase tracking-widest text-muted">
          {product.material}
        </p>
        <h3 className="mt-2 font-serif text-2xl text-brown-dark">
          {product.title}
        </h3>
        <span className="mt-auto inline-flex items-center gap-2 self-start border-b border-line pb-1 text-xs uppercase tracking-widest text-brown transition-colors group-hover:border-brown">
          Ver detalhes
          <span aria-hidden className="transition-transform duration-300 motion-safe:group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
