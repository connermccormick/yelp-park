const Park    = require("../models/park");
const Comment = require("../models/comment");

var middlewareObj = [];

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You must be logged in to do that!");
	res.redirect("/login");
};

middlewareObj.checkParkOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Park.findById(req.params.id, function(err, park){
			if(err){
				req.flash("error", "Park not found");
				res.redirect("/parks");
			} else if(park.author.id.equals(req.user.id)){
				next();
			} else {
				req.flash("error", "You don't have permission to do that!");	
				res.redirect("back");
			}
		});
	} else {
		req.flash("error", "You must be logged in to do that!");
		res.redirect("/login");
	}
};

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, park){
			if(err){
				req.flash("error", "Comment not found");
				res.redirect("/parks");
			} else if(park.author.id.equals(req.user.id)){
				next();
			} else {
				req.flash("error", "You don't have permission to do that!");	
				res.redirect("back");
			}
		});
	} else {
		req.flash("error", "You must be logged in to do that!");
		res.redirect("/login");
	}
};

module.exports = middlewareObj;