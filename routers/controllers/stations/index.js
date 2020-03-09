const express = require('express')
const stationController = require('./stations')
const {authenticate} = require('../../../middleware/auth')

const router = express.Router()

router.post(
  '/',
  authenticate,
  stationController.createStation
)

router.get('/', stationController.getStationAll)

router.get('/:id', stationController.getStationById)

router.put('/:id', stationController.updateStationById)

router.delete('/:id', stationController.deleteStationById)

module.exports = router
