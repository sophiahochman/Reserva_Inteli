const bcrypt = require("bcrypt");
const db = require("../config/db");

async function createTestUser() {
  try {
    const hashedPassword = await bcrypt.hash("123456", 10);

    const result = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      ["Usuário Teste", "teste@inteli.edu.br", hashedPassword]
    );

    console.log("Usuário de teste criado com sucesso:", result.rows[0]);
  } catch (error) {
    console.error("Erro ao criar usuário de teste:", error);
  } finally {
    process.exit();
  }
}

createTestUser();
