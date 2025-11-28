import DepartamentoService from "../services/Departamento.service.js";

class DepartamentoController {
  async criar(req, res) {
    try {
      const novo = await DepartamentoService.criarDepartamento(req.body);
      return res.status(201).json(novo);
    } catch (e) {
      return res.status(400).json({ erro: e.message });
    }
  }

  async listar(req, res) {
    const lista = await DepartamentoService.listar();
    return lista;
  }

  async buscarPorNome(req, res) {
    try {
      const dept = await DepartamentoService.buscarPorNome(req.body.nome);
      return res.json(dept);
    } catch (e) {
      return res.status(400).json({ erro: e.message });
    }
  }

  async buscarPorStatus(req, res) {
    try {
      const dept = await DepartamentoService.buscarPorStatus(req.body.status);
      return res.json(dept);
    } catch (e) {
      return res.status(400).json({ erro: e.message });
    }
  }

  async atualizar(req, res) {
    try {
      const atualizado = await DepartamentoService.atualizar(
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
      await DepartamentoService.deletar(req.params.id);
      return res.json({ mensagem: "Departamento deletado com sucesso" });
    } catch (e) {
      return res.status(400).json({ erro: e.message });
    }
  }
}

export default new DepartamentoController();
