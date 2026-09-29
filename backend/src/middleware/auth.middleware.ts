import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verificarToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).usuario = payload; // guardamos los datos del usuario en la request, por si los necesitas después
    next();
  } catch (error) {
    res.status(401).json({ mensaje: "Token inválido o caducado" });
  }
}
