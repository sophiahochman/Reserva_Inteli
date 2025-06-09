const db = require("../config/sqlite");

db.serialize(() => {
  // Remove salas que não seguem o padrão R01-R10
  db.run("DELETE FROM rooms WHERE name NOT LIKE 'R0%'");

  // Remove duplicidades, mantendo apenas a primeira ocorrência de cada sala
  db.all("SELECT id, name FROM rooms ORDER BY id", (err, rows) => {
    if (err) return console.error(err);
    const seen = new Set();
    rows.forEach((row) => {
      if (seen.has(row.name)) {
        db.run("DELETE FROM rooms WHERE id = ?", [row.id]);
      } else {
        seen.add(row.name);
      }
    });
    console.log("Limpeza de salas concluída.");
    db.close();
  });
});
