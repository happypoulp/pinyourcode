var index = function (req, res) {
  res.render(
    'index',
    {
      title : 'I & Co' ,
      FB_APP_ID : '397068970352801',
      FB_APP_DOMAIN : 'localhost:3000'
    }
  );
};

exports.load = function (app) {
  app.get('/', index);
  require('./auth')(app);
  require('./api').routes(app);
}
