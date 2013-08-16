module.exports = function(app)
{
    var express = require('express'),
      rootPath = __dirname + '/..',
      toobusy = require('toobusy');

    // Configuration
    app.configure(function()
    {
      app.use(express.compress());
      app.set('views', rootPath + '/views');
      app.set('view engine', 'jade');
      app.set('view options', { layout: false });

      app.use(function(req, res, next)
      {
        if (toobusy()) res.send(503, "I'm busy right now, sorry.");
        else next();
      });
      app.use(express.bodyParser());
      app.use(express.cookieParser());
      app.use(express.methodOverride());
      app.use(
        require(rootPath + '/middlewares/facebook-session.js').getMiddleware(
        {
          app_id: process.env.FACEBOOK_APP_ID,
          secret: process.env.FACEBOOK_SECRET
        })
      );
      app.use(app.router);
    });

    app.configure('development', function()
    {
      app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
      var view_options = app.set('view options'); // OMG, this is fuckingly badly designed...
      view_options.pretty = true;
      app.set('view options', view_options);
      app.use(express.static(rootPath + '/public'));
    });

    app.configure('production', function()
    {
      app.use(express.errorHandler());
      var threeYears = 3600*24*365*3*1000;
      app.use(express.static(rootPath + '/public', { maxAge: threeYears }));
    });
};