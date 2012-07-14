var api = require('./index');

module.exports = function (app) {

  app.get('/friends', api.check, function (req, res) {
    res.send('Ok');
  });

};


