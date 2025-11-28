import { body, param } from "express-validator";
import mongoose from "mongoose";

// Função para validar ObjectId do Mongo
const isObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

// REGRAS DE CRIAÇÃO DE DEPARTAMENTOS
export const deptCreationRules = () => {
  return [
    body("nome")
      .isString()
      .withMessage("Tente outro")
      .notEmpty()
      .withMessage("O campo nome é obrigatório"),
    body("tipo")
      .isString()
      .withMessage("tipo inválido")
      .notEmpty()
      .withMessage("O campo tipo é obrigatório"),
    body("descricao")
      .isString()
      .withMessage("Tente outra descrição")
      .notEmpty()
      .withMessage("O campo descricao é obrigatório"),
    body("dataCriacao")
      .isDate()
      .withMessage("Tente outra data")
      .notEmpty()
      .withMessage("O campo dataCriacao é obrigatório"),
    body("idResponsavel")
      .notEmpty()
      .withMessage("O campo idResponsavel é obrigatório"),
    body("quantidadeFuncionarios")
      .isInt()
      .withMessage("Tente outro")
      .notEmpty()
      .withMessage("O campo quantidadeFuncionarios é obrigatório"),
    body("status")
      .isBoolean()
      .withMessage("Deve ser true ou false")
      .notEmpty()
      .withMessage("O campo status é obrigatório"),
  ];
};

// REGRAS DE ATUALIZAÇÃO DE DEPARTAMENTOS
export const deptUpdateRulesPUT = () => {
  return [
    param("id").custom(isObjectId).withMessage("ID inválido"),
    body("nome")
      .isString()
      .withMessage("Tente outro")
      .notEmpty()
      .withMessage("O campo nome é obrigatório"),
    body("tipo")
      .isString()
      .withMessage("tipo inválido")
      .notEmpty()
      .withMessage("O campo tipo é obrigatório"),
    body("descricao")
      .isString()
      .withMessage("Tente outra descrição")
      .notEmpty()
      .withMessage("O campo descricao é obrigatório"),
    body("dataCriacao")
      .isDate()
      .withMessage("Tente outra data")
      .notEmpty()
      .withMessage("O campo dataCriacao é obrigatório"),
    body("idResponsavel")
      .custom(isObjectId)
      .withMessage("ID de departamento inválido"),
    body("quantidadeFuncionarios")
      .isInt()
      .withMessage("Tente outro")
      .notEmpty()
      .withMessage("O campo quantidadeFuncionarios é obrigatório"),
    body("status")
      .isBoolean()
      .withMessage("Deve ser true ou false")
      .notEmpty()
      .withMessage("O campo status é obrigatório"),
  ];
};

export const deptUpdateRulesPATCH = () => {
  return [
    param("id").custom(isObjectId).withMessage("ID inválido"),
    body("nome")
      .isString()
      .withMessage("Tente outro")
      .optional()
      .withMessage("O campo nome é obrigatório"),
    body("tipo")
      .isString()
      .withMessage("tipo inválido")
      .optional()
      .withMessage("O campo tipo é obrigatório"),
    body("descricao")
      .isString()
      .withMessage("Tente outra descrição")
      .optional()
      .withMessage("O campo descricao é obrigatório"),
    body("dataCriacao")
      .isDate()
      .withMessage("Tente outra data")
      .optional()
      .withMessage("O campo dataCriacao é obrigatório"),
    body("idResponsavel")
      .optional()
      .custom(isObjectId)
      .withMessage("ID de responsavel inválido"),
    body("quantidadeFuncionarios")
      .isInt()
      .withMessage("Tente outro")
      .optional()
      .withMessage("O campo quantidadeFuncionarios é obrigatório"),
    body("status")
      .isBoolean()
      .withMessage("Deve ser true ou false")
      .optional()
      .withMessage("O campo status é obrigatório"),
  ];
};

// REGRAS DE DELETAR DEPARTAMENTOS
export const deptRemoveRules = () => {
  return [param("id").custom(isObjectId).withMessage("ID inválido")];
};
