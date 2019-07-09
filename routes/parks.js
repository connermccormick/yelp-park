const express    = require("express"),
	  router     = express.Router(),
	  Park       = require("../models/park");

// Index
router.get("/", function(req, res){
	res.render("parks/index");
});

// Create 
router.get("/new", function(req, res){
	res.render("parks/new");
});

// Create Logic
router.post("/", function(req, res){
	Park.create(req.body.park, function(err, createdPark){
		if(err){
			console.log(err);
		} else {
			console.log(createdPark);
		}
		res.redirect("/parks");
	});
});


module.exports = router;