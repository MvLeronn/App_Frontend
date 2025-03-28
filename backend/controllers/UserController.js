const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/// helpers
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");

module.exports = class UserController {
  static async register(req, res) {
    const { email, password, confirmPassword } = req.body;

    // validations
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

    //check if user exist
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(422).json({ message: "Por favor, utilize outro e-mail" });
      return;
    }

    // create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create a user
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

    // validations
    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória" });
      return;
    }

    //check if user exist
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(422).json({
        message: "Não encontramos um usuário cadastrado com esse e-mail",
      });
      return;
    }

    // check if password match with db password
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
      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }
};
