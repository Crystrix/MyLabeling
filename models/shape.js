var mongoose = require('./db');

function Shape(shape) {
	this.shapeName = shape.shapeName;
	this.shapePath = shape.shapePath;
	this.shapeFormat = shape.shapeFormat;
	this.shapeThumbPath = shape.shapeThumbPath;
};
var ShapeSchema = new mongoose.Schema({
	shapeName: String,
	shapePath: {type:String, unique: true},
	shapeFormat: String,
	shapeThumbPath: String,
	categoriesId: [{ 
	  type: mongoose.Schema.ObjectId, 
	  ref: 'Category' }],
	classificationsId: [{ 
	  type: mongoose.Schema.ObjectId, 
	  ref: 'Classification' }],
	usersId: [{
	  type: mongoose.Schema.ObjectId, 
	  ref: 'User' }],
	annotationsId: [{ 
	  type: mongoose.Schema.ObjectId, 
	  ref: 'Annotation' }]  
});

var ShapeModel = mongoose.model('Shape', ShapeSchema); 

module.exports = Shape;

//存入Mongodb的文档
//存入Mongodb的文档
Shape.prototype.save = function save(callback) {
	var shape = new ShapeModel({
		shapeName: this.shapeName,
		shapePath: this.shapePath,
		shapeFormat: this.shapeFormat,
		shapeThumbPath: this.shapeThumbPath
	});
	shape.save(function(err){callback(err, shape);});	
}


Shape.findByShapePath = function findByShapePath(shapePath, callback) {
	ShapeModel.findOne({shapePath:shapePath}, function(err, doc){
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

Shape.findByShapeId = function findByShapePath(shapeId, callback) {
	ShapeModel.find({_id:{$in:shapeId}}, function(err, doc){
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

Shape.create = function create(newShapes, callback) {
	ShapeModel.create(newShapes, function(err, docInfo, docInfo2) {});
}

Shape.findAllId = function (callback) {
	ShapeModel.find({}, '_id', function(err, doc){
		if (err) {
			return callback(err, null);
		}
		if (doc) {
			callback(err, doc);
		} else {
			callback(err, null);
		}
	});
}
