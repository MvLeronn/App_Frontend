const Pergunta = require("../models/Pergunta");

module.exports = class PerguntaController {
  static async create(req, res) {
    const { pergunta } = req.body;

    if (!pergunta) {
      res.status(422).json({ message: "A Pergunta é obrigatória" });
      return;
    }

    const novaPergunta = new Pergunta({
      pergunta,
      resposta: "",
    });

    try {
      await novaPergunta.save();
      res.status(201).json({ message: "Pergunta criada com sucesso" });
    } catch (error) {
      console.error("Erro ao criar pergunta:", error);
      res.status(500).json({ message: "Erro ao criar pergunta" });
    }
  }

  static async getAll(req, res) {
    const perguntas = await Pergunta.find({}).sort("id");
    res.status(200).json({
      perguntas: perguntas,
    });
  }

  static async getById(req, res) {
    const id = req.params.id;

    // check if pergunta exists
    const pergunta = await Pergunta.findOne({ id });
    if (!pergunta) {
      res.status(404).json({ message: "Pergunta nao encontrada" });
      return;
    }

    res.status(200).json({
      pergunta: pergunta,
    });
  }

  static async update(req,res){

    const id = req.params.id;
    
    // check if pergunta exists
    const pergunta = await Pergunta.findOne({ id: id });
    if (!pergunta) {
      return res.status(404).json({ message: "Pergunta não encontrada" });
    }

    // get the response sent
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
