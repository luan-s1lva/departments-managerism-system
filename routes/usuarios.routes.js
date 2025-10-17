import { Router } from "express";
import bcrypt from "bcrypt";
import db from "../config/dbConfig.js";
import { resultadosValidacao, userRemoveRules, userUpdateRulesPATCH, userUpdateRulesPUT } from "../middleware/usuarios.middleware.js";

const roteadorUsuarios = Router();

// RETORNA TODOS USERS
roteadorUsuarios.get("/", (req, res) => {
  res.status(200).json(db.data.usuarios);
});

roteadorUsuarios.put("/editar/:id", userUpdateRulesPUT(), resultadosValidacao, async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, password, idDepartamento, role } = req.body;

    const usuarioExiste = db.data.usuarios.find(
      (d) => d.id === parseInt(id, 10),
    );
    if (!usuarioExiste) {
      return res.status(404).json({ message: "Este usuário não existe." });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(password, salt);

    usuarioExiste.nome = nome;
    usuarioExiste.email = email;
    usuarioExiste.password = senhaCriptografada;
    usuarioExiste.idDepartamento = idDepartamento;
    usuarioExiste.role = role

    await db.write();

    delete usuarioExiste.password;
    const resposta = usuarioExiste;

    res.status(200).json(resposta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `${error}` });
  }
});

roteadorUsuarios.patch("/editar/:id", userUpdateRulesPATCH(), resultadosValidacao, async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, password, idDepartamento, role } = req.body;

    const usuarioExiste = db.data.usuarios.find(
      (d) => d.id === parseInt(id, 10),
    );
    if (!usuarioExiste) {
      return res.status(404).json({ message: "Este usuário não existe." });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(password, salt);

    usuarioExiste.nome = nome;
    usuarioExiste.email = email;
    usuarioExiste.password = senhaCriptografada;
    usuarioExiste.idDepartamento = idDepartamento;
    usuarioExiste.role = role
    
    await db.write();

    delete usuarioExiste.password;
    const resposta = usuarioExiste;

    res.status(200).json(resposta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `${error}` });
  }
});

roteadorUsuarios.delete("/deletar/:id", userRemoveRules(), resultadosValidacao, async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioExiste = db.data.usuarios.find(
      (u) => u.id === parseInt(id, 10),
    );
    if (!usuarioExiste) {
      return res
        .status(404)
        .json({ message: "Este usuário não foi encontrado." });
    }

    const index = db.data.usuarios.findIndex((u) => u.id === parseInt(id));

    db.data.usuarios.splice(index, 1);

    await db.write();

    res.status(200).json({ mensagem: "Usuário removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao processar a requisição." });
  }
});

roteadorUsuarios.get("/buscar/:termoBusca", async (req, res) => {
  try {
    const { termoBusca } = req.params;
    let resposta = "";

    db.data.usuarios.map((u) => {
      if (u.nome.toUpperCase() == termoBusca.toUpperCase()) {
        resposta = { ...u };
      }
    });

    delete resposta.id;
    delete resposta.password;
    
    res.status(200).json(resposta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao processar a requisição." });
  }
});

export default roteadorUsuarios;
