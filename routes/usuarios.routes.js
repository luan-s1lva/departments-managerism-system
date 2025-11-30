import { Router } from "express";
import UsuarioController from "../controllers/Usuario.controller.js";
import {
  userCreationRules,
  userUpdateRulesPUT,
  userUpdateRulesPATCH,
  userRemoveRules,
} from "../validators/usuarios.validator.js";
import { resultadosValidacao } from "../middleware/validation.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/permission.middleware.js";

const roteadorUsuarios = Router(); /* /api/usuarios/ */

roteadorUsuarios.post(
  "/",
  userCreationRules(),
  resultadosValidacao,
  (req, res) => UsuarioController.criar(req, res),
);

roteadorUsuarios.get("/", authMiddleware, checkRole("admin"), (req, res) =>
  UsuarioController.listar(req, res),
);

roteadorUsuarios.get(
  "/buscar/:id",
  authMiddleware,
  checkRole("admin"),
  (req, res) => UsuarioController.buscar(req, res),
);

roteadorUsuarios.put(
  // atualizar tudo
  "/editar/:id",
  authMiddleware,
  checkRole("admin"),
  userUpdateRulesPUT(),
  resultadosValidacao,
  (req, res) => UsuarioController.atualizar(req, res),
);

roteadorUsuarios.patch(
  // atualizar uma parte
  "/editar/:id",
  authMiddleware,
  checkRole("admin"),
  userUpdateRulesPATCH(),
  resultadosValidacao,
  (req, res) => UsuarioController.atualizar(req, res),
);

roteadorUsuarios.delete(
  "/deletar/:id",
  authMiddleware,
  checkRole("admin"),
  userRemoveRules(),
  resultadosValidacao,
  (req, res) => UsuarioController.deletar(req, res),
);

export default roteadorUsuarios;
