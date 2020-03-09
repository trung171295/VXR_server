const nodemailer = require('nodemailer');
const fs = require('fs');
const hogan = require('hogan.js');
const config = require('../../config');

const template = fs.readFileSync('./services/email/bookingTicketEmailTemplace.hjs', 'utf-8')
const compiledTemplate = hogan.compile(template);

module.exports.sentBookingTickedEmail = (ticket, trip, user) => {
    const transport = {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTSL: true,
        requireSSL: true,
        auth: {
            user: config.EMAIL,
            pass: config.PASSWORD
        }
    }

    const seatCodes = ticket.seats.map(seat => seat.code)
    const transporter = nodemailer.createTransport(transport)
    const mailOptions = {
        from: config.EMAIL,
        to: user.email,
        subject: 'Mail xac nhan mua ve thanh cong',
        html: compiledTemplate.render({
            email: user.email,
            fromStation: `${trip.fromStation.name}, ${trip.fromStation.province}`,
            toStation: `${trip.toStation.name}, ${trip.toStation.province}`,
            price: trip.price,
            amount: ticket.seats.length,
            seats: seatCodes.join(),
            total: ticket.totalPrice
        })
    }
    transporter.sendMail(mailOptions, err =>{
        if(err) return console.log(err.message)
        console.log('success');
    })
}
