const db = require("../config/sqlite");

const SalaModel = {
  getAll: (callback) => {
    db.all(
      "SELECT id, name, imagem FROM rooms ORDER BY name ASC",
      [],
      callback
    );
  },
};

module.exports = SalaModel;
