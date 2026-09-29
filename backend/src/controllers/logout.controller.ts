import { Request, Response, NextFunction } from "express";

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.json({ mensaje: "Sesión cerrada" });
  } catch (error) {
    next(error);
  }
}
