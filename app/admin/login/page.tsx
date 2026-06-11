import { login } from "@/lib/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form action={login} className="w-full max-w-sm border border-line bg-cream-dark p-8">
        <h1 className="text-center font-serif text-2xl tracking-[0.35em] text-brown-dark">
          LUME
        </h1>
        <p className="mt-1 text-center text-xs uppercase tracking-widest text-muted">
          Área administrativa
        </p>
        <input
          type="password"
          name="password"
          required
          placeholder="Senha"
          className="mt-6 w-full border border-line bg-white px-3 py-2 text-sm"
        />
        {error && <p className="mt-2 text-sm text-red-700">Senha incorreta.</p>}
        <button className="mt-4 w-full bg-brown py-2 text-sm uppercase tracking-widest text-white transition-colors hover:bg-brown-dark">
          Entrar
        </button>
      </form>
    </main>
  );
}
