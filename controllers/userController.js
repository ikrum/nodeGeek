var User = require('../models/userModel');

exports.getUsers=function(req,res,next){

	User.find({}, function(err, users){
		res.json({message: "User list", data: users});
	});
	
}

exports.getUser = function(req,res,next){

	res.send("getting a specific user profile of user "+req.params.userid);
}

exports.addUser = function(req,res,next){

	console.log(req.body);

	var userObj = {
		fname: req.body.firstName,
		lname: req.body.lname,
		password: req.body.pwd,
		email: req.body.email
	};

	var user = new User(userObj);
	user.save(function(err){
		if(err) return res.json({message : "Error occured", error: err });

		//var response = {message: "New user created", data:user};
		//res.json(response)
		res.json({message: "New user created", data:user});
	});
}