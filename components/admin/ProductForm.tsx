import Link from "next/link";
import { createProduct, updateProduct } from "@/lib/actions";
import type { Product } from "@/lib/schema";

const input = "w-full border border-line bg-white px-3 py-2 text-sm";

export function ProductForm({ product }: { product?: Product }) {
  return (
    <form
      action={product ? updateProduct : createProduct}
      className="mt-8 grid gap-3 border border-line bg-cream-dark p-6"
    >
      <h2 className="font-serif text-xl text-brown-dark">
        {product ? `Editar: ${product.title}` : "Novo produto"}
      </h2>
      {product && <input type="hidden" name="id" value={product.id} />}
      <div className="grid gap-3 sm:grid-cols-2">
        <select name="category" defaultValue={product?.category ?? "ring"} className={input}>
          <option value="ring">Anel</option>
          <option value="accessories">Acessório</option>
        </select>
        <input
          name="material"
          defaultValue={product?.material}
          required
          placeholder="Material (ex: Prata 950)"
          className={input}
        />
      </div>
      <input
        name="title"
        defaultValue={product?.title}
        required
        placeholder="Título"
        className={input}
      />
      <textarea
        name="description"
        defaultValue={product?.description}
        required
        rows={3}
        placeholder="Descrição"
        className={input}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm text-muted">
          Ordem de exibição
          <input
            name="sortOrder"
            type="number"
            defaultValue={product?.sortOrder ?? 0}
            required
            className={`${input} mt-1`}
          />
        </label>
        <label className="text-sm text-muted">
          Imagem {product && "(deixe vazio para manter a atual)"}
          <input
            name="image"
            type="file"
            accept="image/*"
            required={!product}
            className={`${input} mt-1`}
          />
        </label>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-brown px-6 py-2 text-sm uppercase tracking-widest text-white transition-colors hover:bg-brown-dark">
          Salvar
        </button>
        {product && (
          <Link href="/admin" className="text-sm text-muted underline underline-offset-4">
            Cancelar
          </Link>
        )}
      </div>
    </form>
  );
}
