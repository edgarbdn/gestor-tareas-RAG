"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: number;
  completada: boolean;
};

export default function AccionesTarea({ id, completada }: Props) {
  const router = useRouter();

  async function handleToggle(e: React.FormEvent) {
    e.preventDefault();
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
      const res = await fetch(`${API_URL}/tareas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completada: !completada }),
        credentials: "include",
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault();
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
      const res = await fetch(`${API_URL}/tareas/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <form onSubmit={handleToggle}>
        <button
          type="submit"
          title={completada ? "Marcar como pendiente" : "Marcar como hecha"}
          className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-brand hover:bg-brand-soft hover:text-brand"
        >
          {completada ? "Deshacer" : "Completar"}
        </button>
      </form>

      <form onSubmit={handleDelete}>
        <button
          type="submit"
          title="Borrar tarea"
          aria-label="Borrar tarea"
          className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-500"
        >
          Borrar
        </button>
      </form>
    </div>
  );
}
