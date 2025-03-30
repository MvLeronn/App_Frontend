const mongoose = require("../db/conn");
const { Schema } = mongoose;

// Define o modelo de usuário
const User = mongoose.model(
  "User",
  new Schema(
    {
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = User;
