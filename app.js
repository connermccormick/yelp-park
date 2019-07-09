const express = require("express"),
	  app     = express();

app.get("/", function(req, res){
	res.send("Working!");
});

//Start Server
app.listen(3000, function(){
	console.log("YelpPark server is running!");
});