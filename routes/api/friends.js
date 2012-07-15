var api = require('./index'),
  friend_builder = require('./friend-builder');

function getFriend(fb_id, req, res, cb) {
  db.collection('friends').findOne(
    {
      user_id : req.facebook.user_id,
      fb_id : fb_id
    },
    function (err, friend) {
      if ( err ) {
        res.json(err, 500);
      } else {
        cb(req, res, friend);
      }
    });
}

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
          res.json(err, 500);
        } else {
          res.json(friends);
        }
      });
  });

  app.post('/friends', api.check, function (req, res) {
    // Parse the request body
    friend_builder.build(req.facebook.user_id, req.body, function (err, friend) {
      if ( err ) {
        // Parsing error must be donne first, don't need to hit the db
        res.json(err, 400);
      } else {
        // Hitting the db to known if the friend already exists
        getFriend(friend.fb_id, req, res, function (req, res, dbFriend) {
          if ( dbFriend ) {
            res.json('A document with this fb_id already exists for this user', 400);
          } else {
            db.collection('friends').insert(friend, function (err, result) {
              if ( err ) {
                res.json(err, 500);
              } else {
                res.json(result[0], 201);
              }
            });
          }
        });
      }
    });
  });

  app.get('/friends/:fb_id', api.check, function (req, res) {
    getFriend(req.params.fb_id, req, res, function (req, res, friend) {
      if ( friend ) {
        res.json(friend);
      } else {
        res.json('No document found with this fb_id', 404);
      }
    });
  });

  app.put('/friends/:fb_id', api.check, function (req, res) {
    // Parsing the request body
    friend_builder.build(req.facebook.user_id, req.body, function (err, friend) {
      if ( err ) {
        // Parsing error must be donne first, don't need to hit the db
        res.json(err, 400);
      } else {
        // Checking cohesion between document and url
        if ( req.params.fb_id === friend.fb_id ) {
          getFriend(req.params.fb_id, req, res, function (req, res, dbFriend) {
            if ( dbFriend ) {
              // Update only the extensions section
              db.collection('friends').update(
                {
                  user_id : req.facebook.user_id,
                  fb_id : dbFriend.fb_id
                },
                {
                  $set : {extensions : friend.extensions}
                },
                function (err, result) {
                  if ( err ) {
                    res.json(err, 400);
                  } else {
                    // Update dbFriend extensions and send it (manual merging)
                    dbFriend.extensions = friend.extensions;
                    res.json(dbFriend);
                  }
                });
            } else {
              res.json('No document found with this fb_id', 404);
            }
          });
        } else {
          res.json("The document's fb_id doesn't match the requested url", 400);
        }
      }
    });
  });

  app.delete('/friends/:fb_id', api.check, function (req, res) {
    getFriend(req.params.fb_id, req, res, function (req, res, dbFriend) {
      if ( dbFriend ) {
        // Delete the friend
        db.collection('friends').remove(
          {
            user_id : req.facebook.user_id,
            fb_id : dbFriend.fb_id
          },
          function (err, result) {
            if ( err ) {
              res.json(err, 500);
            } else {
              res.json("Deleted", 204);
            }
          });
      } else {
        res.json('No document found with this fb_id', 404);
      }
    });
  });

}


