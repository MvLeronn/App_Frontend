const Pergunta = require("../models/Pergunta");

module.exports = class PerguntaController {
  // Método para criar uma nova pergunta
  static async create(req, res) {
    const { pergunta } = req.body;

    // checa se a pergunta foi enviada
    if (!pergunta) {
      res.status(422).json({ message: "A Pergunta é obrigatória" });
      return;
    }

    const novaPergunta = new Pergunta({
      pergunta,
      resposta: "",
    });

    // Salva a pergunta no banco
    try {
      await novaPergunta.save();
      res.status(201).json({ message: "Pergunta criada com sucesso" });
    } catch (error) {
      console.error("Erro ao criar pergunta:", error);
      res.status(500).json({ message: "Erro ao criar pergunta" });
    }
  }

  // Método para pegar todas as perguntas
  static async getAll(req, res) {
    const perguntas = await Pergunta.find({}).sort("id");
    res.status(200).json({
      perguntas: perguntas,
    });
  }

  // Método para pegar uma pergunta pelo id
  static async getById(req, res) {
    const id = req.params.id;

    // checa se a pergunta existe
    const pergunta = await Pergunta.findOne({ id });
    if (!pergunta) {
      res.status(404).json({ message: "Pergunta nao encontrada" });
      return;
    }

    res.status(200).json({
      pergunta: pergunta,
    });
  }

  // Método para atualizar uma pergunta
  static async update(req, res) {
    const id = req.params.id;

    // checa se a pergunta existe
    const pergunta = await Pergunta.findOne({ id: id });
    if (!pergunta) {
      return res.status(404).json({ message: "Pergunta não encontrada" });
    }

    // checa se a resposta foi enviada
    const { resposta } = req.body;
    if (!resposta) {
      return res.status(400).json({ message: "A resposta é obrigatória" });
    }

    pergunta.resposta = resposta;
    await pergunta.save();

    res.status(200).json({
      pergunta: pergunta,
    });
  }
};
