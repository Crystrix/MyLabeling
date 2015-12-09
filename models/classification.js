var mongoose = require('./db');

function Classification(classification) {
	this.classificationName = classification.classificationName;
	this.userId = classification.userId;
	this.shapesId = classification.shapesId;
};

var ClassificationSchema = new mongoose.Schema({
	classificationName: String,
	classificationDescription: String,
	createTime: {type: Date, default: Date.now},
	userId: { 
	  type: mongoose.Schema.ObjectId, 
	  ref: 'User' },
	categoriesId: [{ 
	  type: mongoose.Schema.ObjectId, 
	  ref: 'Category' }],
	shapesId: [{ 
	  type: mongoose.Schema.ObjectId, 
	  ref: 'Shape' }],
	annotationsId: [{ 
	  type: mongoose.Schema.ObjectId, 
	  ref: 'Annotation' }]  
});

var ClassificationModel = mongoose.model('Classification', ClassificationSchema); 

module.exports = Classification;

//存入Mongodb的文档
Classification.prototype.save = function save(callback) {
	var classification = new ClassificationModel({
		classificationName: this.classificationName,
		classificationDescription: this.classificationDescription,
		userId: this.userId,
		shapesId: this.shapesId
	});
	classification.save(function(err){callback(err, classification);});	
}

Classification.findByUserId = function get(userId, callback) {
	ClassificationModel.find({userId:userId}, function(err, doc){
		if (err) {
			return callback(err, null);
		}
		if (doc) {
			callback(err, doc);
		} else {
			callback(err, null);
		}
	});	
};

Classification.getShapeListById = function get(classificationId, callback) {
	ClassificationModel.find({_id:classificationId}, 'shapesId', function(err, doc){
		if (err) {
			return callback(err, null);
		}
		if (doc) {
			callback(err, doc);
		} else {
			callback(err, null);
		}
	});	
};

