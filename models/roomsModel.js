const db = require('../config/db');

class Room {
  static async getAllRooms() {
    const result = await db.query('SELECT * FROM rooms');
    return result.rows;
  }

  static async getRoomById(id) {
    const result = await db.query('SELECT * FROM rooms WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async createRoom(data) {
    const result = await db.query(
      'INSERT INTO rooms (name, status) VALUES ($1, $2) RETURNING *',
      [data.name, data.status]
    );
    return result.rows[0];
  }

  static async updateRoom(id, data) {
    const result = await db.query(
      'UPDATE rooms SET name = $1, status = $2, WHERE id = $3 RETURNING *',
      [data.name, data.status, id]
    );
    return result.rows[0];
  }

  static async deleteRoom(id) {
    const result = await db.query('DELETE FROM rooms WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Room;
