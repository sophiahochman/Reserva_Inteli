// controllers/bookingController.js

const bookingModel = require("../models/bookingModel");

const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await bookingModel.getBookingById(req.params.id);
    if (booking) {
      res.status(200).json(booking);
    } else {
      res.status(404).json({ error: "Reserva não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBooking = async (req, res) => {
  try {
    // Sempre usar o user_id da sessão
    const user_id = req.session.user && req.session.user.id;
    if (!user_id) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }
    const { room_id, date, start_time, status } = req.body;
    const newBooking = await bookingModel.createBooking(
      user_id,
      room_id,
      date,
      start_time,
      status
    );
    console.log("Reserva criada:", newBooking);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { user_id, room_id, date, start_time, status } = req.body;
    const updatedBooking = await bookingModel.updateBooking(
      req.params.id,
      user_id,
      room_id,
      date,
      start_time,
      status
    );
    if (updatedBooking) {
      res.status(200).json(updatedBooking);
    } else {
      res.status(404).json({ error: "Reserva não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await bookingModel.deleteBooking(req.params.id);
    if (deletedBooking) {
      res.status(200).json({ message: "Reserva excluída com sucesso" });
    } else {
      res.status(404).json({ error: "Reserva não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBookingsRaw = async (req, res) => {
  try {
    const db = require("../models/bookingModel");
    const all = await db.getAllBookings();
    res.json(all);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  getAllBookingsRaw,
};
