const db = require("../config/sqlite");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    imagem TEXT
  )`);

  // Exemplo de salas (ajuste os nomes e imagens depois se quiser)
  const salas = [
    { name: "R01", imagem: "assets/img/espaço-inteli.jpg" },
    { name: "R02", imagem: "assets/img/espaço-inteli.jpg" },
    { name: "R03", imagem: "assets/img/espaço-inteli.jpg" },
    { name: "R04", imagem: "assets/img/espaço-inteli.jpg" },
    { name: "R05", imagem: "assets/img/espaço-inteli.jpg" },
    { name: "R06", imagem: "assets/img/espaço-inteli.jpg" },
    { name: "R07", imagem: "assets/img/espaço-inteli.jpg" },
    { name: "R08", imagem: "assets/img/espaço-inteli.jpg" },
    { name: "R09", imagem: "assets/img/espaço-inteli.jpg" },
    { name: "R10", imagem: "assets/img/espaço-inteli.jpg" },
  ];

  salas.forEach((sala) => {
    db.run(
      "INSERT INTO rooms (name, imagem) VALUES (?, ?)",
      [sala.name, sala.imagem],
      (err) => {
        if (err) {
          if (!err.message.includes("UNIQUE")) {
            console.error("Erro ao inserir sala:", err.message);
          }
        } else {
          console.log("Sala inserida:", sala.name);
        }
      }
    );
  });
});

db.close();
