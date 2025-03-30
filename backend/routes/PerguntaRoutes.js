const router = require("express").Router();
const PerguntaController = require("../controllers/PerguntaController");

// middlewares
const verifyToken = require("../helpers/verify-token");

// rotas
router.post("/create", PerguntaController.create);
router.get("/", verifyToken, PerguntaController.getAll);
router.get("/:id", verifyToken, PerguntaController.getById);
router.patch("/:id", verifyToken, PerguntaController.update);

module.exports = router;
