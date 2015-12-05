var mongoose = require('./db');

function Group(group,username) {
	this.groupname = group.groupname;
	this.username = username;
	this.iteration = 0;
};
var UserSchema = new mongoose.Schema({
	groupname: String,
	username: String,
	iteration: Number
});


var GroupModel = mongoose.model('Group', GroupSchema); 


module.exports = Group;

//存入Mongodb的文档
Group.prototype.save = function save(callback) {
	var group = new GroupModel({
		groupname: this.groupname,
		username: this.username,
		iteration: 0
	});
	group.save(function(err){callback(err, group);});	
	
}

Group.get = function get(username, callback) {
	UserModel.findOne({username:username}, function(err, doc){
		if (err) {
			return callback(err, null);
		}
		if (doc) {
			//封装文档为User对象
			var group = new GroupModel(doc);
			callback(err, group);
		} else {
			callback(err, null);
		}
	});
		
};
