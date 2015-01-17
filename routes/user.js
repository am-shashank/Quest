var mongo = require('mongodb');
 
var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true}); 
db = new Db('quest', server);

db.open(function(err, db) {
	if(!err) {
		console.log("Connected to 'quest' database");
		db.collection('questions', {strict:true}, function(err, collection) {
			if (err) {
				console.log("The 'quest' collection doesn't exist. Creating it with sample data...");
				populateDB();
			}
		});
	}
}); 

exports.findById = function(req, res) {
	var id = req.params.id;
	console.log('Retrieving Question: ' + id);
	db.collection('questions', function(err, collection) {
		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
		res.send(item);
		});
	});
}; 

//TO-DO: implement find10

exports.findAll = function(req, res) {
	db.collection('questions', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
			});
	});
}; 


exports.addQuestion = function(req, res) {
	console.log(req.body)
	var question = req.body;
	console.log('Adding question: ' + JSON.stringify(question));
	db.collection('questions', function(err, collection) {
		collection.insert(question, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
} 


/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
	var questions = [
	{
		"question" : "Are you horny?",
		"owner_id" : "Ameya",
		"answer_flag" : "Boolean",
		"answer" : "Hell yeah...!!"
	},
	{
		"question" : "Do you want to poop?",
		"owner_id" : "Ashmeet",
		"answer_flag" : "Boolean",
		"answer" : "Haan be...!!"
	}];
	 
	db.collection('questions', function(err, collection) {
		collection.insert(questions, {safe:true}, function(err, result) {});
	});
 
}; 