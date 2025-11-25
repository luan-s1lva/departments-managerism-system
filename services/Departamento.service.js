import DepartamentoModel from "../models/Departamento.model";
import DepartamentoRepository from "../repositories/Departamento.repository";

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
    const dept = await DepartamentoModel.findById(id);
    
    dept.nome = dados.nome;
    dept.tipo = dados.tipo;
    dept.quantidadeFuncionarios = dados.quantidadeFuncionarios;
    dept.status = dados.status;
    dept.descricao = dados.descricao;
    dept.dataCriacao = dados.dataCriacao;
    
    await dept.save();

    return await UsuarioRepository.buscarPorId(id);
  }

  async deletar(id) {
    const removido = await DepartamentoRepository.deletar(id);
    if (!removido) throw new Error("Departamento não encontrado");
    return removido;
  }
}

export default new DepartamentoService();
