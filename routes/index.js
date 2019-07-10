const express    = require("express"),
	  router     = express.Router(),
	  passport   = require("passport"),
	  localStrategy = require("passport-local"),
	  User       = require("../models/user");


router.get("/", function(req, res){
	res.render("landing");
});

//=============
// AUTH ROUTES
//=============

// Register
router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			res.redirect("/register");
		} 
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome, " + user.username);
			res.redirect("/parks");
		});
	});
});

// Login
router.get("/login", function(req, res){
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/parks",
	failureRedirect: "/login"
}),
function(req, res){
	
});

// Logout
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Successfully signed out");
	res.redirect("/parks");
});

module.exports = router;