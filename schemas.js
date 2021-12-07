const Joi = require('joi');
const { number } = require('joi');


module.exports.ticketSchema = Joi.object({
    seat_number: Joi.number().required().min(1).max(40),
    phone_number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    passenger: Joi.string().required().alphanum()

}).required()
