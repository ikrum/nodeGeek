var express = require('express');
var router = express.Router();
var userRoute = require('./userRoute');

// localhost:3000/api/
// localhost:3000/api
router.get('/', function(req,res,next){
	res.send("welcome to api");
})

router.post('/', function(req,res,next){
	res.send("post method in api root");
})


// routing 'users'
// localhost:3000/api/users/
router.use('/users', userRoute);

module.exports = router;