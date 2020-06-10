const Logger = require("./logger");
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'test';
process.env.Db = "mongodb";
process.env.mongoUrl = "mongodb://localhost:27017/test";

class DBLayer{
    constructor(){
        this.MongoClient = MongoClient;
        this.getProductReviews = this.getProductReviews.bind(this);
        this.getProductReviewsMongoDB = this.getProductReviewsMongoDB.bind(this);
    }

    async getProductReviews(queryStringParameters, correlationId) {
        const logger = new Logger(correlationId, 'getProductReviews-dbLayer', "getReviews");
        logger.info('Entry', queryStringParameters);
        try {
            logger.info('DB', process.env.Db);
            if (process.env.Db && process.env.Db.toLowerCase() == "mongodb") {
                let res = await this.getProductReviewsMongoDB(queryStringParameters.productId, queryStringParameters.index, queryStringParameters.count,correlationId);
                res = JSON.parse(JSON.stringify(res));
                if (res.reviews.length > 0) {
                    let totalReviews = res.individualRatingCount.reduce((a, b) => ({ count: a.count + b.count }));
                    res.totalReviews = totalReviews;
                    res.avgRating = res.avg[0].avgRating.toFixed(1);
                    delete res["avg"];
                    logger.info('DB response', res);
                    return res;
                } else {
                    throw { status: 404, message: "Product not found" }
                }
    
            } else {
                return [];
            }
        }
        catch (err) {
            logger.error(err);
            throw err;
        }
    }

    async getProductReviewsMongoDB(prodId, index, count,correlationId) {
        const logger = new Logger(correlationId, 'getProductReviewsMongoDB-dbLayer', "getReviews");
        return new Promise((resolve, reject) => {
            try {
                console.log("trying to connect to db");
                this.MongoClient.connect(url, async function (err, client) {
                    if(err){
                        logger.error(err);
                        reject(new Error("DB error"));
                    }
                    logger.info('Connection to mongodb successful');
                    console.log("Connected successfully to server");
                    const db = client.db(dbName);
                    const collection = db.collection('reviews');
                    let reviewDocs = await collection.find({ productId: prodId }).sort({ updatedAt: -1 }).skip(index).limit(count).toArray();
                    reviewDocs = JSON.parse(JSON.stringify(reviewDocs));
                    reviewDocs = reviewDocs.map(e => { return { review: e.reviewText, email: e.customerEmailId, rating: e.rating } });
                    logger.info('reviewDocs',reviewDocs);
                    let avg = await collection.aggregate([
                        {
                            $match: {
                                productId: prodId
                            }
                        },
                        {
                            "$group": {
                                "_id": null,
                                "avgRating": {
                                    "$avg": "$rating"
                                }
                            }
                        },
                        {
                            $project: {
                                avgRating: 1,
                                _id: 0
                            }
                        }
                    ]).toArray();
                    logger.info('avg',avg);
    
                    let individualRatingCount = await collection.aggregate([
                        {
                            $match: {
                                productId: prodId
                            }
                        },
                        {
                            $group: {
                                _id: "$rating",
                                count: {
                                    $sum: 1
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                rating: "$_id",
                                count: 1
                            }
                        }
                    ]).toArray();
                    logger.info('individualRatingCount',individualRatingCount);
                    resolve({ avg, individualRatingCount, reviews: reviewDocs });
                });
    
            } catch (err) {
                console.log("Db conn err", err);
                reject(new Error("DB error"));
            }
        });
    
    }
}

module.exports = new DBLayer();