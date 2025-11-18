import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.model.js";
import { userLoginRules } from "../validators/usuarios.validator.js";
import { resultadosValidacao } from "../middleware/validation.middleware.js";

export const JWTSECRET = "M9Z.Jcp@518>";

const roteadorLogin = Router();

roteadorLogin.post(
  "/login",
  userLoginRules(),
  resultadosValidacao,
  async (req, res) => {
    try {
      const { email, senha } = req.body;

      const usuario = await Usuario.findOne({ email: email });
      if (!usuario) {
        return res.status(401).json({ mensagem: "Email não encontrado" });
      }
      const senhaCorreta = await bcrypt.compare(senha, usuario.password);
      if (!senhaCorreta) {
        return res.status(401).json({ mensagem: "Senha incorreta" });
      }

      const payload = {
        id: usuario._id,
        email: usuario.email,
        role: usuario.role,
      };

      const token = jwt.sign(payload, JWTSECRET, { expiresIn: "72h" });

      return res.json({ token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro interno no login" });
    }
  }
);

export default roteadorLogin;
