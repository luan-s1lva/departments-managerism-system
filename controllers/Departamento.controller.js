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
    try {
      const lista = await DepartamentoService.listar();
      return res.json(lista);
    } catch (e) {
      return res.status(500).json({ erro: e.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const dept = await DepartamentoService.buscarPorId(id);
      return res.json(dept);
    } catch (e) {
      return res.status(404).json({ erro: e.message });
    }
  }

  async buscarPorNome(req, res) {
    try {
      const termo = req.params.termoBusca;
      const dept = await DepartamentoService.buscarPorNome(termo);
      return res.json(dept);
    } catch (e) {
      return res.status(400).json({ erro: e.message });
    }
  }

  async buscarPorStatus(req, res) {
    try {
      const termo = req.params.termoBusca;
      const dept = await DepartamentoService.buscarPorStatus(termo);
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
