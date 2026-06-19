"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteProduct } from "@/lib/actions";
import type { Product } from "@/lib/schema";

const CATEGORY_LABEL = { ring: "Anel", accessories: "Acessório" } as const;

export function ProductList({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 250);
    return () => clearTimeout(id);
  }, [query]);

  const q = debounced.trim().toLowerCase();
  const visible = q
    ? products.filter((p) =>
        `${p.title} ${p.material} ${CATEGORY_LABEL[p.category]}`
          .toLowerCase()
          .includes(q),
      )
    : products;

  return (
    <>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por título, material ou categoria"
        className="mt-10 w-full border border-line bg-cream-dark px-4 py-3 text-sm text-brown-dark placeholder:text-muted focus:border-brown focus:outline-none"
      />

      <ul className="mt-4 divide-y divide-line border border-line bg-cream-dark">
        {visible.length === 0 && (
          <li className="p-6 text-center text-sm text-muted">
            {products.length === 0
              ? "Nenhum produto cadastrado."
              : "Nenhum produto encontrado."}
          </li>
        )}
        {visible.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 p-4">
            <div className="relative h-16 w-14 shrink-0">
              <Image src={p.imageUrl} alt={p.title} fill className="object-cover" sizes="56px" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{p.title}</p>
              <p className="truncate text-xs uppercase tracking-widest text-muted">
                {CATEGORY_LABEL[p.category]} · {p.material} · ordem {p.sortOrder}
              </p>
            </div>
            <Link
              href={`/admin?edit=${p.id}`}
              className="text-sm text-brown underline underline-offset-4"
            >
              Editar
            </Link>
            <DeleteButton action={deleteProduct.bind(null, p.id)} />
          </li>
        ))}
      </ul>
    </>
  );
}
