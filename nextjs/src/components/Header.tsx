"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const { estaLogueado, setEstaLogueado } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout(e: React.FormEvent) {
    e.preventDefault();

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
      const res = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      const datos = await res.json();
      console.log(res.status, datos);

      if (res.ok) {
        setEstaLogueado(false);
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  }

  function claseEnlace(ruta: string) {
    const activo = pathname === ruta;
    return `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
      activo
        ? "bg-brand-soft text-brand"
        : "text-muted hover:text-foreground hover:bg-brand-soft/60"
    }`;
  }

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-sm text-white shadow-sm">
            ✓
          </span>
          <span className="tracking-tight">Mi App</span>
        </Link>

        <nav className="flex items-center gap-1">
          {estaLogueado ? (
            <>
              <Link href="/tareas" className={claseEnlace("/tareas")}>
                Tareas
              </Link>
              <Link href="/chat" className={claseEnlace("/chat")}>
                Chat
              </Link>
              <form onSubmit={handleLogout} className="ml-2">
                <button
                  type="submit"
                  className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-500"
                >
                  Cerrar sesión
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-brand px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
            >
              Iniciar sesión
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
