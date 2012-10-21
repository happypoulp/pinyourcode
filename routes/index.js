var routes =
{
  '/': function (req, res)
  {
    res.render(
      'index',
      {
        title : 'I & Co' ,
        FB_APP_ID : '397068970352801',
        FB_APP_DOMAIN : 'localhost:3000'
      }
    );
  },

  '/test': function (req, res)
  {
    res.render(
      'test',
      {
        title : 'I & Co' ,
        FB_APP_ID : '397068970352801',
        FB_APP_DOMAIN : 'localhost:3000'
      }
    );
  }
}

exports.load = function (app)
{
  for (route in routes)
  {
    app.get(route, routes[route]);
  }

  require('./auth')(app);
  require('./api').routes(app);
}
