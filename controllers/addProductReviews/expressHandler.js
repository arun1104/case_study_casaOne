
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review = new Schema({
    productId: { type: String, required: true, trim: true },
    rating: { type: Number, required: true }
}, { strict: false, timestamps: true });

const reviewModel = mongoose.model("review", review);
module.exports = async function addReviewsHandler(req, res) {
    await mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
    let newReview = new reviewModel(req.body);
    await newReview.save();
    res.status(200).send({ message: "added review" });
}


