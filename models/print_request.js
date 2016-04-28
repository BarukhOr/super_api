var mongoose = require('mongoose');

//Print Request Schema
var printRequestSchema = mongoose.Schema({
	date_created:{
		type:Date
	},
	author:{
		type:String
	},
	name:{
		type:String
	},
	Event_Title:{
		type:String
	},
	comment:{
		type:String
	},
	req_imgUrl:{
		type:[String]
	},
	status:{
		type:String
	},
	assigned_to:{
		type:String
	}
},{collection: 'print_requests'}) //override default collection name

var PrintRequests = module.exports = mongoose.model('print_requests',printRequestSchema)

module.exports.getPrintRequestByID = function(id,callback){
	PrintRequests.findById(id,callback);
}

module.exports.getPrintRequests = function(callback,limit){
	PrintRequests.find(callback).limit(limit);
}

module.exports.getPending = function(callback,limit){
	PrintRequests.find({status:"pending"},callback).limit(limit);
}

module.exports.getDenied = function(callback,limit){
	PrintRequests.find({status:"denied"},callback).limit(limit);
}

module.exports.getInProgress = function(callback,limit){
	PrintRequests.find({status:"in_progress"},callback).limit(limit);
}

module.exports.getCompleted = function(callback,limit){
	PrintRequests.find({status:"completed"},callback).limit(limit);
}

module.exports.countCompleted = function(callback){
	PrintRequests.find().count({status:"completed"},callback);
}

module.exports.countPrintRequests = function(callback){
	PrintRequests.find().count(callback);
}

module.exports.countPending = function(callback){
	PrintRequests.find().count({status:"pending"},callback);
}

module.exports.countDenied = function(callback){
	PrintRequests.find().count({status:"denied"},callback);
}

module.exports.countInProgress = function(callback){
	PrintRequests.find().count({status:"in_progress"},callback);
}