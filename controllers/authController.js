const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const authController = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Buscar usuário pelo email
      const user = await userModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Email ou senha inválidos" });
      }

      // Verificar senha
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Email ou senha inválidos" });
      }

      // Criar sessão
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      res.json({
        message: "Login realizado com sucesso",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Verificar se o email já está em uso
      const existingUser = await userModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email já está em uso" });
      }

      // Criar novo usuário
      const userId = await userModel.create(name, email, password);

      res.status(201).json({
        message: "Usuário criado com sucesso",
        userId,
      });
    } catch (error) {
      console.error("Erro no registro:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao fazer logout" });
      }
      res.json({ message: "Logout realizado com sucesso" });
    });
  },

  getCurrentUser(req, res) {
    if (!req.session.user) {
      return res.status(401).json({ error: "Não autenticado" });
    }
    res.json(req.session.user);
  },
};

module.exports = authController;
