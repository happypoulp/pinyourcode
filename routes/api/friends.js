var api = require('./index'),
  friend_builder = require('./friend-builder');

module.exports = function (app) {

  app.get('/friends', api.check, function (req, res) {
    db.collection('friends').find(
      {
        user_id : req.facebook.user_id
      })
      .toArray(function (err, friends) {
        if ( err ) {
          res.json(err, 500);
        } else {
          res.json(friends);
        }
      });
  });

  app.post('/friends', api.check, function (req, res) {
    friend_builder.build(req.facebook.user_id, req.body, function (err, friend) {
      if ( err ) {
        res.json(err, 400);
      } else {
        db.collection('friends').insert(friend, function (err, friend) {
          if ( err ) {
            res.json(err, 500);
          } else {
            res.json(friend, 201);
          }
        });
      }
    });
  });

  app.get('/friends/:fb_id', api.check, function (req, res) {
    db.collection('friends').findOne(
      {
        user_id : req.facebook.user_id,
        fb_id : req.params.fb_id
      },
      function (err, friend) {
        if ( err ) {
          res.json(err, 500);
        } else {
          res.json(friend);
        }
      });
  });

  app.put('/friends/:fb_id', api.check, function (req, res) {
    throw "NotImplementedYet : Lazy developer"
  });

  app.delete('/friends/:fb_id', api.check, function (req, res) {
    db.collection('friends').remove(
      {
        user_id : req.facebook.user_id,
        fb_id : req.params.fb_id
      },
      function (err, result) {
        if ( err ) {
          res.json(err, 500);
        } else {
          res.json("Deleted", 204);
        }
      });
  });

}


