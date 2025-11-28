import UsuarioService from "../services/Usuario.service.js";

class WebControlller {
  static async listUsersPage(req, res, next) {
    try {
      const users = await UsuarioService.listarNaPag();

      res.render("index", {
        title: "Usuários Cadastrados",
        users: users,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default WebControlller;
