import "dotenv/config";
import express from "express";
import { logger } from "./middleware/logger.middleware";
import { manejadorErrores } from "./middleware/error.middleware";
import tareasRouter from "./routes/tareas.routes";
import authRouter from "./routes/auth.routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import chatRouter from "./routes/chat.routes";
import usuariosRouter from "./routes/usuarios.routes";
import logoutRouter from "./routes/logout.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true, // ← esto permite que las cookies viajen entre orígenes distintos
  }),
);
app.use(cookieParser());

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.use("/tareas", tareasRouter);
app.use("/chat", chatRouter);
app.use("/", authRouter);
app.use("/usuarios", usuariosRouter);
app.use("/logout", logoutRouter);

app.use(manejadorErrores);

const PUERTO = 3000;

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
