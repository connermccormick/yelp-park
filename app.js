const express = require("express"),
	  app     = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");
});

//Start Server
app.listen(3000, function(){
	console.log("YelpPark server is running!");
});