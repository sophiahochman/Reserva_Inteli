const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Listar todas as reservas
router.get("/", bookingController.getAllBookings);

// Buscar reserva por ID
router.get("/:id", bookingController.getBookingById);

// Criar nova reserva
router.post("/", bookingController.createBooking);

// Atualizar reserva
router.put("/:id", bookingController.updateBooking);

// Excluir reserva
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
