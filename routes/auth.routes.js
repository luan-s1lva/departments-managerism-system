import { Router } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import db from "../config/dbConfig.js";
import { resultadosValidacao, userLoginRules } from "../middleware/usuarios.middleware.js";

export const JWTSECRET = "M9Z.Jcp@518>";

const roteadorLogin = Router();

// ROTA DE LOGIN
roteadorLogin.post("/login", userLoginRules(), resultadosValidacao, async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ mensagem: "Login e senha obrigatórios" });
    }

    const procuraNoBD = db.data.usuarios.find((u) => u.email === email);

    if (!procuraNoBD) {
      res.status(401).send("Email não encontrado");
    }

    const comparaSenha = await bcrypt.compare(senha, procuraNoBD.password);

    if (!comparaSenha) {
      res.status(401).send("Credenciais inválidas");
    }

    const payload = {
      userId: procuraNoBD.id,
      login: procuraNoBD.email,
      role: procuraNoBD.role
    };

    const token = jwt.sign(payload, JWTSECRET, { expiresIn: "72h" });

    res.status(200).json({ token: token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: `${e}` });
  }
});

export default roteadorLogin;
