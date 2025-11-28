import DepartamentoModel from "../models/Departamento.model.js";
import DepartamentoRepository from "../repositories/Departamento.repository.js";

class DepartamentoService {
  async criarDepartamento(dados) {
    const dept = new DepartamentoModel(dados);

    const existe = await DepartamentoRepository.buscarPorNome(dept.nome);
    if (existe) {
      throw new Error("Departamento já cadastrado!");
    }

    const novoDepartamento = await DepartamentoModel.create({
      nome: dept.nome,
      tipo: dept.tipo,
      descricao: dept.descricao,
      dataCriacao: dept.dataCriacao,
      idResponsavel: dept.idResponsavel,
      status: dept.status,
      quantidadeFuncionarios: dept.quantidadeFuncionarios,
    });

    return novoDepartamento;
  }

  async listar() {
    return await DepartamentoRepository.buscarTodos();
  }

  async buscarPorId(id) {
    const dept = await DepartamentoRepository.buscarPorId(id);
    if (!dept) throw new Error("Departamento não encontrado");
    return dept;
  }

  async buscarPorNome(nome) {
    const dept = await DepartamentoRepository.buscarPorNome(nome);
    if (!dept) throw new Error("Departamento não encontrado");
    return dept;
  }

  async buscarPorStatus(status) {
    const dept = await DepartamentoRepository.buscarPorStatus(status);
    if (!dept) throw new Error("Digite 0 ou 1");
    return dept;
  }

  async buscarPorTipo(tipo) {
    const dept = await DepartamentoRepository.buscarPorTipo(tipo);
    if (!dept) throw new Error("Tipo não encontrado");
    return dept;
  }

  async atualizar(id, dados) {
    const atualizado = await DepartamentoRepository.atualizarDados(id, dados);

    if (!atualizado) {
      throw new Error("Departamento não encontrado");
    }

    return atualizado;
  }

  async deletar(id) {
    const removido = await DepartamentoRepository.deletar(id);
    if (!removido) throw new Error("Departamento não encontrado");
    return removido;
  }
}

export default new DepartamentoService();
