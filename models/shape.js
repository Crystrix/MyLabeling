var mongoose = require('./db');

function Shape(shape,username) {
	this.shapeid = shape.shapeid;
	this.shapename = shape.shapename;
	this.shapecategory = shape.shapecategory;
	this.username = username;
	
};
var UserSchema = new mongoose.Schema({
    shapeid: String,
	shapename: String,
	shapecategory: String,
	username: String 
});


var ShapeModel = mongoose.model('Shape', ShapeSchema); 


module.exports = Shape;

//存入Mongodb的文档
Shape.prototype.save = function save(callback) {
	var user = new UserModel({
		username: this.username,
		password: this.password
	});
	user.save(function(err){callback(err, user);});	
	
}

User.get = function get(username, callback) {
	UserModel.findOne({username:username}, function(err, doc){
		if (err) {
			return callback(err, null);
		}
		if (doc) {
			//封装文档为User对象
			var user = new UserModel(doc);
			callback(err, user);
		} else {
			callback(err, null);
		}
	});
		
};
