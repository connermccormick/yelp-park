const Park    = require("../models/park");
const Comment = require("../models/comment");

var middlewareObj = [];

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

middlewareObj.checkParkOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Park.findById(req.params.id, function(err, park){
			if(err){
				console.log(err);
				res.redirect("/parks");
			} else if(park.author.id.equals(req.user.id)){
				next();
			} else {
				res.send("You don't have permission to do that!");	
			}
		});
	} else {
		res.redirect("/login");
	}
};

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, park){
			if(err){
				console.log(err);
				res.redirect("/parks");
			} else if(park.author.id.equals(req.user.id)){
				next();
			} else {
				res.send("You don't have permission to do that!");	
			}
		});
	} else {
		res.redirect("/login");
	}
};

module.exports = middlewareObj;