var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new Schema({
	userid:{
		type : Number,
		unique : true,
		required: true
	},
	fname:{ 
		type: String, 
		required: true, 
		trim: true
	},
	lname:{ 
		type: String, 
		required: true, 
		trim: true
	},
	email:{
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique : true
	},
	password: String,
	full_name: String
})

// var user = new User(userObj)
module.exports = mongoose.model('User',User);