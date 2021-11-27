const mongoose = require('mongoose');
const Ticket = require('../models/ticket')
const User = require('../models/user');

mongoose.connect('mongodb://localhost:27017/bus-ticket', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const bookTicket = async (req, res) => {
    const body = req.body
    if (body.seat_number > 40) {
        res.status(200).json("Invalid seat_number")
    }
    const ticket = await Ticket.find({ seat_number: body.seat_number })
    if (ticket.length > 0) {
        res.status(200).json({ "Message": "Seat is already booked", ticket })
    }
    else {
        const new_ticket = new Ticket(req.body)
        new_ticket.save()
        res.status(200).json({ "Message": "Ticket booked", new_ticket })
    }
}

const closeTicket = async (req, res) => {
    const allTickets = await Ticket.find({ is_booked: true })
    res.status(200).json({ "Message": "Booked Tickets", allTickets })
}

const openTicket = async (req, res) => {
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

}

const cancelTicket = async (req, res) => {
    const id = req.body.id
    await Ticket.findByIdAndDelete({ _id: id })
    res.status(200).json({ "Message": "Ticket cancelled" })
}

const viewTicket = async (req, res) => {
    const id = req.body.id
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
}


module.exports = { bookTicket, closeTicket, openTicket, cancelTicket, viewTicket }