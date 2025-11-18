import mongoose from "mongoose";
import bcrypt from "bcrypt"; //conferir se o bcrypt ta instalado (pra mim n tava)

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  idDepartamento: { type: mongoose.Schema.Types.ObjectId, ref: "Departamento" },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

UsuarioSchema.pre("save", async function name(next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UsuarioSchema.methods.compararSenha = async function (senhaDigitada) {
  return await bcrypt.compare(senhaDigitada, this.password);
};

export default mongoose.model("Usuario", UsuarioSchema);
