"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { setEstaLogueado } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // ← esto le dice al navegador: manda/acepta cookies en esta petición
      });
      const datos = await res.json();
      console.log(res.status, datos);

      if (res.ok) {
        router.push("/tareas");
        setEstaLogueado(true);
      } else {
        setError(
          `Error ${res.status}: ${datos.mensaje ?? "No se pudo iniciar sesión"}`,
        );
      }
    } catch (err) {
      console.error(err);
      setError(
        "No se pudo conectar con el servidor (¿está el backend en el puerto 3000?)",
      );
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center px-5 py-12">
      <form
        onSubmit={(e) => {
          (e.preventDefault(), handleLogin());
        }}
        className="animar-entrada w-full max-w-sm rounded-3xl border border-border bg-surface p-8 shadow-xl shadow-brand/5"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand text-xl text-white shadow-md shadow-brand/30">
            ✓
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">
            Bienvenido de nuevo
          </h1>
          <p className="mt-1 text-sm text-muted">
            Inicia sesión para ver tus tareas
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-border bg-background px-4 py-2.5 outline-none transition placeholder:text-muted/60 focus:border-brand focus:ring-4 focus:ring-brand/15"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Introduce tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border border-border bg-background px-4 py-2.5 outline-none transition placeholder:text-muted/60 focus:border-brand focus:ring-4 focus:ring-brand/15"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-600 dark:text-red-400"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 rounded-xl bg-brand py-3 font-medium text-white shadow-lg shadow-brand/25 transition hover:bg-brand-hover active:scale-[0.98]"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </main>
  );
}
