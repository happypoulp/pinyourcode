var db
  , ObjectID = require("mongodb").ObjectID;

function createDb(app)
{
  if (app.locals.env == 'development')
  {
    db = require('mongoskin').db('localhost:27017/friends', {safe: true});
  }
  else
  {
    db = require('mongoskin').db(process.env.MONGOLAB_URI);
  }
}

function ensureIndex()
{
  db.collection('friends').ensureIndex({user_id : 1}, function (err, result)
  {
    if ( err ) throw 'Initialization error : Could not create friend collection user_id index';
  });

  db.collection('friends').ensureIndex({user_id : 1, fb_id : 1}, {unique : true}, function (err, result)
  {
    if ( err ) throw 'Initialization error : Could not create friend collection {user_id, fb_id} unique index';
  });
}

function buildShortcuts()
{
  db.bind('friends',
  {
    getById : function (user_id, friend_id, cb)
    {
      this.findOne(
        {
          user_id : user_id,
          _id : new ObjectID(friend_id)
        },
        function (err, friend)
        {
          cb(err, friend);
        }
      );
    },
    getByFBId : function (user_id, fb_id, cb)
    {
      this.findOne(
        {
          user_id : user_id,
          fb_id : fb_id
        },
        function (err, friend)
        {
          cb(err, friend);
        }
      );
    }
  });
}

module.exports = function(app)
{
  createDb(app);
  ensureIndex();
  buildShortcuts();

  module.exports = db;
};