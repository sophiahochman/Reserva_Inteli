const db = require("../config/sqlite");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    imagem TEXT
  )`);

  // Exemplo de salas (ajuste os nomes e imagens depois se quiser)
  const salas = [
    { name: "R01", imagem: "/img/sala1.jpg" },
    { name: "R02", imagem: "/img/sala2.jpg" },
    { name: "R03", imagem: "/img/sala3.jpg" },
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
