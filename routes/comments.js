const express    = require("express"),
	  router     = express.Router({mergeParams: true}),
	  Park       = require("../models/park"),
	  Comment    = require("../models/comment");

// Create 
router.get("/new", function(req, res){
	Park.findById(req.params.id, function(err, park){
		res.render("comments/new", {park: park});
	});
});

// Create Logic
router.post("/", function(req, res){
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

module.exports = router;