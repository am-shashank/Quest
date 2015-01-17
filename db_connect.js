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