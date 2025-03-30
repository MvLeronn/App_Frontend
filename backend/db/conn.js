const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");

// Conecta ao banco de dados
async function main() {
  await moongose.connect("mongodb://localhost:27017/apppromopage");
  console.log("Conectou ao banco de dados com sucesso!");
}

main().catch((err) => console.log(err));

module.exports = mongoose;
