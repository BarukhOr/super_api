const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');


function tokenForUser(user){
	const timestamp = new Date().getTime();
	return jwt.encode({sub:user.username,iat:timestamp,job:user.job},config.secret);
}


//User has been auth'd, so just send them a token
exports.signIn = function(req,res,next){
	res.json({token:tokenForUser(req.user)});
}