// api Controller

var db = require('../config/db.js')
  , friend_builder = require('../helpers/friend-builder')
  , extension_builder = require('../helpers/extension-builder')
  , ObjectID = require("mongodb").ObjectID;

function ApiController() { }
ApiController.prototype =
{
  friend_list: function(req, res)
  {
    db
      .friends
      .find(
      {
        user_id : req.facebook.user_id
      })
      .toArray(function (err, friends)
      {
        if ( err )
        {
          res.json(err, 500);
        }
        else
        {
          res.json(friends);
        }
      });
  },
  friend_show: function(req, res)
  {
    db
      .friends
      .get(req.facebook.user_id, req.params.fb_id, function (err, friend)
      {
          if ( err )
          {
            res.send(err, 500);
          }
          else
          {
            if ( friend )
            {
              res.json(friend);
            }
            else
            {
              res.json('No document found with this fb_id', 404);
            }
          }
      }
    );
  },
  extension_list: function(req, res)
  {
    db
      .friends
      .get(req.facebook.user_id, req.params.fb_id, function (err, friend)
    {
      if ( err )
      {
        res.send(err, 500);
      }
      else
      {
        if ( friend )
        {
          res.json(friend.extensions);
        }
        else
        {
          res.json('No document found with this fb_id', 404);
        }
      }
    });
  },
  extension_show: function(req, res)
  {
    db
      .friends
      .find
      (
        {
          user_id : req.facebook.user_id,
          fb_id : req.params.fb_id
        },
        {
          _id: 0,
          extensions: {$elemMatch: {_id: ObjectID.createFromHexString(req.params.extension_id)}}
        }
      )
      .toArray
      (
        function(err, results)
        {
          if ( err )
          {
            res.send(err, 500);
          }
          else
          {
            if (results && results.length && results[0].extensions)
            {
              res.json(results[0].extensions[0], 200);
            }
            else
            {
              res.json('No document found with this fb_id / extension_id', 404);
            }
          }
        }
      );
  },
  friend_create: function(req, res)
  {
    // Parse the request body
    friend_builder.build(req, function (err, friend)
    {
      if ( err )
      {
        // Parsing error must be donne first, don't need to hit the db
        res.json(err, 400);
      }
      else
      {
        // Hitting the db to known if the friend already exists
        db
          .friends
          .get(req.facebook.user_id, friend.fb_id, function (err, dbFriend)
          {
            if ( err )
            {
              res.json(err, 500);
            }
            else
            {
              if ( dbFriend )
              {
                res.json('A document with this fb_id already exists for this user', 400);
              }
              else
              {
                db.collection('friends').insert(friend, function (err, result)
                {
                  if ( err )
                  {
                    res.json(err, 500);
                  }
                  else
                  {
                    res.json(result[0], 201);
                  }
                });
              }
            }
          }
        );
      }
    });
  },
  extension_create: function(req, res)
  {
    // Parsing the request body
    extension_builder.build(req, function (err, extension)
    {
      if ( err )
      {
        // Parsing error must be done first, don't need to hit the db
        res.json(err, 400);
      }
      else
      {
        db
          .friends
          .get(req.facebook.user_id, req.params.fb_id, function (err, dbFriend)
          {
            if ( err )
            {
              res.send(err, 500);
            }
            else
            {
              if ( dbFriend )
              {
                // Update only the extensions section
                db.collection('friends').update(
                {
                  user_id : req.facebook.user_id,
                  fb_id : dbFriend.fb_id
                },
                {
                  '$push' : {extensions : extension}
                },
                function (err, result)
                {
                  if ( err )
                  {
                    res.json(err, 400);
                  }
                  else
                  {
                    // Update dbFriend extensions and send it (manual merging)
                    dbFriend.extensions.push(extension);
                    res.json(dbFriend);
                  }
                });
              }
              else
              {
                res.json('No document found with this fb_id', 404);
              }
            }
          });
      }
    });
  },
  friend_update: function(req, res)
  {
    if (!req.body.fb_id) req.body.fb_id = req.params.fb_id;

    // Parsing the request body
    friend_builder.build(
      req, 
      function (err, friend)
      {
        if ( err )
        {
          // Parsing error must be donne first, don't need to hit the db
          res.json(err, 400);
        }
        else
        {
          // Checking cohesion between document and url
          if ( req.params.fb_id === friend.fb_id )
          {
            db
              .friends
              .get(req.facebook.user_id, req.params.fb_id, function (err, dbFriend)
              {
                if ( err )
                {
                  res.send(err, 500);
                }
                else
                {
                  if ( dbFriend )
                  {
                    // Update only the extensions section
                    db.collection('friends').update(
                    {
                      user_id : req.facebook.user_id,
                      fb_id : dbFriend.fb_id
                    },
                    {
                      '$push' : {extensions : friend.extensions[0]}
                      // $set : {extensions : friend.extensions}
                    },
                    function (err, result)
                    {
                      if ( err )
                      {
                        res.json(err, 400);
                      }
                      else
                      {
                        // Update dbFriend extensions and send it (manual merging)
                        dbFriend.extensions = friend.extensions;
                        res.json(dbFriend);
                      }
                    });
                  }
                  else
                  {
                    res.json('No document found with this fb_id', 404);
                  }
                }
              });
          }
          else
          {
            res.json("The document's fb_id doesn't match the requested url", 400);
          }
        }
      }
    );
  },
  extension_update: function(req, res)
  {
    if (!req.body.fb_id) req.body.fb_id = req.params.fb_id;

    // Parsing the request body
    extension_builder.build(req, function (err, friend)
    {
      if ( err )
      {
        // Parsing error must be done first, don't need to hit the db
        res.json(err, 400);
      }
      else
      {
        // Checking cohesion between document and url
        if ( req.params.fb_id === friend.fb_id )
        {
          db
            .friends
            .get(req.facebook.user_id, req.params.fb_id, function (err, dbFriend)
            {
              if ( err )
              {
                res.send(err, 500);
              }
              else
              {
                if ( dbFriend )
                {
                  friend.extension._id = ObjectID.createFromHexString(req.params.extension_id);
                  db
                    .collection('friends')
                    .update(
                    {
                      user_id : req.facebook.user_id,
                      fb_id : dbFriend.fb_id,
                      'extensions._id': ObjectID.createFromHexString(req.params.extension_id)
                    },
                    {
                      '$set' : {'extensions.$' : friend.extension}
                    },
                    function (err, result)
                    {
                      if ( err )
                      {
                        res.json(err, 400);
                      }
                      else
                      {
                        res.json(friend.extension, 200);
                      }
                    });
                }
                else
                {
                  res.json('No document found with this fb_id', 404);
                }
              }
            });
        }
        else
        {
          res.json("The document's fb_id doesn't match the requested url", 400);
        }
      }
    });
  },
  friend_delete: function(req, res)
  {
    db
      .friends
      .get(req.facebook.user_id, req.params.fb_id, function (err, dbFriend)
      {
        if ( err )
        {
          res.send(err, 500);
        }
        else
        {
          if ( dbFriend )
          {
            // Delete the friend
            db.collection('friends').remove(
            {
              user_id : req.facebook.user_id,
              fb_id : dbFriend.fb_id
            },
            function (err, result)
            {
              if ( err )
              {
                res.json(err, 500);
              }
              else
              {
                res.json("Deleted", 204);
              }
            });
          }
          else
          {
            res.json('No document found with this fb_id', 404);
          }
        }
      });
  },
  extension_delete: function(req, res)
  {
    db
      .friends
      .get(req.facebook.user_id, req.params.fb_id, function (err, dbFriend)
      {
        if ( err )
        {
          res.send(err, 500);
        }
        else
        {
          if ( dbFriend )
          {
            // Delete the extension
            db.collection('friends').update(
            {
              user_id : req.facebook.user_id,
              fb_id : dbFriend.fb_id
            },
            {
              '$pull' : {extensions : {_id: ObjectID.createFromHexString(req.params.extension_id)}}
            },
            function (err, result)
            {
              if ( err )
              {
                res.json(err, 400);
              }
              else
              {
                // Update dbFriend extensions and send it (manual merging)
                // dbFriend.extensions = friend.extensions;
                res.json(dbFriend);
              }
            });
          }
          else
          {
            res.json('No document found with this fb_id', 404);
          }
        }
      });
  }
};

exports.class = ApiController;
exports.setup = function(app, routes)
{
  app.all('/friends/?*', require('../middlewares/facebook-session.js').check);
};