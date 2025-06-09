const db = require("../config/sqlite");

const MinhasReservasModel = {
  getByUserId: (userId, callback) => {
    db.all(
      `SELECT bookings.id, rooms.name as sala, bookings.date, bookings.start_time as horario, bookings.status, rooms.imagem
       FROM bookings
       JOIN rooms ON bookings.room_id = rooms.id
       WHERE bookings.user_id = ?
       ORDER BY bookings.date DESC, bookings.start_time DESC`,
      [userId],
      callback
    );
  },
};

module.exports = MinhasReservasModel;
