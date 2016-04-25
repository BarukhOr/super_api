const Mongoose = require('mongoose')
const Schema = Mongoose.Schema


//User Schema
const userSchema = new Schema({
	name:{
		type:String
	},
	imgUrl:{
		type:String
	},
	username:{
		type:String,
		unique:true,
		lowercase:true
	},
	job:{
		type:[Number]
	},
	password:{
		type:String
	}
})


userSchema.methods.comparePassword = function(candidatePassword,callback){
	if(candidatePassword === this.password){
		callback(null,true)
	}else{
		callback(null,false)
	}
}


//Create the model class
const ModelClass = Mongoose.model('user',userSchema)


//Export the model
module.exports = ModelClass