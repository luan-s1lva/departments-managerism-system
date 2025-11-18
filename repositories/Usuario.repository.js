import UsuarioModel from "../models/Usuario.model.js";

class UsuarioRepository {
  async criar(dados) {
    return await UsuarioModel.create(dados);
  }
  async buscarTodos() {
    return await UsuarioModel.find().select("-password");
  }
  async buscarPorEmail(email) {
    return await UsuarioModel.findOne({ email });
  }
  async buscarPorId(id) {
    return await UsuarioModel.findById(id).select("-password");
  }
  async atualiarDados(id, dados) {
    return await UsuarioModel.findByIdAndUpdate(id, dados, {
      new: true,
    }).select("-password");
  }
  async deletar(id) {
    return await UsuarioModel.findByIdAndDelete(id);
  }
}

export default new UsuarioRepository();
