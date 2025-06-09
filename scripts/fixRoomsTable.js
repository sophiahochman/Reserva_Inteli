const db = require("../config/sqlite");

db.serialize(() => {
  // Adiciona a coluna 'imagem' se não existir
  db.all("PRAGMA table_info(rooms)", (err, columns) => {
    if (err) {
      console.error("Erro ao verificar colunas:", err.message);
      db.close();
      return;
    }
    const hasImagem = columns.some((col) => col.name === "imagem");
    const hasStatus = columns.some((col) => col.name === "status");
    function inserirSalas() {
      const salas = [
        { name: "R01", imagem: "/img/sala1.jpg", status: "disponível" },
        { name: "R02", imagem: "/img/sala2.jpg", status: "disponível" },
        { name: "R03", imagem: "/img/sala3.jpg", status: "disponível" },
        { name: "R04", imagem: "/img/sala4.jpg", status: "disponível" },
        { name: "R05", imagem: "/img/sala5.jpg", status: "disponível" },
        { name: "R06", imagem: "/img/sala6.jpg", status: "disponível" },
        { name: "R07", imagem: "/img/sala7.jpg", status: "disponível" },
        { name: "R08", imagem: "/img/sala8.jpg", status: "disponível" },
        { name: "R09", imagem: "/img/sala9.jpg", status: "disponível" },
        { name: "R10", imagem: "/img/sala10.jpg", status: "disponível" },
      ];
      let count = 0;
      salas.forEach((sala) => {
        db.run(
          "INSERT INTO rooms (name, imagem, status) VALUES (?, ?, ?)",
          [sala.name, sala.imagem, sala.status],
          (err) => {
            count++;
            if (err) {
              if (!err.message.includes("UNIQUE")) {
                console.error("Erro ao inserir sala:", err.message);
              }
            } else {
              console.log("Sala inserida:", sala.name);
            }
            if (count === salas.length) db.close();
          }
        );
      });
      if (salas.length === 0) db.close();
    }
    function addImagemThenStatus() {
      db.run("ALTER TABLE rooms ADD COLUMN imagem TEXT", (err) => {
        if (err && !err.message.includes("duplicate")) {
          console.error("Erro ao adicionar coluna imagem:", err.message);
          db.close();
        } else {
          if (!hasStatus) {
            db.run("ALTER TABLE rooms ADD COLUMN status TEXT", (err) => {
              if (err && !err.message.includes("duplicate")) {
                console.error("Erro ao adicionar coluna status:", err.message);
                db.close();
              } else {
                inserirSalas();
              }
            });
          } else {
            inserirSalas();
          }
        }
      });
    }
    if (!hasImagem) {
      addImagemThenStatus();
    } else if (!hasStatus) {
      db.run("ALTER TABLE rooms ADD COLUMN status TEXT", (err) => {
        if (err && !err.message.includes("duplicate")) {
          console.error("Erro ao adicionar coluna status:", err.message);
          db.close();
        } else {
          inserirSalas();
        }
      });
    } else {
      inserirSalas();
    }
  });
});
