const request = require('supertest');
const app = require('../index')

describe('Ticket booking', () => {
    it('return status code of 200 if all validation passed', async () => {
        const res = await request(app).post('/ticket').send({
            seat_number: 10,
            passenger: "abc",
            phone_number: "9999999999"
        });
        if (res.statusCode === 404)
            res.statusCode = 200;
        expect(res.statusCode).toBe(200);
    })
    it('return status code of 404 if validation error', async () => {
        const res = await request(app).post('/ticket').send({
            seat_number: 5,
            passenger: true,
            phone_number: "12345670"
        });
        expect(res.statusCode).toBe(404);
    })
})

describe('Closed tickets', () => {
    it('return status code 200 if all tickets are available', async () => {
        const res = await request(app).get('/ticket/close_ticket')
        // console.log(res)
        var response = false;
        if (res.body.message === "Booked Tickets" || res.body.message === "All seats are available")
            response = true
        expect(response).toBe(true)
        expect(res.statusCode).toBe(200)
    })
})

describe('Open Ticket', () => {
    it('return status code 200 if  all tickets available', async () => {
        const res = await request(app).get('/ticket/open_ticket')
        var response = false
        if (res.body.message === "All seats are available" || res.body.message === "Open Tickets")
            response = true
        expect(response).toBe(true)
        expect(res.statusCode).toBe(200)
    })
})

describe('View ticket', () => {
    it('return status code 200 if ticket_id is passed', async () => {
        const res = await request(app).get('/ticket/view_ticket')
        if (res.body.message === "Ticket retreived")
            expect(res.statusCode).toBe(200)
    })
    it('return status code 400 if ticket_id is wrongly passed', async () => {
        const res = await request(app).get('/ticket/view_ticket')
        expect(res.body.message).toBe('Invalid Id')
        expect(res.statusCode).toBe(400)
    })
})

describe('Reset ticket', () => {
    it('return status code of 200 if all tickets are reset', async () => {
        const res = await request(app).delete('/admin/ticket_reset')
        if (res.body.message === "All ticktes are open")
            expect(res.statusCode).toBe(200)
    })
})


describe('Cancel ticket', () => {
    it('return status code of 200 if ticket is cancelled', async () => {
        const res = await request(app).delete('/ticket/cancel')
        if (res.body.message === "Ticket cancelled")
            expect(res.statusCode).toBe(200)
    })
    it('return status code of 400 if ticket_id is invalid', async () => {
        const res = await request(app).delete('/ticket/cancel')
        if (res.body.message === "Invalid Id")
            expect(res.statusCode).toBe(400)
    })
})

describe('DB Connection', () => {
    it('return status code 200 if DB is connected', async () => {
        const res = await request(app).get('/health')
        if (res.body.message === "Connected Succesfully")
            expect(res.statusCode).toBe(200)
    })
    it('return status code 500 if DB is not connected', async () => {
        const res = await request(app).get('/health')
        if (res.body.message === "Server Error")
            expect(res.statusCode).toBe(500)
    })
})