import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function responderChat(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { pregunta } = req.body;
    const usuarioId = (req as any).usuario.id;

    if (!pregunta) {
      throw new Error("No existe la pregunta");
    }

    // PASO 1: consultar las tareas de ESTE usuario con Prisma
    const tareas = await prisma.tarea.findMany({
      where: { usuarioId: usuarioId },
    });

    // PASO 2: construir el prompt combinando las tareas + la pregunta
    const listaTareas = tareas
      .map(
        (t) => `- ${t.titulo} (${t.completada ? "completada" : "pendiente"})`,
      )
      .join("\n");

    const prompt = `Estas son las tareas del usuario:\n${listaTareas}\n\nPregunta: ${pregunta}`;

    // PASO 3: llamar al modelo con ese prompt

    const mensaje = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });
    // PASO 4: devolver la respuesta al frontend

    res.json({ respuesta: mensaje.content[0] });
  } catch (error) {
    next(error);
  }
}
