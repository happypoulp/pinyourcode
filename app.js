
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , facebookSession = require('./middlewares/facebook-session.js') ;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(facebookSession.parseCookie({
      app_id: process.env.FACEBOOK_APP_ID || '397068970352801',
      secret: process.env.FACEBOOK_SECRET || '6971160015d5c88ecc9d64cbbc4f8844'
    })
  );
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.set('view options', { pretty: true });
  db = require('mongoskin').db('localhost:27017/friends');
});

app.configure('production', function(){
  app.use(express.errorHandler());
  db = require('mongoskin').db(process.env.MONGOLAB_URI);
});

// Routes
app.get('/', routes.index);
app.get('/auth', routes.auth);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
