const Joi = require("joi");

const TicketModelValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string().valid("low", "medium", "high").required(),
  attachment: Joi.string().optional()
});

module.exports = TicketModelValidation;
