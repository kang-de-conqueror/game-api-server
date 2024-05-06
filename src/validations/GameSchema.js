const Joi = require("joi");

const gameSchema = Joi.object({
    title: Joi.string().required(),
    slug: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required()
});
module.exports= gameSchema;
