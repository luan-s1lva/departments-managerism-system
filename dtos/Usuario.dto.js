export class UsuarioDTO {
  constructor({ nome, email, password, idDepartamento, role }) {
    this.nome = nome;
    this.email = email;
    this.password = password;
    this.idDepartamento = idDepartamento;
    this.role = role;
  }
}
