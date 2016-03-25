var jwt = require('jsonwebtoken');
var API_SECRET_KEY = "38f534975f20f375h0923h57023975fh2983f7";


function verifyToken(token, callback){
	jwt.verify(token, API_SECRET_KEY, callback); // function(err, decoded)
}


function generateToken(data){

	return jwt.sign(data, API_SECRET_KEY, { expiresIn: 60*60*2});
}

exports.login = function(req, res, next){
	if(req.body.username != "node" || req.body.password != "geek")
		return res.status(400).json({error:"Invalid username or password"});

	var data = {
		userid: 1,
		email: "node@geek.com",
		name: "Node Geek"
	}
	var tkn = generateToken(data);

	res.status(200).json({message:"Login successful", token: tkn});


}


exports.verifyToken = verifyToken;
exports.generateToken = generateToken;

