const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Criando a conexão com o banco de dados
const db = new sqlite3.Database(
  path.join(__dirname, "../database.sqlite"),
  (err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
    } else {
      console.log("Conectado ao banco de dados SQLite");
    }
  }
);

// Função para executar queries com promessas
db.runAsync = function (sql, params = []) {
  return new Promise((resolve, reject) => {
    this.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

db.getAsync = function (sql, params = []) {
  return new Promise((resolve, reject) => {
    this.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

db.allAsync = function (sql, params = []) {
  return new Promise((resolve, reject) => {
    this.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

module.exports = db;
