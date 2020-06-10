
const { getReviewsReqSchema } = require('./hapiSchemas/getReviewsReqSchema');
const { getReviewsResponseSchema } = require('./hapiSchemas/getReviewsResponseSchema');
const dbLayer = require('./utilities/dbLayer');
const Logger = require('./utilities/logger');

class Reviews {
    constructor() {
        this.dbLayer = dbLayer;
        this.getReviews = this.getReviews.bind(this);
    }

    async getReviews(params, correlationId) {
        const logger = new Logger(correlationId, 'getReviews', 'getReviews');
        logger.info('Entry');
        try {
            const reqParams = await getReviewsReqSchema.validateAsync(params);
            logger.info('reqParams', reqParams);
            let res = await this.dbLayer.getProductReviews(reqParams, correlationId);
            logger.info('Exit');
            return res;
        }
        catch (err) {
            logger.error(err);
            if (err.status) { //Handled error
                throw err;
            } else if (err.message) { //Could be Joi error
                throw { status: 400, message: err.message }
            } else {
                throw { status: 500, message: "Unexpected error" }
            }

        }
    }
}
module.exports = new Reviews();