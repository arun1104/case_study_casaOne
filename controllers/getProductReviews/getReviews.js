
const { getReviewsReqSchema } = require('./hapiSchemas/getReviewsReqSchema');
const { getReviewsResponseSchema } = require('./hapiSchemas/getReviewsResponseSchema');
const { dbLayer } = require('./utilities/dbLayer');
const Logger = require('./utilities/logger');
module.exports.getReviews = async function getReviews(params, correlationId) {
    const logger = new Logger(correlationId, 'getReviews', 'getReviews');
    logger.info('Entry');
    try {
        const reqParams = await getReviewsReqSchema.validateAsync(params);
        logger.info('reqParams', reqParams);
        let res = await dbLayer.getProductReviews(reqParams,correlationId);
        logger.info('Exit');
        return res;      
    }
    catch (err) {
        logger.error(err, 500);
        logger.info('Exit');
        throw err;
    }
}