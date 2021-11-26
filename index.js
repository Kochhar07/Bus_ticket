const express = require('express');
const app = express();
const buses = require('./busOperatos/bus');
const mongoose = require('mongoose');
const Ticket = require('./models/ticket')
const User = require('./models/user');
// const { find, includes } = require('./busOperatos/bus');
// const { not } = require('joi');
// const passport = require('passport')
// const localStatergy = require('passport-local')
// const Joi = require('joi')



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(passport.initialize())
// passport.use(new localStatergy(User.aunthenticate()))


mongoose.connect('mongodb://localhost:27017/bus-ticket', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



// create ticket
app.post('/bookTicket', async (req, res) => {
    // const ticket = new Ticket(req.body)
    const body = req.body
    console.log(body)
    if (body.seat_number > 40) {
        res.status(200).json("Invalid seat_number")
    }
    const ticket = await Ticket.find({ seat_number: body.seat_number })
    // const allTickets = await Ticket.find({ is_booked: true })
    // console.log(allTickets)
    console.log("ticket: ", ticket)
    if (ticket.length > 0) {
        res.status(200).json({ "Message": "Seat is already booked", ticket })
        console.log(ticket)
    }
    else {
        const new_ticket = new Ticket(req.body)
        new_ticket.save()
        res.status(200).json({ "Message": "Ticket booked", new_ticket })
    }


})











app.listen(3000, () => {
    console.log("Serving on port 3000")
})