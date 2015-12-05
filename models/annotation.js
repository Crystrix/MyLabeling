var mongoose = require('./db');

function Annotation(annotation) {
	this.shapeId = annotation.shapeId;
	this.categoryId = annotation.categoryId;
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
		categoryId: this.categoryId
	});
	annotation.save(function(err){callback(err, annotation);});	
}

