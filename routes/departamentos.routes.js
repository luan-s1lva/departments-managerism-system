import db from "../config/dbConfig.js";
import { Router } from "express";
import { deptCreationRules, deptRemoveRules, deptUpdateRulesPATCH, deptUpdateRulesPUT } from "../middleware/departamentos.middleware.js";
import { resultadosValidacao } from "../middleware/usuarios.middleware.js";
import { checkRole } from "../middleware/permission.middleware.js"

const roteadorDepartamentos = Router();

roteadorDepartamentos.post("/salvar", deptCreationRules(), checkRole("admin"), resultadosValidacao, async (req, res) => {
  try {
    const {
      nome,
      tipo,
      descricao,
      dataCriacao,
      idResponsavel,
      status,
      quantidadeFuncionarios,
    } = req.body;

    const departamentoExiste = db.data.departamentos.find(
      (d) => d.nome === nome,
    );
    if (departamentoExiste) {
      return res.status(409).json({ message: "Este departamento já existe." });
    }

    const novoDepartamento = {
      id:
        (db.data.departamentos.length > 0
          ? Math.max(...db.data.departamentos.map((d) => d.id))
          : 0) + 1,
      nome,
      tipo,
      descricao,
      dataCriacao,
      idResponsavel,
      status,
      quantidadeFuncionarios,
    };

    db.data.departamentos.push(novoDepartamento);

    await db.write();

    const resposta = { ...novoDepartamento };

    res.status(201).json(resposta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao processar a requisição." });
  }
});

roteadorDepartamentos.put("/editar/:id", deptUpdateRulesPUT(), checkRole("admin"), resultadosValidacao, async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, tipo, descricao, dataCriacao, idResponsavel, status, quantidadeFuncionarios } =
      req.body;

    const departamentoExiste = db.data.departamentos.find(
      (d) => d.id === parseInt(id, 10),
    );
    if (!departamentoExiste) {
      return res.status(409).json({ message: "Este departamento não existe." });
    }

    ((departamentoExiste.nome = nome),
      (departamentoExiste.tipo = tipo),
      (departamentoExiste.descricao = descricao),
      (departamentoExiste.dataCriacao = dataCriacao),
      (departamentoExiste.idResponsavel = idResponsavel),
      (departamentoExiste.status = status),
      (departamentoExiste.quantidadeFuncionarios = quantidadeFuncionarios),
      await db.write());

    const resposta = departamentoExiste;

    res.status(200).json(resposta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao processar a requisição." });
  }
});

roteadorDepartamentos.patch("/editar/:id", deptUpdateRulesPATCH(), checkRole("admin"), resultadosValidacao, async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, tipo, descricao, dataCriacao, idResponsavel, status, quantidadeFuncionarios } =
      req.body;

    const departamentoExiste = db.data.departamentos.find(
      (d) => d.id === parseInt(id, 10),
    );
    if (!departamentoExiste) {
      return res.status(409).json({ message: "Este departamento não existe." });
    }

    ((departamentoExiste.nome = nome),
      (departamentoExiste.tipo = tipo),
      (departamentoExiste.descricao = descricao),
      (departamentoExiste.dataCriacao = dataCriacao),
      (departamentoExiste.idResponsavel = idResponsavel),
      (departamentoExiste.status = status),
      (departamentoExiste.quantidadeFuncionarios = quantidadeFuncionarios),
      await db.write());

    const resposta = departamentoExiste;

    res.status(200).json(resposta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao processar a requisição." });
  }
});

roteadorDepartamentos.delete("/deletar/:id", deptRemoveRules(), checkRole("admin"), resultadosValidacao, async (req, res) => {
  try {
    const { id } = req.params;

    const departamentoExiste = db.data.departamentos.find(
      (d) => d.id === parseInt(id, 10),
    );
    if (!departamentoExiste) {
      return res.status(409).json({ message: "Este departamento não existe." });
    }

    const index = db.data.departamentos.findIndex((d) => d.id === parseInt(id));

    db.data.departamentos.splice(index, 1);

    await db.write();

    res.status(200).json({ mensagem: "Departamento removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao processar a requisição." });
  }
});

roteadorDepartamentos.get("/buscar/:termoBusca", async (req, res) => {
  try {
    const { termoBusca } = req.params;
    let resposta = "";

    db.data.departamentos.map((d) => {
      if (d.nome.toUpperCase() == termoBusca.toUpperCase()) {
        resposta = { ...d };
      }
    });

    res.status(200).json(resposta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao processar a requisição." });
  }
});

roteadorDepartamentos.get("/", async (req, res) => {
  try {
    const resposta = db.data.departamentos;

    res.status(200).json(resposta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao processar a requisição." });
  }
});

export default roteadorDepartamentos;
