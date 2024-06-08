const mongoose = require("mongoose");
const {mailsender} = require("../utils/mailsender")

const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 5 * 60,
	},
});

OTPSchema.pre("save",async function(next){
	try{
		if(this.isNew){
			await mailsender(this.email,"email varification",this.otp)
		}
		next();
	}catch(error){
		console.log(error.message)
		throw error;
	}
})

const OTP = mongoose.model("OTP", OTPSchema);
module.exports = OTP;