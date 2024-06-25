const Joi = require("joi");

const UserModelValidationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d\\s]).{8,}$")
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one symbol, and one digit.",
    }),
  email: Joi.string().email().required().messages({
    "string.email": "Email format is invalid.",
  }),
  role: Joi.string().valid("user", "admin", "employee").optional(),
});

module.exports = UserModelValidationSchema;
