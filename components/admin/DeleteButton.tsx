"use client";

export function DeleteButton({ action }: { action: () => Promise<void> }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Excluir este produto?")) e.preventDefault();
      }}
    >
      <button className="text-sm text-red-700 underline underline-offset-4">Excluir</button>
    </form>
  );
}
