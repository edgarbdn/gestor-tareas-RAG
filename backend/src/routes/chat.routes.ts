import { Router } from "express";
import { responderChat } from "../controllers/chat.controller";
import { verificarToken } from "../middleware/auth.middleware";

const router = Router();

router.use(verificarToken);

router.post("/", responderChat);

export default router;
