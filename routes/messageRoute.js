var express = require('express');

var router = express.Router();


// GET localhost:3000/api/messages/
router.get('/', function(req,res, next){
	res.send("welcome to meessages endpoint");
});

module.exports = router;
