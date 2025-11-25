import express from "express";
import { conectarMongo } from "./config/dbMongooseConfig.js";

import usuariosRoutes from "./routes/usuarios.routes.js";
// import departamentosRoutes from "./routes/departamentos.routes.js";
import loginRoutes from "./routes/auth.routes.js";

const app = express();
const PORTA = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
conectarMongo();

app.use("/api/auth", loginRoutes);
app.use("/api/usuarios", usuariosRoutes);
// app.use("/api/departamentos", departamentosRoutes);

// MIDDLEWARE DE TRATAMENTO DE ERRO 404
app.use((req, res, next) => {
  res.status(404).json({ mensagem: "Rota inexistente!" });
});

// INICIALIZAÇÃO DO SERVIDOR
app.listen(PORTA, () => {
  console.log(`Servidor rodando em: http://localhost:${PORTA}`);
});
