import { Router } from "express";
import {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
} from "../controllers/tareas.controller";
import { verificarToken } from "../middleware/auth.middleware";

const router = Router();

router.use(verificarToken);

router.get("/", obtenerTareas);
router.post("/", crearTarea);
router.put("/:id", actualizarTarea);
router.delete("/:id", eliminarTarea);

export default router;
