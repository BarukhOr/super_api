const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')
const User = require('../models/user')
const config = require('../config')

//Create local Strategy
const localLogin = new LocalStrategy(function(username,password,done){
	console.log("within the local Strategy")
	//Verify that the email/password pair is correct, otherwise return false to done
	User.findOne({username:username},function(err,user){
		if(err){return done(err)}
		if(!user){return done(null,false)}

		//Compare password
		user.comparePassword(password,function(err,isMatch){
			if(err){return done(err)}
			if(!isMatch){return done(null,false)}

			return done(null,user)
		})
	})
})

//Create JWT Strategy
const jwtOptions={
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, function(payload,done){
	user.findById(payload.sub,function(err,user){
		if (err) {return done(err,false)}

		if(user){
			done(null,user)
		}else{
			done(null,false)
		}
	})
})

passport.use(jwtLogin)
passport.use(localLogin)