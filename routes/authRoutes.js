const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Middleware para verificar autenticação
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Não autenticado" });
  }
  next();
};

// Rotas de autenticação
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);
router.get("/me", requireAuth, authController.getCurrentUser);

module.exports = router;
