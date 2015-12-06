var mongoose = require('./db');

function Annotation(annotation) {
	this.shapeId = annotation.shapeId;
	this.categoryId = annotation.categoryId;
	this.classificationId = annotation.classificationId;
};

var AnnotationSchema = new mongoose.Schema({
	createTime: {type: Date, default: Date.now},
	shapeId: { 
	  type: mongoose.Schema.ObjectId, 
	  ref: 'Shape' },
	categoryId: { 
	  type: mongoose.Schema.ObjectId, 
	  ref: 'Category' },
	classificationId: { 
	  type: mongoose.Schema.ObjectId, 
	  ref: 'Classification' }
});

var AnnotationModel = mongoose.model('Annotation', AnnotationSchema); 

module.exports = Annotation;

//存入Mongodb的文档
Annotation.prototype.save = function save(callback) {
	var annotation = new AnnotationModel({
		shapeId: this.shapeId,
		categoryId: this.categoryId,
		classificationId: this.classificationId
	});
	annotation.save(function(err){callback(err, annotation);});	
}

Annotation.getClassificationAnnotation = function get(classificationId, shapeId, callback) {
	AnnotationModel.find({classificationId:classificationId, shapeId:{$in:shapeId}}, function(err, doc){
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



