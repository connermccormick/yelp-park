const express        = require("express"),
	  app            = express(),
	  bodyParser     = require("body-parser"),
	  methodOverride = require("method-override"),
	  mongoose       = require("mongoose"),
	  Park           = require("./models/park"),
	  Comment        = require("./models/comment");


// Require Routes
const indexRoutes   = require("./routes/index"),
	  parkRoutes    = require("./routes/parks"),
	  commentRoutes = require("./routes/comments");


// Connect to DB
mongoose.connect('mongodb://localhost/yelp_park', {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true
});

// Set some shit
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(methodOverride("_method"));


// Routes
app.use(indexRoutes);
app.use("/parks", parkRoutes);
app.use("/parks/:id/comments", commentRoutes);


// Start Server
app.listen(3000, function(){
	console.log("YelpPark server is running!");
});