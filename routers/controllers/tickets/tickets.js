const { Ticket } = require('../../../models/ticket')
const {User} = require('../../../models/user')
const {Trip} = require('../../../models/trip')
const {sentBookingTickedEmail} = require('../../../services/email/sentBookingTicket')

// Muon book ve can nhap: thong tin chuyen di, ghe chon
// thong tin khach hang lay tu viec dang nhap.
module.exports.createTicket = (req, res, next) => {
  const {tripId, seatCodes} = req.body

  Trip.findById(tripId)
    .populate('fromStation')
    .populate('toStation')
    .then(trip => {
      if (!trip) return Promise.reject({status: 404, msg: 'Trip not found'})

      // lay nhung ghe chua book
      const availableSeatCodes = trip.seats
        .filter(s => !s.isBooked)
        .map(s => s.code)

      // kiem tra nhung ghe chon co ton tai hoac da book chua
      let errorSeatCodes = []
      seatCodes.forEach(code => {
        if (availableSeatCodes.indexOf(code) === -1) errorSeatCodes.push(code)
      })

      // neu ton tai error thi reject no
      if (errorSeatCodes.length > 0) return Promise.reject({
          status: 400,
          msg: 'Seat are not avaliable',
          notAvailableSeats: errorSeatCodes
        })

      const newTicket = new Ticket({
        tripId,
        userId: '5dfd79be219753350ce9aa83',
        seats: seatCodes.map(s => ({
          isBooked: true,
          code: s
        })),
        totalPrice: trip.price * seatCodes.length
      })

      trip.seats = trip.seats.map(s => {
        if (seatCodes.indexOf(s.code) > -1) {
          s.isBooked = true
        }
        return s
      })
      return Promise.all([newTicket.save(), trip.save()])
    })
    .then(result => {
      sentBookingTickedEmail(result[0], result[1], req.user)
      res.status(200).json(result[0])
    }) // res[0] = ticket
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
}

module.exports.getTicketAll = (req, res, next) => {
  Ticket.find()
    .then(Ticket => res.status(201).json(Ticket))
    .catch(err => res.status(500).json(err))
}
