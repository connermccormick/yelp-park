const express = require("express"),
	  app     = express();

const indexRoutes = require("./routes/index"),
	  parkRoutes  = require("./routes/parks");

app.set("view engine", "ejs");

//Routes
app.use(indexRoutes);
app.use("/parks", parkRoutes);

//Start Server
app.listen(3000, function(){
	console.log("YelpPark server is running!");
});