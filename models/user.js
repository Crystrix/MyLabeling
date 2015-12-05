var mongoose = require('./db');

function User(user) {
	this.username = user.username;
	this.password = user.password;
};


var UserSchema = new mongoose.Schema({
    username: String,
	password: String
});

var UserModel = mongoose.model('User', UserSchema); 


module.exports = User;

//存入Mongodb的文档
User.prototype.save = function save(callback) {
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

UserSchema.statics = {
	findUserIdByUsername:function(username, callback){
		return this
			.findOne({username:username})
			.exec(callback)
	}
}