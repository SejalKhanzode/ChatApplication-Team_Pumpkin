const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		contactNumber: {
			type: Number,
			default: true,
		},
		profileImage: {
			type: String,
			default: true,
		},
		token: {
			type: String,
		},
		
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);