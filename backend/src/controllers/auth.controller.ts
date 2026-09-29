import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma";

export async function registro(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email y contraseña son obligatorios");
    }

    const passwordHasheada = await bcrypt.hash(password, 10);

    const usuario = await prisma.usuario.create({
      data: { email, password: passwordHasheada },
    });

    res.json({
      mensaje: "Usuario registrado",
      id: usuario.id,
      email: usuario.email,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      throw new Error("Credenciales inválidas");
    }

    const passwordCorrecta = await bcrypt.compare(password, usuario.password);

    if (!passwordCorrecta) {
      throw new Error("Credenciales inválidas");
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    res.cookie("token", token, {
      httpOnly: true, // JavaScript no puede leerla, solo el navegador la envía automáticamente
      secure: false, // en producción sería true (solo HTTPS), en desarrollo local lo dejamos en false
      sameSite: "lax", // controla cuándo se envía la cookie en peticiones entre distintos orígenes
      maxAge: 3600000, // duración en milisegundos (aquí, 1 hora)
    });
    res.json({ mensaje: "Login correcto" });
  } catch (error) {
    next(error);
  }
}
