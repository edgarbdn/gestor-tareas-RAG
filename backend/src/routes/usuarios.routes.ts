import { Router } from "express";
import { obtenerUsuarios } from "../controllers/usuarios.controller";
import { verificarToken } from "../middleware/auth.middleware";

const router = Router();

router.use(verificarToken);

router.get("/", obtenerUsuarios);

export default router;
