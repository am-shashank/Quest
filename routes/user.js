var db_connect = require('./../db_connect');
var db = db_connect.getmyDB();
var ObjectID = require('mongodb').ObjectID;

exports.findById = function(req, res) {
	var id = req.params.id;
	console.log('Retrieving Question: ' + id);
	db.collection('questions', function(err, collection) {
		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
		res.send(item);
		});
	});
}; 

//get the top 10 questions when the user refreshes
exports.refresh = function(req,res) {
	db.collection('questions',function(err, collection) {
		sort = {'_id': -1};
		collection.find().sort(sort).limit(10).toArray(function(err, items) {
			res.send(items);
		});
	});
};

//update the feed with 10 questions earlier than the specified id
exports.updateFeed = function(req,res) {
	var id = ObjectID(req.params.q_id);
	db.collection('questions', function(err, collection) {
		collection.find( {"_id":{$lt:id}}).sort({'_id':-1}).limit(10).toArray(function(err, items) {
		//collection.find().sort({'id':-1}).toArray(function(err, items) {
			res.send(items);
		});
	});
};

//get all the questions from the database
exports.findAll = function(req, res) {
	db.collection('questions', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
			});
	});
}; 

//insert question
exports.addQuestion = function(req, res) {
	console.log(req.body);
	var question = req.body;
	console.log('Adding question: ' + JSON.stringify(question));
	db.collection('questions', function(err, collection) {
		collection.insert(question, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send("Success");
			}
		});
	});
} 

exports.createUser = function(req,res) {
	console.log(req.body);
	var user_info = req.body;
	console.log('Adding info: ' + JSON.stringify(user_info));
	db.collection('users', function(err,collection) {
		collection.insert(user_info , {safe:true}, function(err,result) {
			if(err)
				res.send({'error':'An error has occurred'});
			else {
				console.log('Success: '+ JSON.stringify(result[0]));
				re.send("Success");
			}
			});
		});
	}
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.