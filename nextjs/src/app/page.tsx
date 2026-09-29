import Link from "next/link";

const ventajas = [
  {
    icono: "📝",
    titulo: "Tus tareas, en orden",
    texto: "Crea y consulta tu lista de tareas en un solo lugar, siempre sincronizada.",
  },
  {
    icono: "🤖",
    titulo: "Un asistente que las conoce",
    texto: "Pregunta en el chat qué te queda pendiente y recibe una respuesta basada en tus propias tareas.",
  },
  {
    icono: "🔒",
    titulo: "Privado por defecto",
    texto: "Acceso con tu cuenta: solo tú ves tus tareas y tus conversaciones.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-16 sm:py-24">
      <section className="animar-entrada text-center">
        <span className="inline-block rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
          Gestor de tareas con asistente IA
        </span>
        <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          Organiza tu día y{" "}
          <span className="bg-gradient-to-r from-brand to-pink-400 bg-clip-text text-transparent">
            pregúntale a tus tareas
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
          Apunta lo que tienes que hacer y deja que el asistente te ayude a
          decidir por dónde empezar.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/tareas"
            className="rounded-full bg-brand px-6 py-3 font-medium text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-hover"
          >
            Ver mis tareas
          </Link>
          <Link
            href="/chat"
            className="rounded-full border border-border bg-surface px-6 py-3 font-medium transition hover:-translate-y-0.5 hover:border-brand"
          >
            Hablar con el asistente
          </Link>
        </div>
      </section>

      <section className="mt-20 grid gap-4 sm:grid-cols-3">
        {ventajas.map((v, i) => (
          <article
            key={v.titulo}
            style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            className="animar-entrada rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/10"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-xl">
              {v.icono}
            </div>
            <h2 className="mt-4 font-semibold">{v.titulo}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{v.texto}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
