const mongoose = require("../db/conn");
const { Schema } = mongoose;

const perguntaSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true, // Garante que não haverá IDs duplicados
      required: true,
    },
    pergunta: {
      type: String,
      required: true,
    },
    resposta: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Middleware para definir o ID automaticamente antes de salvar
perguntaSchema.pre("save", async function (next) {
  if (!this.id) {
    const lastPergunta = await mongoose.model("Pergunta").findOne().sort("-id");
    this.id = lastPergunta ? lastPergunta.id + 1 : 1; // Incrementa o último ID ou começa com 1
  }
  next();
});

const Pergunta = mongoose.model("Pergunta", perguntaSchema);

module.exports = Pergunta;
