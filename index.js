const express = require('express');
const app = express();
const buses = require('./busOperatos/bus');
const mongoose = require('mongoose');
const Ticket = require('./models/ticket')
const User = require('./models/user');
const { not } = require('joi');
const { includes } = require('./busOperatos/bus');
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
    // console.log(body)
    if (body.seat_number > 40) {
        res.status(200).json("Invalid seat_number")
    }
    const ticket = await Ticket.find({ seat_number: body.seat_number })
    // const allTickets = await Ticket.find({ is_booked: true })
    // console.log(allTickets)
    // console.log("ticket: ", ticket)
    if (ticket.length > 0) {
        res.status(200).json({ "Message": "Seat is already booked", ticket })
        // console.log(ticket)
    }
    else {
        const new_ticket = new Ticket(req.body)
        new_ticket.save()
        res.status(200).json({ "Message": "Ticket booked", new_ticket })
    }


})


// see all close_tickets
app.get('/ticket/close_ticket', async (req, res) => {
    const allTickets = await Ticket.find({ is_booked: true })
    // console.log("allTickets ", allTickets)
    res.status(200).json({ "Message": "Booked Tickets", allTickets })
})

// see all open_tickets
app.get('/ticket/open_ticket', async (req, res) => {
    const allTickets = await Ticket.find({})
    const seat_number_from_db = []
    const not_booked = []
    for (let ticket of allTickets) {
        seat_number_from_db.push(ticket.seat_number)
    }
    console.log(seat_number_from_db)
    for (let i = 1; i < 41; i++) {
        if (!(seat_number_from_db.includes(i))) {
            not_booked.push(i)
        }
    }
    res.status(200).json({ "Message": "Open Tickets", "Available seats": not_booked })

})

// view ticket
app.get('/ticket/:id', async (req, res) => {
    const id = req.body.id
    console.log(id)
    const viewTicket = await Ticket.find({})
    const userTicket = []
    for (let ticket of viewTicket) {
        userTicket.push(ticket.id)
    }
    console.log(userTicket)
    if (userTicket.includes(id)) {
        const view = await Ticket.findById({ _id: id })
        console.log(view)
        res.status(200).json({ "Message": "Ticket retreived", "Ticket": view })

    }
    else {

        res.status(200).json({ "Message": "Invalid Id" })

    }

})





app.listen(3000, () => {
    console.log("Serving on port 3000")
})