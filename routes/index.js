const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const roomRoutes = require('./roomRoutes');
const bookingRoutes = require('./bookingRoutes');

router.use('/users', userRoutes);
router.use('/rooms', roomRoutes);
router.use('/bookings', bookingRoutes);

router.get('/', (req, res) => {
  res.send('API de Reservas está rodando!');
});


module.exports = router;