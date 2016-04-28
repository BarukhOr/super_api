const passport = require('passport')
const mongoose = require('mongoose');

const requireAuth = passport.authenticate('jwt',{session:false})
const requireSignin = passport.authenticate('local',{session:false})

const Authentication = require('../controllers/authentication')
const passportService = require('../services/passport')

const PrintRequests = require('../models/print_request');

module.exports = function(app){
	app.get('/',function(request,response,next){
		response.send(['waterbottle','phone','paper']);
	})

	app.post('/',function(request,response,next){
		console.log(request.body)
	})

	app.post('/authCheck',requireAuth,function(request,response){
		response.send({message:'Super Api Stands Ready'})
	})
	
	app.post('/signin',requireSignin,Authentication.signIn)

	app.get('/api/graphics/get/print/all/',function(req,res){
		mongoose.connect('mongodb://localhost/graphic_requests');
		
		PrintRequests.getPrintRequests(function(err,printrequests){
			console.log("Do it~",printrequests);
			mongoose.connection.close()
			if(err){
				throw err;
			}
			res.json(printrequests)
		})
	})
}