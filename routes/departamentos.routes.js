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

roteadorDepartamentos.get(
  "/buscar/nome/:termoBusca",
  authMiddleware,
  (req, res) => DepartamentoController.buscarPorNome(req, res),
);

roteadorDepartamentos.get(
  "/buscar/status/:termoBusca",
  authMiddleware,
  (req, res) => DepartamentoController.buscarPorStatus(req, res),
);

roteadorDepartamentos.get("/buscar", authMiddleware, (req, res) =>
  DepartamentoController.listar(req, res),
);

roteadorDepartamentos.get("/buscar/:id", (req, res) =>
  DepartamentoController.buscarPorId(req, res),
);

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
  authMiddleware,
  deptUpdateRulesPUT(),
  checkRole("admin"),
  resultadosValidacao,
  (req, res) => DepartamentoController.atualizar(req, res),
);

roteadorDepartamentos.patch(
  "/editar/:id",
  authMiddleware,
  deptUpdateRulesPATCH(),
  checkRole("admin"),
  resultadosValidacao,
  (req, res) => DepartamentoController.atualizar(req, res),
);

roteadorDepartamentos.delete(
  "/deletar/:id",
  authMiddleware,
  checkRole("admin"),
  deptRemoveRules(),
  resultadosValidacao,
  (req, res) => DepartamentoController.deletar(req, res),
);

export default roteadorDepartamentos;
