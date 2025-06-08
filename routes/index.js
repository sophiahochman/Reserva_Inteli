const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const roomRoutes = require("./roomRoutes");
const bookingRoutes = require("./bookingRoutes");

router.use("/users", userRoutes);
router.use("/rooms", roomRoutes);
router.use("/bookings", bookingRoutes);

// Rotas para as páginas do protótipo
router.get("/", (req, res) => {
  res.render("pages/loginPage");
});

router.get("/loginPage", (req, res) => {
  res.render("pages/loginPage");
});

router.get("/reservaPage", (req, res) => {
  res.render("pages/reservaPage");
});

router.get("/selectPage", (req, res) => {
  res.render("pages/selectPage");
});

router.get("/timePage", (req, res) => {
  res.render("pages/timePage");
});

module.exports = router;
