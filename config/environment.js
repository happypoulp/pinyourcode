module.exports = function(app)
{
    var express = require('express'),
      rootPath = __dirname + '/..';

    // Configuration
    app.configure(function()
    {
      app.set('views', rootPath + '/views');
      app.set('view engine', 'jade');
      app.set('view options', { layout: false });

      app.use(express.bodyParser());
      app.use(express.cookieParser());
      app.use(express.methodOverride());
      app.use(
        require(rootPath + '/middlewares/facebook-session.js').getMiddleware(
        {
          app_id: process.env.FACEBOOK_APP_ID || '397068970352801',
          secret: process.env.FACEBOOK_SECRET || '6971160015d5c88ecc9d64cbbc4f8844'
        })
      );
      app.use(app.router);
      app.use(express.static(rootPath + '/public'));
    });

    app.configure('development', function()
    {
      app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
      var view_options = app.set('view options'); // OMG, this is fuckingly badly designed...
      view_options.pretty = true;
      app.set('view options', view_options);
    });

    app.configure('production', function()
    {
      app.use(express.errorHandler());
    });
};