"use client";

import { useState } from "react";

export default function ChatPage() {
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCargando(true);

    try {
      if (!pregunta) {
        throw new Error("Este campo no puede estar vacio");
      }
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pregunta,
        }),
        credentials: "include",
      });

      const datos = await res.json();
      setRespuesta(datos.respuesta.text);
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10">
      <div className="animar-entrada mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Asistente</h1>
        <p className="mt-1 text-sm text-muted">
          Pregúntale lo que quieras sobre tus tareas.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="animar-entrada flex gap-2 rounded-2xl border border-border bg-surface p-2 shadow-sm transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15"
        style={{ animationDelay: "0.08s" }}
      >
        <label htmlFor="pregunta" className="sr-only">
          Tu pregunta
        </label>
        <input
          id="pregunta"
          className="min-w-0 flex-1 bg-transparent px-3 py-2 outline-none placeholder:text-muted/60"
          type="text"
          placeholder="¿Qué me queda pendiente hoy?"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
        />
        <button
          type="submit"
          disabled={cargando}
          className="rounded-xl bg-brand px-5 py-2 font-medium text-white transition hover:bg-brand-hover active:scale-[0.97] disabled:opacity-60"
        >
          Preguntar
        </button>
      </form>

      <div className="mt-6">
        {cargando ? (
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-5 text-muted">
            <span className="flex gap-1" aria-hidden>
              <span className="h-2 w-2 animate-bounce rounded-full bg-brand [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-brand [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-brand" />
            </span>
            <span className="text-sm">Pensando…</span>
          </div>
        ) : respuesta ? (
          <div className="animar-entrada flex gap-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft text-sm">
              🤖
            </span>
            <p className="whitespace-pre-wrap leading-relaxed">{respuesta}</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border py-14 text-center text-muted">
            <p className="text-3xl">💬</p>
            <p className="mt-2 text-sm">Aquí aparecerá la respuesta.</p>
          </div>
        )}
      </div>
    </main>
  );
}
