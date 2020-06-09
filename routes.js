let getReviewsHandler = require("./controllers/getProductReviews/expressHandler");
let addReviewsHandler = require("./controllers/addProductReviews/expressHandler");
module.exports = { getProductReviews: getReviewsHandler,addProductReviews:addReviewsHandler };