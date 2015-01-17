var ObjectID = require('mongodb').ObjectID;
CollectionDriver = function(db) {
  this.db = db;
};
CollectionDriver.prototype.getCollection = function(collectionName, callback) {
  this.db.collection(collectionName, function(error, the_collection) {
    if( error ) callback(error);
    else callback(null, the_collection);
  });
};