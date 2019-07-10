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
			var newComment = new Comment(req.body.comment);
			newComment.author.username = req.user.username;
			newComment.author.id = req.user.id;
			
			Comment.create(newComment, function(err, createdComment){
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

// Edit 
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Park.findById(req.params.id, function(err, park){
		Comment.findById(req.params.comment_id, function(err, comment){
			res.render("comments/edit", {park: park, comment: comment});
		});
	});
});

// Update 
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Park.findById(req.params.id, function(err, park){
		Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
			if(err){
				consol.log(err);
			}
			res.redirect("/parks/" + park.id);
		});
	});
});

// Destroy
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			console.log(err);
		} 
		res.redirect("/parks/" + req.params.id);
	});
});

module.exports = router;