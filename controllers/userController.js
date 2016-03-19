var User = require('../models/userModel');

//var dbHelper = require('../utils/dbHelper');
//var sequence = dbHelper.sequenceGenerator; 
var sequence = require('../utils/dbHelper').sequenceGenerator("userid");

exports.getUsers=function(req,res,next){

	User.find({}, function(err, users){
		res.json({message: "User list", data: users});
	});
	
}

exports.getUser = function(req,res,next){


	if(isNaN(req.params.userid)) 
		return res.status(400).json({error: "parameter should be a number"});

	User.findOne({userid: req.params.userid}, function(err, user){

		if(err) return res.status(400).json({message: "An error occured", error: err});
		res.json({message: "A single user profile", data: user});
	});
}

exports.addUser = function(req,res,next){
	sequence.next(function(nextSeq){
		var userObj = {
			userid: nextSeq,
			fname: req.body.firstName,
			lname: req.body.lname,
			password: req.body.pwd,
			email: req.body.email
		};

		var user = new User(userObj);
		user.save(function(err){
			if(err) return res.status(400).json({message : "Error occured", error: err });

			//var response = {message: "New user created", data:user};
			//res.json(response)
			res.json({message: "New user created", data:user});
		});
	});
}