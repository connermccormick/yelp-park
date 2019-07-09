const express  = require("express"),
	  app      = express(),
	  mongoose = require("mongoose");

var parkSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String
});

module.exports = mongoose.model("Park", parkSchema);