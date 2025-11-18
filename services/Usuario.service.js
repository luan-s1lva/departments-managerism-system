import UsuarioRepository from "../repositories/Usuario.repository.js";
import { UsuarioDTO } from "../dtos/Usuario.dto.js";
import UsuarioModel from "../models/Usuario.model.js";

class UsuarioService {
  async criarUsuario(dados) {
    const dto = new UsuarioDTO(dados);

    const existe = await UsuarioRepository.buscarPorEmail(dto.email);
    if (existe) {
      throw new Error("Email já cadastrado!");
    }

    const novoUsuario = await UsuarioModel.create({
      nome: dto.nome,
      email: dto.email,
      password: dto.password,
      role: dto.role,
      idDepartamento: dto.idDepartamento,
    });

    const { password, ...dadosSemSenha } = novoUsuario.toObject();

    return dadosSemSenha;
  }

  async listar() {
    return await UsuarioRepository.buscarTodos();
  }

  async buscar(id) {
    const usuario = await UsuarioRepository.buscarPorId(id);
    if (!usuario) throw new Error("Usuário não encontrado");
    return usuario;
  }

  async atualizar(id, dados) {
    const dto = new UsuarioDTO(dados);

    if (dto.password) {
      const usuario = await UsuarioModel.findById(id);
      usuario.password = dto.password;
      usuario.nome = dto.nome;
      usuario.email = dto.email;
      usuario.idDepartamento = dto.idDepartamento;
      usuario.role = dto.role;
      await usuario.save();
      return await UsuarioRepository.buscarPorId(id);
    } else {
      return await UsuarioRepository.atualizar(id, dto);
    }
  }

  async deletar(id) {
    const removido = await UsuarioRepository.deletar(id);
    if (!removido) throw new Error("Usuário não encontrado");
    return removido;
  }
}

export default new UsuarioService();
