var api = require('./index');

module.exports = function (app) {

  app.get('/friends', api.check, function (req, res) {
    // TODO add restriction on the current user
    db.collection('friends').find().toArray(function (err, friends) {
      if ( err ) {
        res.json(err, 500);
      } else {
        res.json(friends);
      }
    });
  });

  app.get('/friends/:id', api.check, function (req, res) {
    // TODO add restriction on the current user
    db.collection('friends').findOne({_id : db.ObjectID.createFromHexString(req.params.id)}, function (err, friend) {
      if ( err ) {
        res.json(err, 500);
      } else {
        res.json(friend);
      }
    });
  });

}


