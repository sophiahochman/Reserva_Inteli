const db = require("../config/database");
const bcrypt = require("bcrypt");

const userModel = {
  async findByEmail(email) {
    const user = await db.getAsync("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return user;
  },

  async create(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.runAsync(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    return result.lastID;
  },

  async findById(id) {
    const user = await db.getAsync("SELECT * FROM users WHERE id = ?", [id]);
    return user;
  },

  async update(id, name, email) {
    await db.runAsync("UPDATE users SET name = ?, email = ? WHERE id = ?", [
      name,
      email,
      id,
    ]);
  },

  async delete(id) {
    await db.runAsync("DELETE FROM users WHERE id = ?", [id]);
  },
};

module.exports = userModel;
