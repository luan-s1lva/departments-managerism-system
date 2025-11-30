import DepartamentoModel from "../models/Departamento.model.js";

class DepartamentoRepository {
  async criar(dados) {
    return await DepartamentoModel.create(dados);
  }
  async buscarTodos() {
    return await DepartamentoModel.find();
  }
  async buscarPorId(id) {
    return await DepartamentoModel.findById(id).populate("idResponsavel");
  }
  async buscarPorNome(nome) {
    return await DepartamentoModel.findOne({ nome });
  }
  async buscarPorTipo(tipo) {
    return await DepartamentoModel.findOne({ tipo });
  }
  async buscarPorStatus(status) {
    return await DepartamentoModel.find({ status });
  }
  async atualizarDados(id, dados) {
    return await DepartamentoModel.findByIdAndUpdate(id, dados, {
      new: true,
    });
  }
  async deletar(id) {
    return await DepartamentoModel.findByIdAndDelete(id);
  }
}

export default new DepartamentoRepository();
