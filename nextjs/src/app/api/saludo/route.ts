import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ mensaje: "Hola desde la API de Next" });
}

export async function POST(request: Request) {
  const datos = await request.json();
  return NextResponse.json({ mensaje: `Hola, ${datos.nombre}` });
}
