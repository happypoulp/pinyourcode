var index = function (req, res) {
  res.render(
    'index',
    {
      title : 'Express JS Demo',
      FB_APP_ID : '397068970352801',
      domain : '127.0.0.1:3000'
    }
  );
};

exports.load = function (app) {
  app.get('/', index);
  require('./auth')(app);
  require('./api').routes(app);
}
