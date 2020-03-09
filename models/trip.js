const mongoose = require('mongoose');
const {SeatSchema} = require('./seat')

const TripSchema = new mongoose.Schema({
    fromStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station'
    },
    toStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station'
    },
    startTime: {type: Date, require: true},
    seats: [SeatSchema],
    price: {type: Number}   // gia tren 1 ghe
})

const Trip = mongoose.model('Trip', TripSchema)

module.exports = {Trip, TripSchema}