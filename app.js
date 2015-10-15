
/**
 * Module dependencies
 */

/*
// print process.argv
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});
*/

var API_server = "http://localhost";
var API_server_port = "9000";
if (process.argv.length>2){
	API_server = process.argv[2];
	API_Server_port = process.argv[3];
}

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  
  http = require('http'),
  mysql_route = require('./routes/mysql_route'),
  path = require('path'),
  hash = require('./public/js/hashtable.js');

var app = module.exports = express();

app.set('view options', { pretty: true });

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);


// JSON API
app.get('/api/name2', api.name2);
app.get('/api/guy', api.guy);

app.get('/mysql/model', mysql_route.model);

app.get('/api/server', 
		 function(req,res){
	res.json({host:API_server,port:API_server_port});
});
app.get('/patientTest', 
		 function(req,res){
	res.json({patientTest:{name:'Barack'}});
});

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
	console.log('[API_server] host: ' + API_server + ':'+API_server_port);
    console.log('Express server listening on port ' + app.get('port'));
});


//var model = mysql_route.model();
