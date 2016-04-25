const Authentication = require('../controllers/authentication')
const passportService = require('../services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt',{session:false})
const requireSignin = passport.authenticate('local',{session:false})


module.exports = function(app){
	app.get('/',function(request,response,next){
		response.send(['waterbottle','phone','paper']);
	})

	app.post('/authCheck',requireAuth,function(request,response){
		response.send({message:'Super Api Stands Ready'})
	})
	
	app.post('/signin',requireSignin,Authentication.signIn)
}