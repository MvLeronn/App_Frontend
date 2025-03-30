const jwt = require("jsonwebtoken");
const User = require("../models/User");

// cria o user token
const createUserToken = async (user, req, res) => {
  // create token
  const token = jwt.sign(
    {
      email: user.email,
      id: user._id,
    },
    "nossosecret"
  );

  // return token
  res.status(200).json({
    message: "Voce esta autenticado",
    token: token,
    userId: user._id,
  });
};

module.exports = createUserToken;
