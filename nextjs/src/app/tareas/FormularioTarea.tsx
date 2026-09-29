"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function FormularioTarea() {
  const [titulo, setTitulo] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo }),
      credentials: "include",
    });

    const datos = await res.json();
    console.log(datos);

    if (res.ok) {
      router.refresh();
      setTitulo("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 rounded-2xl border border-border bg-surface p-2 shadow-sm transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15"
    >
      <label htmlFor="titulo" className="sr-only">
        Título de la tarea
      </label>
      <input
        id="titulo"
        type="text"
        value={titulo}
        placeholder="¿Qué tienes que hacer?"
        onChange={(e) => setTitulo(e.target.value)}
        className="min-w-0 flex-1 bg-transparent px-3 py-2 outline-none placeholder:text-muted/60"
      />
      <button
        type="submit"
        className="rounded-xl bg-brand px-5 py-2 font-medium text-white transition hover:bg-brand-hover active:scale-[0.97]"
      >
        Añadir
      </button>
    </form>
  );
}

export default FormularioTarea;
