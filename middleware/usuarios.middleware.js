import { body, param, validationResult } from "express-validator";

export const resultadosValidacao = (req, res, next) => {
    const err = validationResult(req)
    if (!err.isEmpty()) return res.status(400).json({ error: err.array() })

    next()
}

// REGRAS DE LOGIN DE USUÁRIOS
export const userLoginRules = () => {
    return [
        body('email')
        .isEmail().withMessage("Email inválido")
        .notEmpty().withMessage("O campo login é obrigatório"),
        body('senha')
        .isString().withMessage("Tente outra senha")
        .notEmpty().withMessage("O campo senha é obrigatório")
    ]
}

// REGRAS DE CRIAÇÃO DE USUÁRIOS
export const userCreationRules = () => {
    return [
        body('nome')
        .isString().withMessage("Tente outro")
        .notEmpty().withMessage("O campo nome é obrigatório"),
        body('email')
        .isEmail().withMessage("Email inválido")
        .notEmpty().withMessage("O campo login é obrigatório"),
        body('password')
        .isString().withMessage("Tente outra senha")
        .notEmpty().withMessage("O campo senha é obrigatório")
    ]
}

// REGRAS DE ATUALIZAÇÃO DE USUÁRIOS
export const userUpdateRulesPUT = () => {
    return [
        param('id')
        .isInt().withMessage("Tente outro")
        .notEmpty().withMessage("O campo id é obrigatório"),
        body('nome')
        .isString().withMessage("Tente outro")
        .notEmpty().withMessage("O campo nome é obrigatório"),
        body('email')
        .isEmail().withMessage("Email inválido")
        .notEmpty().withMessage("O campo login é obrigatório"),
        body('senha')
        .isString().withMessage("Tente outra senha")
        .notEmpty().withMessage("O campo senha é obrigatório"),
        body('idDepartamento')
        .isInt().withMessage("Tente outro")
        .notEmpty().withMessage("O campo idDepartamento é obrigatório"),
    ]
}

export const userUpdateRulesPATCH = () => {
    return [
        param('id')
        .isInt().withMessage("Tente outro")
        .optional().withMessage("O campo id é obrigatório"),
        body('nome')
        .isString().withMessage("Tente outro")
        .optional().withMessage("O campo nome é obrigatório"),
        body('email')
        .isEmail().withMessage("Email inválido")
        .optional().withMessage("O campo login é obrigatório"),
        body('senha')
        .isString().withMessage("Tente outra senha")
        .optional().withMessage("O campo senha é obrigatório"),
        body('idDepartamento')
        .isInt().withMessage("Tente outro")
        .optional().withMessage("O campo idDepartamento é obrigatório"),
    ]
}

// REGRAS DE DELETAR USUÁRIOS
export const userRemoveRules = () => {
    return [
        param('id')
        
        .notEmpty().withMessage("O campo id é obrigatório"),
    ]
}