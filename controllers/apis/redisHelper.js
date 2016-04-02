var redis = require('redis');

var client = redis.createClient();
client.on('connect', function() {
    console.log('Redis connected');
});

/*
 * @param key 		userid etc
 * @param opts		{findKey:"messageid", savingKey:"custom-fixed-key"}
 *
 * uses of opts		{findKey:"userid"} 					// store mutilple data with ids, userid-1, jobid-35
 * uses of opts		{savingKey:"userid-10"}			// store single data with fixed key
 */
exports.storeResponse = function(data, opts){
	if(typeof data=="undefined") return console.log("response doesn't have data field");
	// when data is an array of objects
	if(Array.isArray(data)){
		for(var index in data)
			save(data[index]);
	}else{
		save(data);
	}
	function save(obj){
		// save the data for the key, messageid-2, userid-34, user-10-jobs
		if(opts.savingKey)
			var savingKey = opts.savingKey; // user-10-jobs
		else
			var savingKey = opts.findKey+"-"+obj[opts.findKey]; // messageid-2

		console.log("saving ", savingKey);
		client.set(savingKey, JSON.stringify(obj));
		client.expire(savingKey, 300); // 5 minuite , 5*60 = 300 seconds 
	}
}

/*
 * @param opts 			{key:"user-10-job", ids:[12,3], prefix:"messageid"}
 * return boolean		only return true if data for all ID(s) exists
 * return JSON			return JSON object for ID(s)
 *
 * uses 						{key:"user-10-job"} OR {key:"userid-10"} 		// single fixed id
 * uses 						{ids:[12,3], prefix:"messageid"} 								// multiple ids
 */
exports.getData = function(opts, callback){
	// get data for fixed/single id
	if(typeof opts.key != "undefined"){
		client.get(opts.key, function(err, reply){
			if(err || typeof reply != "string") return callback(false);
			callback(JSON.parse(reply));
		});
	}else{
		// multiple ids
		var keys = getKeys(opts);
		client.mget(keys, function(err, replies){
			if(err) return callback(false);
			var jsonReplies = [];

			for(var index in replies){
				if(typeof replies[index] != "string") return callback(false); // reply is nill/null for one id
				jsonReplies.push(JSON.parse(replies[index]));
			}
			callback(jsonReplies);
		});
	}
}

/*
 * @param opts 			{key:"user-10-job", ids:[12,3], prefix:"messageid"}
 */
exports.remove = function(opts){
	if(typeof opts.key != "undefined"){
		client.del(opts.key, function(err, reply) {});
	}else{
		var keys = getKeys(opts);
		keys.forEach(function(key){
			client.del(key, function(err, reply) {});
		});
	}
}


function getKeys(opts){
	var keys = [];
	opts.ids.forEach(function(id){
		keys.push(opts.prefix+"-"+id);
	});
	return keys;
}