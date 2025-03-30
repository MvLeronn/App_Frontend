const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/// helpers
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");

module.exports = class UserController {
  // Função para inicializar o usuário administrador caso não exista
  static async initializeAdminUser() {
    const email = "admin@gmail.com";
    const password = "admin";

    try {
      const userExists = await User.findOne({ email: email });
      if (!userExists) {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // Cria o usuário
        const user = new User({
          email: email,
          password: passwordHash,
        });

        await user.save();
      } else {
        console.log("Usuário administrador já existe.");
      }
    } catch (error) {
      console.error("Erro ao inicializar o usuário administrador:", error);
    }
  }

  // Função para registrar um novo usuário
  static async register(req, res) {
    const { email, password, confirmPassword } = req.body;

    // Validações
    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória" });
      return;
    }

    if (!confirmPassword) {
      res.status(422).json({ message: "A confirmação da senha é obrigatória" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(422).json({ message: "As senhas devem ser iguais" });
      return;
    }

    // Verifica se o usuário já existe
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(422).json({ message: "Por favor, utilize outro e-mail" });
      return;
    }

    // Cria o hash da senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Cria o usuário
    const user = new User({
      email: email,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    // Validações
    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória" });
      return;
    }

    // Verifica se o usuário existe
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(422).json({
        message: "Não encontramos um usuário cadastrado com esse e-mail",
      });
      return;
    }

    // Verifica se a senha confere com a do banco de dados
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(422).json({ message: "Senha inválida" });
      return;
    }

    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;

    console.log(req.headers.authorization);

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "nossosecret");

      currentUser = await User.findById(decoded.id);
      // Remove a senha do objeto retornado
      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }
};
