const express  = require("express"),
	  app      = express(),
	  mongoose = require("mongoose");

var parkSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Park", parkSchema);