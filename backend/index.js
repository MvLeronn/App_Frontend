const express = require("express");
const cors = require("cors");

const app = express();

// Config JSON Response
app.use(express.json());

// Solve CORS
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Routes

app.listen(5000);
