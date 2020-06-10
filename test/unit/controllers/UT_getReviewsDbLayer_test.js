var assert = require('assert');
var mocha = require('mocha');
var sinon = require('sinon');
let describe; let it; let before; let after;
if (mocha.describe) {
    describe = mocha.describe;
    it = mocha.it;
    before = mocha.before;
    after = mocha.after;
} else {
    describe = global.describe;
    it = global.it;
    before = global.before;
    after = global.after;
}
let dbLayer = require('../../../controllers/getProductReviews/utilities/dbLayer');

describe('getProductReviews positive suit', async function () {
    it('should return valid values', async function () {
        dbLayer.getProductReviewsMongoDB = sinon.stub();
        dbLayer.getProductReviewsMongoDB.resolves({
            avg: [{ avgRating: 1.3 }],
            individualRatingCount: [{ rating: 1, count: 5 }],
            reviews: [{
                email: "hAGShjsa",
                rating: 2,
                review: "hgjhsd"
            }]
        });
        try {
            let reqObj = { productId: "123", index: 0, count: 10 };
            let result = await dbLayer.getProductReviews(reqObj, "7i68gduygwduvwd");
            assert.equal(result.avgRating, 1.3);
        } catch (err) {
            assert.fail("Exception in getReviewsDBLayer Positive suit")
        }
    });
});