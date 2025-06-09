const SalaModel = require("../models/salaModel");

exports.home = (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  SalaModel.getAll((err, salas) => {
    if (err) {
      return res.status(500).send("Erro ao buscar salas");
    }
    res.render("pages/homePage", { user: req.session.user, salas });
  });
};
