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
		if(err || !park){
			req.flash("error", "Unable to add comment");
			res.redirect("/parks");
		} else {
			var newComment = new Comment(req.body.comment);
			newComment.author.username = req.user.username;
			newComment.author.id = req.user.id;
			
			Comment.create(newComment, function(err, createdComment){
				if(err || !createdComment){
					req.flash("error", "Unable to add comment");
				} else {
					park.comments.push(createdComment);
					park.save();
					req.flash("success", "Comment added successfully");
					res.redirect("/parks/" + park.id);
				}
			});
		}
	});
});

// Edit 
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Park.findById(req.params.id, function(err, park){
		if(err || !park){
			res.redirect("/parks");
			req.flash("error", "Park not found");
		}
		Comment.findById(req.params.comment_id, function(err, comment){
			if(err || !comment){
				req.flash("error", "Comment not found");
				res.redirect("/parks/"+park.id);
			}
			res.render("comments/edit", {park: park, comment: comment});
		});
	});
	
});

// Update 
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Park.findById(req.params.id, function(err, park){
		Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
			if(err){
				req.flash("error", "There was an error updating the comment");
			}
			res.redirect("/parks/" + park.id);
		});
	});
});

// Destroy
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			req.flash("error", "There was an error deleting the comment");
		} 
		req.flash("success", "Comment deleted successfully");
		res.redirect("/parks/" + req.params.id);
	});
});

module.exports = router;