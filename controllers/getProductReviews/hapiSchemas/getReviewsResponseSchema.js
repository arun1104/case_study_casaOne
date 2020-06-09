const Joi = require('@hapi/joi');

const schema = Joi.object({
    totalReviews: Joi.number()
        .min(0)
        .required(),
    averageRating: Joi.number()
        .min(0)
        .required(),
    individualRatings: [{
        rating:Joi.number(),
        count:Joi.number()
    }  
    ],
    reviews:[
        {
            customerId:Joi.string(),
            customerReviewText:Joi.string().pattern(new RegExp('^[a-zA-Z 0-9!.]{0,200}$')),
            rating:Joi.number().min(1).max(5)
        }
    ]
    });

module.exports.getReviewsResponseSchema = schema;