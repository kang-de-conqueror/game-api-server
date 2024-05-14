const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .max(40)
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.email": "Email must be a valid email address",
      "string.empty": "Email is required",
      "string.max": "Email must have at most 40 characters",
      "any.required": "Email is required"
    }),
  name: Joi.string()
    .lowercase()
    .max(40)
    .required()
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.max": "Name must have at most 40 characters",
      "any.required": "Name is required"
    }),
  password: Joi.string()
    .required()
    .messages({
      "string.base": "Password must be a string",
      "string.empty": "Password is required",
      "any.required": "Password is required"
    })
});

module.exports = userSchema;
