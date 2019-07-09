const express    = require("express"),
	  router     = express.Router(),
	  Park       = require("../models/park");

// Index
router.get("/", function(req, res){
	Park.find({}, function(err, parks){
		if(err){
			console.log(err);
		} else {
			res.render("parks/index", {parks: parks});
		}
	});
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

// Show
router.get("/:id", function(req, res){
	Park.findById(req.params.id, function(err, park){
		if(err){
			console.log(err);
			res.redirect("/parks");
		} else {
			res.render("parks/show", {park: park});
		}
	});
});

// Edit
router.get("/:id/edit", function(req, res){
	Park.findById(req.params.id, function(err, park){
		if(err){
			console.log(err);
			res.redirect("/parks");
		} else {
			res.render("parks/edit", {park: park});
		}
	});
});

// Update
router.put("/:id", function(req, res){
	Park.findByIdAndUpdate(req.params.id, req.body.park, function(err, park){
		if(err){
			console.log(err);
			res.redirect("/parks");
		} else {
			res.redirect("/parks/" + req.params.id);
		}
	});
});

module.exports = router;