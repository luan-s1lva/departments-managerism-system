import { body, param } from "express-validator";
import mongoose from "mongoose";

// Função para validar ObjectId do Mongo
const isObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

// REGRAS DE LOGIN DE USUÁRIOS
export const userLoginRules = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Email inválido")
      .notEmpty()
      .withMessage("O campo email é obrigatório"),

    body("senha")
      .isString()
      .withMessage("Senha inválida")
      .notEmpty()
      .withMessage("O campo senha é obrigatório")
  ];
};

// REGRAS DE CRIAÇÃO DE USUÁRIOS
export const userCreationRules = () => {
  return [
    body("nome")
      .notEmpty().withMessage("O campo nome é obrigatório")
      .isString().withMessage("Nome inválido"),

    body("email")
      .isEmail().withMessage("Email inválido")
      .notEmpty().withMessage("O campo email é obrigatório"),

    body("password")
      .isString().withMessage("Senha inválida")
      .notEmpty().withMessage("O campo senha é obrigatório")
  ];
};

// REGRAS DE ATUALIZAÇÃO COMPLETA (PUT)
export const userUpdateRulesPUT = () => {
  return [
    param("id")
      .custom(isObjectId)
      .withMessage("ID inválido"),

    body("nome")
      .notEmpty().withMessage("O campo nome é obrigatório")
      .isString().withMessage("Nome inválido"),

    body("email")
      .isEmail().withMessage("Email inválido")
      .notEmpty().withMessage("O campo email é obrigatório"),

    body("password")
      .isString().withMessage("Senha inválida")
      .notEmpty().withMessage("O campo senha é obrigatório"),

    body("idDepartamento")
      .custom(isObjectId)
      .withMessage("ID de departamento inválido")
  ];
};

// REGRAS DE ATUALIZAÇÃO PARCIAL (PATCH)
export const userUpdateRulesPATCH = () => {
  return [
    param("id")
      .custom(isObjectId)
      .withMessage("ID inválido"),

    body("nome")
      .optional()
      .isString().withMessage("Nome inválido"),

    body("email")
      .optional()
      .isEmail().withMessage("Email inválido"),

    body("password")
      .optional()
      .isString().withMessage("Senha inválida"),

    body("idDepartamento")
      .optional()
      .custom(isObjectId)
      .withMessage("ID de departamento inválido")
  ];
};

// REGRAS DE DELETAR USUÁRIOS
export const userRemoveRules = () => {
  return [
    param("id")
      .custom(isObjectId)
      .withMessage("ID inválido")
  ];
};
