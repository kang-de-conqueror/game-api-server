const Joi = require("joi");

const gameSchema = Joi.object({
  title: Joi.string().min(1).max(30).lowercase().required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title is required",
    "string.min": "Title must have at least 1 character",
    "string.max": "Title must have at most 30 characters",
    "any.required": "Title is required",
  }),
  slug: Joi.string().required().messages({
    "string.base": "Slug must be a string",
    "string.empty": "Slug is required",
    "any.required": "Slug is required",
  }),
  price: Joi.number().integer().required().messages({
    "number.base": "Price must be a number",
    "number.integer": "Price must be an integer",
    "any.required": "Price is required",
  }),
  description: Joi.string().min(1).required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
});

module.exports = gameSchema;
