const db = require('../config/db');

class Booking {
  static async getAllBookings() {
    const result = await db.query('SELECT * FROM bookings');
    return result.rows;
  }

  static async getBookingById(id) {
    const result = await db.query('SELECT * FROM bookings WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async createBooking(data) {
    const result = await db.query(
      'INSERT INTO bookings (user_id, room_id, date, start_time, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [data.user_id, data.room_id, data.date, data.start_time, data.status]
    );
    return result.rows[0];
  }

  static async updateBooking(id, data) {
    const result = await db.query(
      'UPDATE bookings SET user_id = $1, room_id = $2, date = $3, start_time = $4, status = $5 WHERE id = $6 RETURNING *',
      [data.user_id, data.room_id, data.date, data.start_time, data.status, id]
    );
    return result.rows[0];
  }

  static async deleteUser(id) {
    const result = await db.query('DELETE FROM bookings WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Booking;
