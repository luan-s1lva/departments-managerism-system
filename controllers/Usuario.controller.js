import UsuarioService from "../services/Usuario.service.js";

class UsuarioController {
  async criar(req, res) {
    try {
      const novo = await UsuarioService.criarUsuario(req.body);
      return res.status(201).json(novo);
    } catch (e) {
      return res.status(400).json({ erro: e.message });
    }
  }

  async listar(req, res) {
    const lista = await UsuarioService.listar();
    return res.json(lista);
  }

  async buscar(req, res) {
    try {
      const usuario = await UsuarioService.buscar(req.params.id);
      return res.json(usuario);
    } catch (e) {
      return res.status(400).json({ erro: e.message });
    }
  }

  async atualizar(req, res) {
    try {
      const atualizado = await UsuarioService.atualizar(
        req.params.id,
        req.body,
      );
      return res.json(atualizado);
    } catch (e) {
      return res.status(400).json({ erro: e.message });
    }
  }

  async deletar(req, res) {
    try {
      await UsuarioService.deletar(req.params.id);
      return res.json({ mensagem: "Usuário deletado com sucesso" });
    } catch (e) {
      return res.status(400).json({ erro: e.message });
    }
  }
}

export default new UsuarioController();
