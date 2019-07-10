const express    = require("express"),
	  router     = express.Router(),
	  Park       = require("../models/park"),
	  middleware = require("../middleware");

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
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("parks/new");
});

// Create Logic
router.post("/", middleware.isLoggedIn, function(req, res){
	Park.create(req.body.park, function(err, createdPark){
		if(err){
			console.log(err);
		} else {
			console.log(createdPark);
		}
		res.redirect("/parks");
	});
});

// Read
router.get("/:id", function(req, res){
	Park.findById(req.params.id).populate('comments').exec(function(err, park){
		if(err){
			console.log(err);
			res.redirect("/parks");
		} else {
			res.render("parks/show", {park: park});
		}
	});
});

// Edit
router.get("/:id/edit", middleware.isLoggedIn, function(req, res){
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
router.put("/:id", middleware.isLoggedIn, function(req, res){
	Park.findByIdAndUpdate(req.params.id, req.body.park, function(err, park){
		if(err){
			console.log(err);
			res.redirect("/parks");
		} else {
			res.redirect("/parks/" + req.params.id);
		}
	});
});

// Destroy
router.delete("/:id", middleware.isLoggedIn, function(req, res){
	Park.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
		}
		res.redirect("/parks");
	});
});

module.exports = router;