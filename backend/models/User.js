const moongose = require("../db/conn");
const { Schema } = moongose;

const User = moongose.model(
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
