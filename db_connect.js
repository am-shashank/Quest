exports.getmyDB = function () {
	var mongo = require('mongodb');
	var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;
	 
	var server = new Server('localhost', 27017, {auto_reconnect: true}); 
	db = new Db('quest', server);

	db.open(function(err, db) {
		if(!err) {
			console.log("Connected to 'quest' database");
			/*db.collection('questions', {strict:true}, function(err, collection) {
				if (err) {
					console.log("The 'quest' collection doesn't exist. Creating it with sample data...");
					populateDB();
				}
			});*/
		}
	}); 
	return db;
}

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
