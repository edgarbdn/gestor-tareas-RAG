import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";

export async function obtenerUsuarios(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: { id: true, email: true },
    });
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
}
