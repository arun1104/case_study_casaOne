const Logger = require("./logger");
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'test';
process.env.Db = "mongodb";
process.env.mongoUrl = "mongodb://localhost:27017/test";

async function getProductReviews(queryStringParameters, correlationId) {
    const logger = new Logger(correlationId, 'getProductReviews-dbLayer', "getReviews");
    logger.info('Entry', queryStringParameters);
    try {
        logger.info('DB', process.env.Db);
        if (process.env.Db && process.env.Db.toLowerCase() == "mongodb") {
            let res = await getProductReviewsMongoDB(queryStringParameters.productId);
            res = JSON.parse(JSON.stringify(res));
            let totalReviews = res.individualRatingCount.reduce((a, b) => ({ count: a.count + b.count }));
            res.totalReviews = totalReviews;
            res.avgRating =  res.avg[0].avgRating.toFixed(1);
            delete res["avg"];
            logger.info('DB response', res);
            return res;
        } else {
            return [];
        }
    }
    catch (err) {
        console.log("Db conn err", err);
        throw (new Error("DB error"));
    }
}

async function getProductReviewsMongoDB(prodId) {
    return new Promise((resolve, reject) => {
        try {
            console.log("trying to connect to db");
            MongoClient.connect(url, async function (err, client) {
                console.log("Connected successfully to server");
                const db = client.db(dbName);
                const collection = db.collection('reviews');
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
                console.log(avg);

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
                console.log(individualRatingCount);
                resolve({ avg, individualRatingCount });
            });

        } catch (err) {
            console.log("Db conn err", err);
            reject(new Error("DB error"));
        }
    });

}

module.exports.dbLayer = { getProductReviews };