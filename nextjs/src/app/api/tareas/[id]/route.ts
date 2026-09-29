import { NextResponse } from "next/server";
import { tareas } from "../route";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  let tarea = tareas.filter((t) => t.id !== Number(id));

  return NextResponse.json(tarea);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const datos = await request.json();

  let tarea = tareas.find((t) => t.id === Number(id));
  if (!tarea) {
    return NextResponse.json(
      { mensaje: "Tarea no encontrada" },
      { status: 404 },
    );
  }
  tarea.titulo = datos.titulo;

  return NextResponse.json(tarea);
}
