var http = require('http'),
    express = require('express');
    user = require('./routes/user');
 
var app = express();
app.set('port', process.env.PORT || 3000); 
app.configure(function () {
	app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser());
}); 
 
app.get('/', user.findAll);
app.post('/addQuestion',user.addQuestion);

 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});