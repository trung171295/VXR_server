const express = require('express')
const TripController = require('./trips')

const router = express.Router()

router.post('/', TripController.createTrip)

router.get('/', TripController.getTripAll)

router.get('/:id', TripController.getTripById)

router.put('/:id', TripController.updateTripById)

router.delete('/:id', TripController.deleteTripById)

module.exports = router;