import { NextResponse } from "next/server";

interface Tarea {
  id: number;
  titulo: string;
}

export let tareas: Tarea[] = [{ id: 1, titulo: "Aprender Next.js" }];

export async function GET() {
  return NextResponse.json(tareas);
}

export async function POST(request: Request) {
  const datos = await request.json();
  const nuevaTarea: Tarea = { id: tareas.length + 1, titulo: datos.titulo };
  tareas.push(nuevaTarea);
  return NextResponse.json(nuevaTarea);
}
