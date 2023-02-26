const Joi = require("joi");
// =========================================================== //

const contactSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().min(3).email().required(),
  phone: Joi.string().min(6).required(),
});

module.exports = contactSchema;
