
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  db = require('mongoskin').db('localhost:27017/friends');
  var view_options = app.set('view options'); // OMG, this is fuckingly badly designed...
  view_options.pretty = true;
  app.set('view options', view_options);
});

app.configure('production', function(){
  app.use(express.errorHandler());
  db = require('mongoskin').db(process.env.MONGOLAB_URI);
});

// Routes
app.get('/', routes.index);
app.get('/zob', routes.zob);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
