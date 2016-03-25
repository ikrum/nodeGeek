var express = require('express');
var router = express.Router();
var userRoute = require('./userRoute');
var messageRoute = require('./messageRoute');
var authController = require('../controllers/authController');

// localhost:3000/api/
// localhost:3000/api
router.get('/', function(req,res,next){
	res.send("welcome to api");
})

router.post('/', function(req,res,next){
	res.send("post method in api root");
})

// authentication endpoint
router.post('/auth', authController.login);


// routing 'users'
// localhost:3000/api/users/
router.use('/users', userRoute);


// routing 'messages'
// localhost:3000/api/messages/
router.use('/messages', messageRoute);

module.exports = router;