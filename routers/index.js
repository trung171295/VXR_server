const express = require('express');

//const Router
const stationRouter = require('../routers/controllers/stations/index');
const tripRouter = require('../routers/controllers/trips/index');
const userRouter = require('../routers/controllers/users/index');
const ticketRouter = require('../routers/controllers/tickets/index');

const router = express.Router();

router.use('/stations', stationRouter);
router.use('/trips', tripRouter);
router.use('/users', userRouter);
router.use('/tickets', ticketRouter);

module.exports = router;