const express = require('express');
const app = express();


const { bookTicket, closeTicket, openTicket, cancelTicket, viewTicket } = require('./controllers/helper');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create ticket
app.post('/bookTicket', bookTicket)

// see all close_tickets
app.get('/ticket/close_ticket', closeTicket)

// see all open_tickets
app.get('/ticket/open_ticket', openTicket)

// cancel ticket
app.delete('/ticket/cancel', cancelTicket)

// view ticket
app.get('/ticket/view_ticket', viewTicket)

app.listen(3000, () => {
    console.log("Serving on port 3000")
})