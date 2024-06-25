const Joi = require("joi");

const EmployeeModelValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and contain both letters and numbers.",
    }),
  email: Joi.string().email().required().messages({
    "string.email": "Email format is invalid.",
  }),
  role: Joi.string().valid("user", "admin", "employee").optional(),

  department: Joi.string().required(),
  position: Joi.string().required(),
});

module.exports = EmployeeModelValidation;
