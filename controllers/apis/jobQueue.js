"use strict";

var Gearman = require('abraxas');
var gearmanClient = Gearman.Client.connect({ servers: ['127.0.0.1:4730'], defaultEncoding:'utf8' },function(){});
var template = require('../../utils/template');


gearmanClient.on("connect", function(){
	console.log("gearman connected to the server!");
});


/*
	Queue Email
	@params opts: {to, subject, message}
*/
exports.queueEmail = function(opts) {
	
	var data = {
		to: opts.to,
		subject: opts.subject,
		msg: opts.message
	};

	gearmanClient.submitJobBg('email', JSON.stringify(data));
	return true;
}

