const express = require("express");
const router = express.Router();
const controller = require("../controllers/minhasReservasController");

router.get("/", controller.listarMinhasReservas);
router.get("/api", controller.apiMinhasReservas);

module.exports = router;
