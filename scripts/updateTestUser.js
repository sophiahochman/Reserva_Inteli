const bcrypt = require("bcrypt");
const db = require("../config/db");

async function updateTestUser() {
  try {
    const hashedPassword = await bcrypt.hash("12345678", 10);

    const result = await db.query(
      "UPDATE users SET password = $1 WHERE email = $2 RETURNING *",
      [hashedPassword, "teste@inteli.edu.br"]
    );

    if (result.rows.length > 0) {
      console.log("Senha do usuário de teste atualizada com sucesso!");
      console.log("Novo usuário:", result.rows[0]);
    } else {
      console.log("Usuário de teste não encontrado.");
    }
  } catch (error) {
    console.error("Erro ao atualizar usuário de teste:", error);
  } finally {
    process.exit();
  }
}

updateTestUser();
