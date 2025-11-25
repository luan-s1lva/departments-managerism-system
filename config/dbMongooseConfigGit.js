import mongoose from "mongoose";

export async function conectarMongo() {
  try {
    await mongoose.connect(
      "mongodb+srv://NOME USUARIO:SENHA_USER@clusterNOME_DO_CLUSTER.82rquym.mongodb.net/NOME_BANCO?retryWrites=true&w=majority",
    );

    console.log("Conectado ao MongoDB Atlas com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
}
