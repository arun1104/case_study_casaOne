'use strict';
const { getReviews } = require("./getReviews");
const crypto = require("crypto");
module.exports.getReviewsServerlessHandler = async function (event) {
    let correlationId;
    if (event.correlationId) {
        correlationId = event.correlationId;
    } else {
        correlationId = crypto.randomBytes(20).toString('hex');
    }
    const promise = new Promise(async function (resolve, reject) {
        let res;
        try {
            switch (event.httpMethod) {
                case 'GET':
                    res = await getReviews(event.queryStringParameters,correlationId);
                    break;
                default:
                    throw (new Error(`Unsupported method "${event.httpMethod}"`));
            }
            let resp = {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': '*'
                }, body: JSON.stringify(res),
                status: 200
            };
            resolve(resp);
        } catch (err) {
            reject(err);
        }
    });
    return promise
};