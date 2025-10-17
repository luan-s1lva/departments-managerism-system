import express, { json } from "express";
import roteadorUsuarios from "./routes/usuarios.routes.js";
import roteadorDepartamentos from "./routes/departamentos.routes.js";
import roteadorLogin from "./routes/auth.routes.js";
import authMiddleware from "./middleware/auth.middleware.js";
import db from "./config/dbConfig.js";
import bcrypt from "bcrypt";
import { resultadosValidacao, userCreationRules } from "./middleware/usuarios.middleware.js";

const app = express();
const PORTA = 3000;

app.use(json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ROTA DE CRIAR USUÁRIOS
app.post("/salvar", userCreationRules(),resultadosValidacao, async (req, res) => {
  try {
    const { nome, email, password, role } = req.body;

    const existe = db.data.usuarios.find((usuario) => usuario.email === email);
    if (existe) {
      res.status(409).send("Email já está em uso");
    }

    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(password, salt);

    const novoUser = {
      id:
        (db.data.usuarios.length > 0
          ? Math.max(...db.data.usuarios.map((u) => u.id))
          : 0) + 1,
      nome,
      email,
      password: senhaCriptografada,
      role: role
    };

    db.data.usuarios.push(novoUser);

    await db.write();

    const resposta = { ...novoUser };

    delete resposta.password;

    res.status(201).json(resposta);
  } catch (e) {
    // console.error(e);
    res.status(500).send({ message: `${e}` });
  }
});

// INSTANCIAMENTO DAS ROTAS
app.use("/api/usuarios", authMiddleware, roteadorUsuarios);
app.use("/api/departamentos", authMiddleware, roteadorDepartamentos);
app.use("/api", roteadorLogin)

// MIDDLEWARE DE TRATAMENTO DE ERRO 404
app.use((req, res, next) => {
  res.status(404).json({ mensagem: "Rota inexistente!" });
});

// INICIALIZAÇÃO DO SERVIDOR
app.listen(PORTA, () => {
  console.log(`Servidor rodando em: http://localhost:${PORTA}`);
});