const mongoose = require('mongoose');
const mongo = require('../db/mongo');
const Ticket = require('../models/ticket');
const { ticketSchema } = require('../schemas');

mongo()

const bookTicket = async (req, res) => {
    const body = req.body
    const ticket = await Ticket.find({ seat_number: body.seat_number })
    if (ticket.length > 0) {
        res.status(404).json({
            statusCode: 404,
            status: false,
            message: "Seat is already booked"
        })
    }
    else {
        const new_ticket = new Ticket(req.body)
        new_ticket.save()
        res.status(200).json({ message: "Ticket booked", new_ticket })
    }


}

const closeTicket = async (req, res) => {
    const allTickets = await Ticket.find({ is_booked: true })
    if (allTickets.length == 0) {
        res.status(200).json({
            // statusCode: 200,
            // status: true,
            message: "All seats are available"
        })
    } else {

        res.status(200).json({ message: "Booked Tickets", allTickets })
    }
}

const openTicket = async (req, res) => {
    const allTickets = await Ticket.find({})
    if (allTickets.length == 0) {
        res.status(200).json({
            // statusCode: 200,
            // status: true,
            message: "All seats are available"
        })
    } else {
        const seat_number_from_db = []
        const not_booked = []
        for (let ticket of allTickets) {
            seat_number_from_db.push(ticket.seat_number)
        }
        // console.log(seat_number_from_db)
        for (let i = 1; i < 41; i++) {
            if (!(seat_number_from_db.includes(i))) {
                not_booked.push(i)
            }
        }
        res.status(200).json({ message: "Open Tickets", "Available seats": not_booked })
    }

}

const cancelTicket = async (req, res) => {
    const id = req.body.id
    const viewTicket = await Ticket.find({})
    const userTicket = []
    for (let ticket of viewTicket) {
        userTicket.push(ticket.id)
    }
    if (userTicket.includes(id)) {
        await Ticket.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "Ticket cancelled" })
    }
    else {
        res.status(400).json({ message: "Invalid Id" })
    }
}




const viewTicket = async (req, res) => {
    const id = req.body.id
    const viewTicket = await Ticket.find({})
    const userTicket = []
    for (let ticket of viewTicket) {
        userTicket.push(ticket.id)
    }
    // console.log(userTicket)
    if (userTicket.includes(id)) {
        const view = await Ticket.findById({ _id: id })
        // console.log(view)
        res.status(200).json({
            // statusCode: 200,
            // status: true,
            message: "Ticket retreived", "Ticket": view
        })
    }
    else {
        res.status(400).json({
            statusCode: 400,
            status: false,
            message: "Invalid Id"
        })
    }
}

const adminLogin = async (req, res) => {
    // const user = await User.findById(id);
    // if(user.is_admin === true)
    // {
    //     console.log("Welcome Admin");
    // }
    // else{
    //     res.status(500).json({message: "User is not an Admin"});
    // }
}

const resetTicket = async (req, res) => {
    const allTickets = await Ticket.find({ is_booked: true }).deleteMany()
    // console.log(allTickets)
    res.status(200).json({ message: "All ticktes are open" })
}



module.exports = { bookTicket, closeTicket, openTicket, cancelTicket, viewTicket, adminLogin, resetTicket }