const express    = require("express"),
	  router     = express.Router({mergeParams: true}),
	  Park       = require("../models/park"),
	  Comment    = require("../models/comment"),
	  middleware = require("../middleware");

// Create 
router.get("/new", middleware.isLoggedIn, function(req, res){
	Park.findById(req.params.id, function(err, park){
		res.render("comments/new", {park: park});
	});
});

// Create Logic
router.post("/", middleware.isLoggedIn, function(req, res){
	Park.findById(req.params.id, function(err, park){
		if(err){
			console.log(err);
			res.redirect("/parks");
		} else {
			Comment.create(req.body.comment, function(err, createdComment){
				if(err){
					console.log(err);
				} else {
					park.comments.push(createdComment);
					park.save();
					res.redirect("/parks/" + park.id);
				}
			});
		}
	});
});

// Destroy
router.delete("/:comment_id", middleware.isLoggedIn, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			console.log(err);
		} 
		res.redirect("/parks/" + req.params.id);
	});
});

module.exports = router;