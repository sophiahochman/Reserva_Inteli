const MinhasReservasModel = require("../models/minhasReservasModel");

exports.listarMinhasReservas = (req, res) => {
  const userId = req.session.user && req.session.user.id;
  console.log("Session data:", req.session);
  console.log("User ID from session:", userId);

  if (!userId) {
    console.log("Usuário não está logado");
    return res.redirect("/login");
  }

  console.log("Buscando reservas para o usuário:", userId);
  MinhasReservasModel.getByUserId(userId, (err, reservas) => {
    if (err) {
      console.error("Erro ao buscar reservas:", err);
      return res.status(500).send("Erro ao buscar reservas");
    }
    console.log("Reservas encontradas:", JSON.stringify(reservas, null, 2));
    res.render("pages/minhasReservas", {
      reservas,
      user: req.session.user, // Passando o usuário para a view
    });
  });
};

exports.apiMinhasReservas = (req, res) => {
  const userId = req.session.user && req.session.user.id;
  console.log("API - User ID from session:", userId);

  if (!userId) {
    return res.status(401).json({ error: "Não autenticado" });
  }

  MinhasReservasModel.getByUserId(userId, (err, reservas) => {
    if (err) {
      console.error("API - Erro ao buscar reservas:", err);
      return res.status(500).json({ error: "Erro ao buscar reservas" });
    }
    console.log(
      "API - Reservas encontradas:",
      JSON.stringify(reservas, null, 2)
    );
    res.json(reservas);
  });
};
