const db = require("../config/database");

const bookingModel = {
  async getAllBookings() {
    return await db.allAsync("SELECT * FROM bookings");
  },

  async getBookingById(id) {
    return await db.getAsync("SELECT * FROM bookings WHERE id = ?", [id]);
  },

  async createBooking(user_id, room_id, date, start_time, status) {
    const result = await db.runAsync(
      "INSERT INTO bookings (user_id, room_id, date, start_time, status) VALUES (?, ?, ?, ?, ?)",
      [user_id, room_id, date, start_time, status]
    );
    return { id: result.lastID, user_id, room_id, date, start_time, status };
  },

  async updateBooking(id, user_id, room_id, date, start_time, status) {
    await db.runAsync(
      "UPDATE bookings SET user_id = ?, room_id = ?, date = ?, start_time = ?, status = ? WHERE id = ?",
      [user_id, room_id, date, start_time, status, id]
    );
    return await bookingModel.getBookingById(id);
  },

  async deleteBooking(id) {
    await db.runAsync("DELETE FROM bookings WHERE id = ?", [id]);
    return true;
  },
};

module.exports = bookingModel;
