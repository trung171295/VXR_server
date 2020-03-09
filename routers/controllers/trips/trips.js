const {Trip} = require('../../../models/trip');
const {Seat} = require('../../../models/seat');

const seatCodes = [
  'A01','A02','A03','A04','A05','A06','A07','A08','A09','A10','A11','A12',
  'B01','B02','B03','B04','B05','B06','B07','B08','B09','B10','B11','B12'
]

module.exports.createTrip = (req, res, next) => {
  const {fromStation, toStation, startTime, price} = req.body;
  let seats = [];

  seatCodes.forEach(code => {
    const newSeat = new Seat({code, isBooked: false})
    seats.push(newSeat)
  })

  let newTrip = new Trip({fromStation, toStation, startTime, seats, price})

  newTrip.save()
    .then(Trip => res.status(201).json(Trip))
    .catch(err => res.status(500).json(err))
}

module.exports.getTripAll = (req, res, next) => {
  Trip.find()
    .then(Trip => res.status(201).json(Trip))
    .catch(err => res.status(500).json(err))
}

module.exports.getTripById = (req, res, next) => {
  const {id} = req.params
  Trip.findById(id)
    .then(Trip => res.status(201).json(Trip))
    .catch(err => res.status(500).json(err))
}

module.exports.updateTripById = (req, res, next) => {
  const {fromStation, toStation, startTime, price} = req.body
  const {id} = req.params
  Trip.findById(id)
    .then(Trip => {
      if (!Trip) return Promise.reject({status: 404, message: 'Trip not found'})

      Trip.fromStation = fromStation
      Trip.toStation = toStation
      Trip.startTime = startTime
      Trip.price = price

      let seats = [];
      seatCodes.forEach(code => {
        const newSeat = new Seat({code, isBooked: false})
        seats.push(newSeat)
      })
      Trip.seats = seats;    

      return Trip.save()
    })
    .then(Trip => res.status(200).json(Trip))
    .catch(err => {
      if (err.status) return res.status(err.status).json({
          message: err.message
        })
      return res.status(500).json(err)
    })
}

module.exports.deleteTripById = (req, res, next) => {
  const {id} = req.params
  Trip.deleteOne({_id: id})
    .then((result) => {
      if (result.n === 0) return Promise.reject({status: 404, message: 'Trip not found'})

      res.status(200).json({message: 'Delete success'})
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json({
          message: err.message
        })
      return res.status(500).json(err)
    })
}
// module.exports = {
//     createTrip
// }
