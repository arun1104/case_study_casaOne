const Joi = require('@hapi/joi');

const schema = Joi.object({
    productId: Joi.string()
        .trim()
        .min(3)
        .max(20)
        .required(),
    pageStartIndex: Joi.number()
        .integer()
        .min(0)
        .max(Infinity),
    pageTotalCount: Joi.number()
        .integer()
        .min(1)
        .max(Infinity)
    });

module.exports.getReviewsReqSchema = schema;