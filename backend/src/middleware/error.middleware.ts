import { Request, Response, NextFunction } from "express";

export function manejadorErrores(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err.message);
  res.status(500).json({ mensaje: "Algo salió mal en el servidor" });
}
