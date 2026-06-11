import { asc } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { ProductForm } from "@/components/admin/ProductForm";
import { deleteProduct, logout } from "@/lib/actions";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";

export const dynamic = "force-dynamic";

const CATEGORY_LABEL = { ring: "Anel", bracelet: "Pulseira" } as const;

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const all = await db
    .select()
    .from(products)
    .orderBy(asc(products.sortOrder), asc(products.createdAt));
  const editing = edit ? all.find((p) => p.id === Number(edit)) : undefined;

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <header className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-brown-dark">Catálogo Lume</h1>
        <form action={logout}>
          <button className="text-sm text-muted underline underline-offset-4 hover:text-brown">
            Sair
          </button>
        </form>
      </header>

      <ProductForm key={editing?.id ?? "new"} product={editing} />

      <ul className="mt-10 divide-y divide-line border border-line bg-cream-dark">
        {all.length === 0 && (
          <li className="p-6 text-center text-sm text-muted">Nenhum produto cadastrado.</li>
        )}
        {all.map((p) => (
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
    </main>
  );
}
