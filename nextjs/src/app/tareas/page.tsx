import { cookies } from "next/headers";
import FormularioTarea from "./FormularioTarea";

//con el redirect de next/navigation hago las redirecciones donde yo quiera
import { redirect } from "next/navigation";

// En Docker, API_URL apunta al servicio "backend" del compose.
// Sin Docker (npm run dev) no existe, y se usa localhost.
const API_URL = process.env.API_URL ?? "http://localhost:3000";

export default async function Tareas() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${API_URL}/tareas`, {
    headers: {
      Cookie: `token=${token}`,
    },
  });

  if (!res.ok) {
    //Aquí usando la redirección
    return redirect("/login");
  }

  const tareas = await res.json();
  const pendientes = tareas.filter((t: any) => !t.completada).length;

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10">
      <div className="animar-entrada mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mis tareas</h1>
          <p className="mt-1 text-sm text-muted">
            {tareas.length === 0
              ? "Todavía no has creado ninguna"
              : `${pendientes} pendiente${pendientes === 1 ? "" : "s"} de ${tareas.length}`}
          </p>
        </div>
      </div>

      <div className="animar-entrada mb-6" style={{ animationDelay: "0.08s" }}>
        <FormularioTarea />
      </div>

      {tareas.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-14 text-center text-muted">
          <p className="text-3xl">🌱</p>
          <p className="mt-2 text-sm">Añade tu primera tarea arriba para empezar.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {tareas.map((t: any, i: number) => (
            <li
              key={t.id}
              style={{ animationDelay: `${0.12 + i * 0.04}s` }}
              className="animar-entrada flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3.5 transition hover:border-brand/50 hover:shadow-md hover:shadow-brand/5"
            >
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs ${
                  t.completada
                    ? "border-brand bg-brand text-white"
                    : "border-border text-transparent"
                }`}
                aria-hidden
              >
                ✓
              </span>
              <span
                className={`flex-1 ${t.completada ? "text-muted line-through" : ""}`}
              >
                {t.titulo}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  t.completada
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-brand-soft text-brand"
                }`}
              >
                {t.completada ? "Hecha" : "Pendiente"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
