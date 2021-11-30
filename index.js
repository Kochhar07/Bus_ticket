const express = require('express');
const app = express();
const healthCheck = require('./utils/healthCheck');
const { ticketSchema } = require('./schemas')
const { bookTicket, closeTicket, openTicket, cancelTicket, viewTicket, adminLogin, resetTicket } = require('./controllers/helper');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// validating ticket

const validateTicket = (req, res, next) => {
    const { error } = ticketSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        res.status(404).json({
            statusCode: 404,
            status: false,
            message: msg
        })
    } else {
        next();
    }
}

// create ticket
app.post('/ticket', validateTicket, bookTicket)

// see all close_tickets
app.get('/ticket/close_ticket', closeTicket)

// see all open_tickets1
app.get('/ticket/open_ticket', openTicket)

// cancel ticket
app.delete('/ticket/cancel', cancelTicket)

// view ticket
app.get('/ticket/view_ticket', viewTicket)

// to check db is connected
app.get('/health', healthCheck)

// admin login
app.get('/admin', adminLogin)

// admin access to reset all tickets
app.delete('/admin/ticket_reset', resetTicket)

app.listen(3000, () => {
    console.log("Serving on port 3000")
})