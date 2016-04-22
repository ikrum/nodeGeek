var jwt = require('jsonwebtoken');
var API_SECRET_KEY = "38f534975f20f375h0923h57023975fh2983f7";
var User = require('../models/userModel');


function verifyToken(token, callback){
	jwt.verify(token, API_SECRET_KEY, callback); // function(err, decoded)
}


function generateToken(data){

	return jwt.sign(data, API_SECRET_KEY, { expiresIn: 60*60*2});
}

exports.login = function(req, res, next){
  User.findOne({email: req.body.email, password: req.body.password}, function(err, user){

    if(!user) return next("No user found");
  	var tkn = generateToken(user);
    res.status(200).json({message:"Login successful", data: user, token: tkn});
  });
}


exports.authenticate = function(req,res,next){

  // validate authentication token
  var token = req.headers.token || req.query.token;

  if(!token){
    return next('Authentication token required');
  }
  
  verifyToken(token, function(err, decoded) {

    if (err) {
      if(err.name == 'TokenExpiredError') return next('Token expired');
      return next('Invalid token');
    }

    req.user = decoded;
    next();
  });
}

exports.verifyToken = verifyToken;
exports.generateToken = generateToken;

