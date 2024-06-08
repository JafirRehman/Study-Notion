const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
	},
	rating: {
		type: Number,
		required: true,
	},
	review: {
		type: String,
		required: true,
	},
});

const RatingAndReview=mongoose.model("RatingAndReview", ratingAndReviewSchema);
module.exports = RatingAndReview;