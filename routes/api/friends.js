var api = require('./index'),
  friend_builder = require('./friend-builder');

module.exports = function (app) {

  db.collection('friends').ensureIndex({user_id : 1}, function (err, result) {
    if ( err ) {
      throw 'Initialization error : Could not create friend collection user_id index'
    }
  });

  db.collection('friends').ensureIndex({user_id : 1, fb_id : 1}, {unique : true}, function (err, result) {
    if ( err ) {
      throw 'Initialization error : Could not create friend collection {user_id, fb_id} unique index'
    }
  });

  app.get('/friends', api.check, function (req, res) {
    db.collection('friends').find(
      {
        user_id : req.facebook.user_id
      })
      .toArray(function (err, friends) {
        if ( err ) {
          res.json(err, 400);
        } else {
          res.json(friends);
        }
      });
  });

  app.post('/friends', api.check, function (req, res) {
    // Parse the request body
    friend_builder.build(req.facebook.user_id, req.body, function (err, friend) {
      if ( err ) {
        res.json(err, 400);
      } else {
        db.collection('friends').insert(friend, {safe : true}, function (err, result) {
          if ( err ) {
            res.json(err, 400);
          } else {
            res.json(result[0], 201);
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
          res.json(err, 400);
        } else {
          res.json(friend);
        }
      });
  });

  app.put('/friends/:fb_id', api.check, function (req, res) {
    // Parsing the request body
    friend_builder.build(req.facebook.user_id, req.body, function (err, friend) {
      if ( err ) {
        res.json(err, 400);
      } else {
        // Update only the extensions section
        db.collection('friends').update(
          {
            user_id : req.facebook.user_id,
            fb_id : req.params.fb_id
          },
          {
            $set : {extensions : friend.extensions}
          },
          {
            safe : true
          },
          function (err, result) {
            if ( err ) {
              res.json(err, 400);
            } else {
              // We retrieve the updated friend
              db.collection('friends').findOne(
                {
                  user_id : req.facebook.user_id,
                  fb_id : req.params.fb_id
                },
                function (err, friend) {
                  if ( err ) {
                    res.json(err, 400);
                  } else {
                    if( friend ) {
                      res.json(friend);
                    }
                  }
                })
            }
          });
      }
    });
  });

  app.delete('/friends/:fb_id', api.check, function (req, res) {
    // Delete the friend
    db.collection('friends').remove(
      {
        user_id : req.facebook.user_id,
        fb_id : req.params.fb_id
      },
      {
        safe : true
      },
      function (err, result) {
        if ( err ) {
          res.json(err, 400);
        } else {
          res.json("Deleted", 204);
        }
      });
  });

}


