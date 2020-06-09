
const { getReviewsServerlessHandler } = require('./serverlessHandler');
const Logger = require('./utilities/logger');
module.exports = async function getReviewsHandler(req,res) {
    const correlationId = req.correlationId();
    const logger = new Logger(correlationId,'getReviews-expressHandler','getReviews');
    logger.info('Entry');
    try {
        const correlationId = req.correlationId();
        let event = { correlationId,body: JSON.stringify(req.body), queryStringParameters: req.query, httpMethod: req.method, path: req.path }
        let handlerRes = await getReviewsServerlessHandler(event);
        let resBody = JSON.parse(handlerRes.body);
        res.set(handlerRes.headers);
        res.status(handlerRes.status).send(resBody);
    } catch (err) {
        if(err.status && err.message){
            logger.error(err,err.status);
            res.status(err.status).send({ message: err.message });
        }else{
            logger.error(err,500);
            res.status(500).send({ message: "Internal server error" });  
        }     
    }
}