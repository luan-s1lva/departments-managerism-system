import jwt from "jsonwebtoken";
import { JWTSECRET } from "../routes/auth.routes.js";

const authMiddleware = (req, res, next) => {
  const tokenCompleto = req.headers.authorization;

  if (!tokenCompleto)
    return res.status(401).json({ mensagem: "Token não fornecido" });

  const tokenIncompleto = tokenCompleto.split(" ");
  if (tokenIncompleto.length !== 2)
    res.status(401).json({ mensagem: "Erro no formato do token" });

  const [scheme, token] = tokenIncompleto;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ mensagem: "Token mal formatado." });
  }

  jwt.verify(token, JWTSECRET, (err, decoded) => {
    if (err) return res.status(401).json({ mensagem: "Token inválido" });

    req.user = decoded;

    next();
  });
};

export default authMiddleware;
