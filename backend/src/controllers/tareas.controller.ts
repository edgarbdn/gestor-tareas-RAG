import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";

export async function obtenerTareas(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const usuarioId = (req as any).usuario.id;

    const tareas = await prisma.tarea.findMany({
      where: { usuarioId: usuarioId },
    });
    res.json(tareas);
  } catch (error) {
    next(error);
  }
}

export async function crearTarea(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const titulo = req.body.titulo;
    const usuarioId = (req as any).usuario.id;
    if (!titulo) {
      throw new Error("El titulo es obligatorio");
    }
    const tarea = await prisma.tarea.create({
      data: { titulo: titulo, usuarioId: usuarioId },
    });
    res.json(tarea);
  } catch (error) {
    next(error);
  }
}

export async function actualizarTarea(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    const completada = Boolean(req.body.completada);
    const usuarioId = (req as any).usuario.id;

    const tarea = await prisma.tarea.update({
      where: { id: id, usuarioId: usuarioId },
      data: { completada: completada },
    });
    res.json({
      mensaje: `Tarea actualizada`,
      tarea: tarea,
    });
  } catch (error) {
    next(error);
  }
}

export async function eliminarTarea(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    const usuarioId = (req as any).usuario.id;
    await prisma.tarea.delete({ where: { id: id, usuarioId: usuarioId } });
    res.json({ mensaje: "Tarea eliminada" });
  } catch (error) {
    next(error);
  }
}
