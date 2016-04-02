var request = require('superagent');
var redisHelper = require('./redisHelper');

exports.getUsers = function(userIds,callback){
	redisHelper.getData({ids:userIds, prefix:"userid"}, function(data){
		// return data from redis
		if(data) return callback(null, {body:{data:data}}); // simulate res.body.data for response callback

		// if data not found in redis
		console.log("getUsers : redis not found, fetching data");
		var endPoint = "file:///home/ikrum/users.json.html";
		request
		  .get(endPoint)
	   	.set('Accept', 'application/json')
		  .end(function(err, res){
		  	
		  	//redisHelper.getData({key:"userid-1"});
		  	if(!err) redisHelper.storeResponse(res.body.data, {findKey:"userid"})
		  	callback(err, res);
		  });
	});		
}


