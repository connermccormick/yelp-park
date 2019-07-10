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
	var park = new Park(req.body.park);
	park.author.id = req.user.id;
	park.author.username = req.user.username;
	
	Park.create(park, function(err, createdPark){
		if(err || !createdPark){
			req.flash("error", "There was an error creating the new park");
		} else {
			req.flash("success", "New park created successfully");
		}
		res.redirect("/parks");
	});
});

// Read
router.get("/:id", function(req, res){
	Park.findById(req.params.id).populate('comments').exec(function(err, park){
		if(err || !park){
			req.flash("error", "Park not found");
			res.redirect("/parks");
		} else {
			res.render("parks/show", {park: park});
		}
	});
});

// Edit
router.get("/:id/edit", middleware.checkParkOwnership, function(req, res){
	Park.findById(req.params.id, function(err, park){
		if(err || !park){
			req.flash("error", "Park not found");
			res.redirect("/parks");
		} else {
			res.render("parks/edit", {park: park});
		}
	});
});

// Update
router.put("/:id", middleware.checkParkOwnership, function(req, res){
	Park.findByIdAndUpdate(req.params.id, req.body.park, function(err, park){
		if(err || !park){
			req.flash("error", "Unable to update park");
			res.redirect("/parks");
		} else {
			req.flash("success", "Park updated successfully");
			res.redirect("/parks/" + req.params.id);
		}
	});
});

// Destroy
router.delete("/:id", middleware.checkParkOwnership, function(req, res){
	Park.findByIdAndRemove(req.params.id, function(err){
		if(err){
			req.flash("error", "Unable to delete park");
		}
		req.flash("success", "Park deleted successfully");
		res.redirect("/parks");
	});
});

module.exports = router;