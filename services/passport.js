const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const ActiveDirectory = require('activedirectory');
const mongoose = require('mongoose');

const User = require('../models/user');

//Store Mission Critical Secrets in this file
const Config = require('../config');

//Create local Strategy
const localLogin = new LocalStrategy(function(username,password,done){
	
	// const db = mongoose.createConnection('mongodb://localhost/auth');
	// db.open('localhost','auth')
	// db.open()
	// 
	
	
	const localConfig = {
		baseDN:Config.baseDN,
		url:Config.ldap_url,
		username:username+Config.domain,
		password:password
	}

	const ad = new ActiveDirectory(localConfig)

	ad.authenticate(localConfig.username,localConfig.password,function(err,auth){
		if (err) {return done(err)}
		
		if (auth){
			mongoose.connect('mongodb://localhost/auth');
			User.findOne({username:username},function(err,user){
				mongoose.connection.close();
				if (err) {return done(err)}
				if (user){
					return done(null,user);
				}else{
					return done(null,false);
				}
			})
		}else{
			console.log("Authentication Failed");
			return done(null,false);
		}

	})
})

//Create JWT Strategy
const jwtOptions={
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: Config.secret
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