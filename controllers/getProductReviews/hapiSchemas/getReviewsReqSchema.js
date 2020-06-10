const Joi = require('@hapi/joi');

const schema = Joi.object({
    productId: Joi.string()
        .trim()
        .min(3)
        .max(20)
        .required(),
    index: Joi.number()
        .integer()
        .min(0),
    count: Joi.number()
        .integer()
        .min(1)
        .max(100)
    });

module.exports.getReviewsReqSchema = schema;