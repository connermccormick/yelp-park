const express    = require("express"),
	  app        = express(),
	  bodyParser = require("body-parser"),
	  mongoose   = require("mongoose"),
	  Park       = require("./models/park");

// Require Routes
const indexRoutes = require("./routes/index"),
	  parkRoutes  = require("./routes/parks");

// Connect to DB
mongoose.connect('mongodb://localhost/yelp_park', {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

// Routes
app.use(indexRoutes);
app.use("/parks", parkRoutes);

// Start Server
app.listen(3000, function(){
	console.log("YelpPark server is running!");
});