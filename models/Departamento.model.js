import mongoose from "mongoose";

const DepartamentoSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  tipo: { type: String, required: true },
  descricao: { type: String, required: true },
  dataCriacao: { type: Date },
  idResponsavel: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  status: { type: Boolean },
  quantidadeFuncionarios: { type: Number, required: true },
});

export default mongoose.model("Departamento", DepartamentoSchema);
