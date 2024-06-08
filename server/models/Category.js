const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	discription: {
		type: String,
	},
	course: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	]
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;