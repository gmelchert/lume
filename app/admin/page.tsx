import { asc } from "drizzle-orm";
import { ProductForm } from "@/components/admin/ProductForm";
import { ProductList } from "@/components/admin/ProductList";
import { logout } from "@/lib/actions";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";

export const dynamic = "force-dynamic";

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

      <ProductList products={all} />
    </main>
  );
}
