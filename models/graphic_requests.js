var mongoose = require('mongoose');

//Print Request Schema
var GraphicRequestSchema = mongoose.Schema({
	{
		timestamps: true
	},
	author:{
		type:String
	},
	name:{
		type:String
	}
	status:{
		type:String,
		default:'pending'
	},
	assigned_to:{
		type:String
	},
	priority:{
		type:String,
		default:'normal'
	},

	title:{
		type:String
	},
	type:{
		type:String,
		default:'design'
	},
	description:{
		type:String
	},
	imgUrl:{
		type:[String]
	},
	date:{
		type:Date
	},
	time:{
		type:String
	},
	orientation:{
		type:String
	},
	width:{
		type:String
	},
	height:{
		type:String
	}

},{collection: 'graphic_requests'}) //override default collection name

var GraphicRequest = module.exports = mongoose.model('requests',GraphicRequestSchema)

module.exports.definedGet = function(type,type_value,callback){
	GraphicRequest.find({type:type_value},callback)
}