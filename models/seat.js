const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
    code: {type: String, require: true},
    isBooked: {type: Boolean, default: false}   // isBooked = false: ghe con trong
})

const Seat = mongoose.model('Seat', SeatSchema)

module.exports = {Seat, SeatSchema}