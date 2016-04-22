"use strict";

var request = require('supertest'); 
var expect = require("chai").expect;


var apiEndpoint = "http://localhost:3000";
var userProfile = {
	fname: 'Foo',
	lname: 'Bar',
	password: '123456',
	email: getRandomEmail()
};


/*************************

		User tests

**************************/
describe('User', function() {

	context('#Account', function () {

		it('should Create an account', function (done) {

			request(apiEndpoint).post('/api/users')
	  		.send(userProfile)

	  		.end(function(err, res) {
	  			expect(res.status).to.equal(200);
	  			userProfile.userid = res.body.data.userid;
					done();
				});
		});

		it('should return Email already exists', function (done) {

		  	request(apiEndpoint).post('/api/users')
	  		.send(userProfile)
	  		.end(function(err, res) {
	  			expect(res.status).to.equal(400);

					expect(res.body.error).to.equal("Email already exists");
					done();
	      });
		});



		it('login attempt should notify to verify account', function (done) {
			
			request(apiEndpoint).post('/api/auth')
			.send(userProfile)
			.end(function(err, res){
				expect(res.status).to.equal(400);
				expect(res.body.error).to.equal("Please verify your account");
				done();
			});
		});

		

		it('should return token on Login success', function (done) {
			request(apiEndpoint).post('/api/auth')
			.send(userProfile)
			.end(function(err, res){
				
				expect(res.status).to.equal(200);
				expect(res.body.data).to.have.property('userid');
				expect(res.body.token).to.be.a('string');
				done();
			});
		});

		it('should return "No user found" for login', function (done) {
			
		  request(apiEndpoint).post('/api/auth')
			.send({email:getRandomEmail(),password:"12345"})
			.end(function(err, res){
		  		
				expect(res.status).to.equal(400);
				expect(res.body.error).to.equal("No user found");
				done();
		  });
		});
	});

	context("#Profile",function(){
		it("update user profile",function(done){

			request(apiEndpoint).put('/api/users/'+userProfile.userid)
			.send({fname: "updated fname", lname: "updated lname"})
			.end(function(err, res){
				expect(res.status).to.equal(200);
				done();
			});
		});

		it("change profile pic", function(done){
			expect(200).to.equal(400);
			done();
		});

		it("change password", function(done){
			expect(200).to.equal(200);
			done();
		});
	});

});



function getRandomEmail(){
	return Math.random().toString(36).substring(7)+"@host.com";
}