var http = require('http'),
    express = require('express');
    user = require('./routes/user');
 
var app = express();
app.set('port', process.env.PORT || 3000); 
app.configure(function () {
	app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser());
}); 

app.post('/service/createUser',user.createUser)
app.get('/', user.refresh);
app.post('/addQuestion',user.addQuestion);
app.get('/updateFeed/:q_id',user.updateFeed);
app.get('/refresh',user.refresh);
app.get('/updatePollForQuestion', user.updatePollForQuestion);
 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
