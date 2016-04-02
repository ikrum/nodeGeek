"use strict";

var ejs = require('ejs')
  , fs = require('fs');
exports.getHTML=function(tpl,args){
	var str = fs.readFileSync(__dirname +'/../views/'+tpl, 'utf8'); 
	var html = ejs.render(str, args);
	return html;
} 