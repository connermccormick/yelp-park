const express    = require("express"),
	  router     = express.Router();

router.get("/", function(req, res){
	res.render("parks/index");
});

module.exports = router;