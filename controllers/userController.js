var User = require('../models/userModel');
var async= require('async');
var sequence = require('../utils/dbHelper').sequenceGenerator("userid");
var jobQueue = require("./apis/jobQueue");
var template = require('../utils/template');

exports.getUsers=function(req,res,next){

	User.find({}, function(err, users){
		res.json({message: "User list", data: users});
	});
	
}

exports.updateUser = function(req,res,next){
	User.findOne({userid: req.params.userid}, function(err, user){
		if(!user) return next("No user found");
		user.fname = req.body.fname;
		user.lname = req.body.lname;
		user.save(function(err){
			if(err) return next(err);
			res.json({message: "profile updated"});
		});
	})
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
	var userid, userObj;

	var doesUserExists = function(callback){
		User.findOne({email: req.body.email}, function(err, user){
			user = user || {};
			if(user.userid)
				callback("Email already exists");
			else
				callback();
		});
	}

	var getNewId = function(callback){
		sequence.next(function(nextSeq){
			userid = nextSeq;
			callback();
		});
	}

	var saveUser = function(callback){
		userObj = {
			userid: userid,
			fname: req.body.fname,
			lname: req.body.lname,
			password: req.body.password,
			email: req.body.email
		};

		var user = new User(userObj);
		user.save(function(err){
			if(err) return callback(err);
			res.json({message: "New user created", data:user});

			callback();
		});
	}

	var sendNotification = function(callback){
		var html=template.getHTML('confirmAccount.ejs',{userName: "Ikrum Hosain", link: "http://google.com"});
		var mailData={to:userObj.email,subject:"Confirm account",message:html};
		jobQueue.queueEmail(mailData);
		callback();

	}

	// run all tasks
	async.series([doesUserExists, getNewId, saveUser, sendNotification], function(err, result){
		if(err) return next(err);
	});

}