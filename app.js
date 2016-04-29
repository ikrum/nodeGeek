var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var apiRoutes = require('./routes/apiRoutes');

// connect to 'nodedb' Database
mongoose.connect('mongodb://localhost/nodeGeek');
var db = mongoose.connection;
 
db.on('error', function (err) {
  console.log('Mongo connection error. Please check Mongo is running');
  console.log(err);
});
db.once('open', function () {
  console.log('MongoDb connected.');
});


zz
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', apiRoutes);

//console.log(process.env);
app.set("env", "production");
console.log(app.get("env"));


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/*****************************
 *
 *
 *     ERROR HANDLERS
 *
 *
 *****************************/


// handling request errors
// @err must contain a string, provided by next('some error message')
app.use(function(err, req, res, next) {
  if (typeof err === 'string'){

    if(err.toLowerCase().indexOf("not found")>0)
      res.status(404).json({status:404, error:err});
    else
      res.status(400).json({status:400, error:err});
  }else{
    next(err);
  }
});


// Handle 404
app.use(function(req, res) {
  res.status(404).json({status:404,error:"Page not found"});
});

// Handle unexpected internal server error
// @err should be an error object
app.use(function(err, req, res, next) {
  if (typeof err === 'string')
    return;

  console.log( "Internal Server Error!" );
	console.log( err );
});

module.exports = app;
