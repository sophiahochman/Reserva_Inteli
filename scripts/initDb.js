const db = require("../config/database");
const bcrypt = require("bcrypt");

async function initDatabase() {
  try {
    // Criar tabela de usuários
    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `);
    console.log("Tabela users criada com sucesso!");

    // Criar tabela de salas
    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        status TEXT NOT NULL
      )
    `);
    console.log("Tabela rooms criada com sucesso!");

    // Criar tabela de reservas
    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        room_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        start_time TEXT NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
      )
    `);
    console.log("Tabela bookings criada com sucesso!");

    // Inserir usuário de teste
    const hashedPassword = await bcrypt.hash("12345678", 10);
    await db.runAsync(
      `
      INSERT OR IGNORE INTO users (name, email, password)
      VALUES (?, ?, ?)
    `,
      ["Usuário Teste", "teste@inteli.edu.br", hashedPassword]
    );
    console.log("Usuário de teste criado com sucesso!");

    // Inserir algumas salas de teste
    await db.runAsync(`
      INSERT OR IGNORE INTO rooms (name, status)
      VALUES 
        ('Sala 101', 'disponível'),
        ('Sala 102', 'disponível'),
        ('Sala 103', 'disponível')
    `);
    console.log("Salas de teste criadas com sucesso!");

    console.log("Banco de dados inicializado com sucesso!");
  } catch (error) {
    console.error("Erro ao inicializar banco de dados:", error);
  } finally {
    db.close();
  }
}

initDatabase();
