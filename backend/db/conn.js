const moongose = require("mongoose");

async function main() {
  await moongose.connect("mongodb://localhost:27017/apppromopage");
  console.log("Conectou ao banco de dados com sucesso!");
}

main().catch((err) => console.log(err));

module.exports = moongose;
