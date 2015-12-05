var mongoose = require('./db');

function Category(category) {
	this.categoryName = category.categoryName;
	this.classificationId = category.classificationId;
};

var CategorySchema = new mongoose.Schema({
	categoryName: String,
	createTime: {type: Date, default: Date.now},
	classificationId: { 
	  type: mongoose.Schema.ObjectId, 
	  ref: 'Classification' },
	shapesId: [{ 
	  type: mongoose.Schema.ObjectId, 
	  ref: 'Shape' }],
	annotationsId: [{ 
	  type: mongoose.Schema.ObjectId, 
	  ref: 'Annotation' }]  
});

var CategoryModel = mongoose.model('Category', CategorySchema); 

module.exports = Category;

//存入Mongodb的文档
Category.prototype.save = function save(callback) {
	var category = new CategoryModel({
		categoryName: this.categoryName,
		classificationId: this.classificationId,
	});
	category.save(function(err){callback(err, category);});	
}

Category.findByCategoryId = function get(categoryId, callback) {
	ClassificationModel.find({categoryId:categoryId}, function(err, doc){
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

Category.getAllByClassificationId = function get(classificationId, callback) {
	CategoryModel.find({classificationId:classificationId}, function(err, doc){
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
