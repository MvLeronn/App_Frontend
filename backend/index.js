const express = require("express");
const cors = require("cors");

const app = express();

// Config JSON Response
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Solve CORS
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Routes
const UserRoutes = require("./routes/UserRoutes");
const PerguntaRoutes = require("./routes/PerguntaRoutes");

app.use("/users", UserRoutes);
app.use("/perguntas", PerguntaRoutes);

app.listen(5000);
