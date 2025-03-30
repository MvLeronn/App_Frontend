const express = require("express");
const cors = require("cors");
const mongoose = require("./db/conn");
const UserController = require("./controllers/UserController");

const app = express();

// Configura JSON Response
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

// Resolve problemas de CORS
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (origin) {
        callback(null, true); // Permite qualquer origem
      } else {
        callback(new Error("Origem não permitida pelo CORS"));
      }
    },
  })
);

/* Permite apenas 2 origens
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://127.0.0.1:5500"],
  })
);
*/

// Aguarda a conexão com o banco de dados antes de criar o usuário admin
mongoose.connection.once("open", () => {
  console.log("Conexão com o banco de dados estabelecida.");
  UserController.initializeAdminUser();
});

// Routes
const UserRoutes = require("./routes/UserRoutes");
const PerguntaRoutes = require("./routes/PerguntaRoutes");

app.use("/users", UserRoutes);
app.use("/perguntas", PerguntaRoutes);

// Inicia o servidor na porta 5000
app.listen(5000);
