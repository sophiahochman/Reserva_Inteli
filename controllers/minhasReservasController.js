const MinhasReservasModel = require("../models/minhasReservasModel");

exports.listarMinhasReservas = (req, res) => {
  const userId = req.session.user && req.session.user.id;
  if (!userId) {
    return res.redirect("/login");
  }
  MinhasReservasModel.getByUserId(userId, (err, reservas) => {
    if (err) {
      return res.status(500).send("Erro ao buscar reservas");
    }
    res.render("pages/minhasReservas", { reservas });
  });
};

exports.apiMinhasReservas = (req, res) => {
  const userId = req.session.user && req.session.user.id;
  if (!userId) {
    return res.status(401).json([]);
  }
  MinhasReservasModel.getByUserId(userId, (err, reservas) => {
    if (err) {
      return res.status(500).json([]);
    }
    res.json(reservas);
  });
};
