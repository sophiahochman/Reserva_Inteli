const { Pool } = require("pg");
const bcrypt = require("bcrypt");

// Configuração para conectar ao banco de dados padrão 'postgres'
const defaultPool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

// Configuração para conectar ao banco de dados 'reserva_inteli'
const reservaPool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "reserva_inteli",
  password: "postgres",
  port: 5432,
});

async function createDatabase() {
  const client = await defaultPool.connect();
  try {
    // Criar o banco de dados se não existir
    await client.query("CREATE DATABASE reserva_inteli");
    console.log("Banco de dados criado com sucesso!");

    // Conectar ao novo banco de dados
    const reservaClient = await reservaPool.connect();
    try {
      // Criar tabela de usuários
      await reservaClient.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name VARCHAR NOT NULL,
          email VARCHAR UNIQUE NOT NULL,
          password VARCHAR NOT NULL
        )
      `);
      console.log("Tabela users criada com sucesso!");

      // Criar tabela de salas
      await reservaClient.query(`
        CREATE TABLE rooms (
          id SERIAL PRIMARY KEY,
          name VARCHAR NOT NULL,
          status VARCHAR NOT NULL
        )
      `);
      console.log("Tabela rooms criada com sucesso!");

      // Criar tabela de reservas
      await reservaClient.query(`
        CREATE TABLE bookings (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
          date DATE NOT NULL,
          start_time TIME NOT NULL,
          status VARCHAR NOT NULL
        )
      `);
      console.log("Tabela bookings criada com sucesso!");

      // Inserir usuário de teste
      const hashedPassword = await bcrypt.hash("12345678", 10);
      await reservaClient.query(
        `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
      `,
        ["Usuário Teste", "teste@inteli.edu.br", hashedPassword]
      );
      console.log("Usuário de teste criado com sucesso!");
    } finally {
      reservaClient.release();
    }
  } catch (error) {
    if (error.code === "42P04") {
      console.log("Banco de dados já existe, continuando...");
    } else {
      console.error("Erro ao criar banco de dados:", error);
    }
  } finally {
    client.release();
    await defaultPool.end();
    await reservaPool.end();
  }
}

createDatabase().catch(console.error);
