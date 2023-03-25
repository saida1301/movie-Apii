const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  movieId:{type: String, required: true}

});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
