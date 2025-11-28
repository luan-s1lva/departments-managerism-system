import { Router } from "express";
import {
  deptCreationRules,
  deptRemoveRules,
  deptUpdateRulesPATCH,
  deptUpdateRulesPUT,
} from "../validators/departamentos.validator.js";
import { resultadosValidacao } from "../middleware/validation.middleware.js";
import { checkRole } from "../middleware/permission.middleware.js";
import DepartamentoController from "../controllers/Departamento.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const roteadorDepartamentos = Router();

roteadorDepartamentos.post(
  "/salvar",
  authMiddleware,
  deptCreationRules(),
  checkRole("admin"),
  resultadosValidacao,
  (req, res) => DepartamentoController.criar(req, res),
);

roteadorDepartamentos.put(
  "/editar/:id",
  deptUpdateRulesPUT(),
  checkRole("admin"),
  resultadosValidacao,
  (req, res) => DepartamentoController.atualizar(req, res),
);

roteadorDepartamentos.patch(
  "/editar/:id",
  deptUpdateRulesPATCH(),
  checkRole("admin"),
  resultadosValidacao,
  (req, res) => DepartamentoController.atualizar(req, res),
);

roteadorDepartamentos.delete(
  "/deletar/:id",
  deptRemoveRules(),
  checkRole("admin"),
  resultadosValidacao,
  (req) => DepartamentoController.deletar(req),
);

roteadorDepartamentos.get(
  "/buscar",
  authMiddleware,
  (req) => DepartamentoController.listar(),
);

roteadorDepartamentos.get(
  "/buscar/nome/:termoBusca",
  authMiddleware,
  (req, res) => DepartamentoController.buscarPorNome(req.body.nome),
);

roteadorDepartamentos.get(
  "/buscar/status/:termoBusca",
  authMiddleware,
  (req, res) => DepartamentoController.buscarPorStatus(req.body.status),
);

export default roteadorDepartamentos;
