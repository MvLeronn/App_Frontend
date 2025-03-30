const router = require("express").Router();
const UserController = require("../controllers/UserController");

// middlewares
const verifyToken = require("../helpers/verify-token");

// rotas
router.post("/register", verifyToken, UserController.register);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);

module.exports = router;
