const express = require('express')
const TiketController = require('./tickets')
const {authenticate, authorize} = require('../../../middleware/auth')

const router = express.Router()

router.post(
  '/booking',
  authenticate,
  authorize(['client']),
  TiketController.createTicket)

router.get('/', TiketController.getTicketAll)
module.exports = router
