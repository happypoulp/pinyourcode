var api = require('./index'),
    friend_builder = require('./friend-builder'),
    ObjectID = require("mongodb").ObjectID;

module.exports = function (app)
{

    db.collection('friends').ensureIndex({user_id : 1}, function (err, result)
    {
        if ( err )
        {
            throw 'Initialization error : Could not create friend collection user_id index'
        }
    });

    db.collection('friends').ensureIndex({user_id : 1, fb_id : 1}, {unique : true}, function (err, result)
    {
        if ( err )
        {
            throw 'Initialization error : Could not create friend collection {user_id, fb_id} unique index'
        }
    });
  
    db.bind('friends',
    {
        get : function (user_id, fb_id, cb)
        {
            this.findOne(
                {
                    user_id : user_id,
                    fb_id : fb_id
                },
                function (err, friend)
                {
                    cb(err, friend);
                });
        }
    });

    /////////////////////////////////////////////
    // GET FRIENDS LIST
    /////////////////////////////////////////////
    app.get('/friends', api.check, function (req, res)
    {
        db.collection('friends').find(
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
    });
  
    /////////////////////////////////////////////
    // ADD A FRIEND
    /////////////////////////////////////////////
    app.post('/friends', api.check, function (req, res)
    {
        // Parse the request body
        friend_builder.build(req.facebook.user_id, req.body, function (err, friend)
        {
            if ( err )
            {
            // Parsing error must be donne first, don't need to hit the db
            res.json(err, 400);
            }
            else
            {
                // Hitting the db to known if the friend already exists
                db.collection('friends').get(req.facebook.user_id, friend.fb_id, function (err, dbFriend)
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
                });
            }
        });
    });

    /////////////////////////////////////////////
    // GET A FRIEND
    /////////////////////////////////////////////
    app.get('/friends/:fb_id', api.check, function (req, res)
    {
        db.collection('friends').get(req.facebook.user_id, req.params.fb_id, function (err, friend)
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
        });
    });

    /////////////////////////////////////////////
    // MODIFY A FRIEND
    /////////////////////////////////////////////
    app.put('/friends/:fb_id', api.check, function (req, res)
    {
        if (!req.body.fb_id) req.body.fb_id = req.params.fb_id;
        // Parsing the request body
        friend_builder.build(req.facebook.user_id, req.body, function (err, friend)
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
                    db.collection('friends').get(req.facebook.user_id, req.params.fb_id, function (err, dbFriend)
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
        });
    });

    /////////////////////////////////////////////
    // DELETE A FRIEND
    /////////////////////////////////////////////
    app.delete('/friends/:fb_id', api.check, function (req, res)
    {
        db.collection('friends').get(req.facebook.user_id, req.params.fb_id, function (err, dbFriend)
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
    });

    /*****************************************************************************************************************
     ******************************************** EXTENSIONS API *****************************************************
     *****************************************************************************************************************/

    /////////////////////////////////////////////
    // GET EXTENSIONS LIST
    /////////////////////////////////////////////
    app.get('/friends/:fb_id/extensions', api.check, function (req, res)
    {
        db.collection('friends').get(req.facebook.user_id, req.params.fb_id, function (err, friend)
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
    });

    /////////////////////////////////////////////
    // GET ONE EXTENSION
    /////////////////////////////////////////////
    app.get('/friends/:fb_id/extensions/:extension_id', api.check, function (req, res)
    {
        db.collection('friends').get(req.facebook.user_id, req.params.fb_id, function (err, friend)
        {
            if ( err )
            {
                res.send(err, 500);
            }
            else
            {
                if ( friend )
                {
                    var extension = null;

                    if (friend.extensions && friend.extensions.length)
                    {
                        for (var i = 0, l = friend.extensions.length ; i < l ; i++)
                        {
                            if (friend.extensions[i] && friend.extensions[i]._id == req.params.extension_id)
                            {
                                extension = friend.extensions[i];
                                break;
                            }
                        }
                    }

                    if (extension)
                    {
                        res.json(extension);
                    }
                    else
                    {
                        res.json('No extension found with this id', 404);
                    }
                }
                else
                {
                    res.json('No document found with this fb_id', 404);
                }
            }
        });
    });

    /////////////////////////////////////////////
    // ADD AN EXTENSION
    /////////////////////////////////////////////
    app.post('/friends/:fb_id/extensions', api.check, function (req, res)
    {
        if (!req.body.fb_id) req.body.fb_id = req.params.fb_id;
        // Parsing the request body
        friend_builder.build(req.facebook.user_id, req.body, function (err, friend)
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
                    db.collection('friends').get(req.facebook.user_id, req.params.fb_id, function (err, dbFriend)
                    {
                        if ( err )
                        {
                            res.send(err, 500);
                        }
                        else
                        {
                            if ( dbFriend )
                            {
                                console.log(friend.extension);
                                // Update only the extensions section
                                db.collection('friends').update(
                                {
                                    user_id : req.facebook.user_id,
                                    fb_id : dbFriend.fb_id
                                },
                                {
                                    '$push' : {extensions : friend.extension}
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
        });
    });

    /////////////////////////////////////////////
    // MODIFY AN EXTENSION
    /////////////////////////////////////////////
    app.put('/friends/:fb_id/extensions/:extension_id', api.check, function (req, res)
    {
        // if (!req.body.fb_id) req.body.fb_id = req.params.fb_id;
        // // Parsing the request body
        // friend_builder.build(req.facebook.user_id, req.body, function (err, friend)
        // {
        //     if ( err )
        //     {
        //         // Parsing error must be donne first, don't need to hit the db
        //         res.json(err, 400);
        //     }
        //     else
        //     {
        //         // Checking cohesion between document and url
        //         if ( req.params.fb_id === friend.fb_id )
        //         {
        //             db.collection('friends').get(req.facebook.user_id, req.params.fb_id, function (err, dbFriend)
        //             {
        //                 if ( err )
        //                 {
        //                     res.send(err, 500);
        //                 }
        //                 else
        //                 {
        //                     if ( dbFriend )
        //                     {
        //                         console.log(friend.extension);
        //                         // Update only the extensions section
        //                         db.collection('friends').update(
        //                         {
        //                             user_id : req.facebook.user_id,
        //                             fb_id : dbFriend.fb_id
        //                         },
        //                         {
        //                             '$push' : {extensions : friend.extension}
        //                             // $set : {extensions : friend.extensions}
        //                         },
        //                         function (err, result)
        //                         {
        //                             if ( err )
        //                             {
        //                                 res.json(err, 400);
        //                             }
        //                             else
        //                             {
        //                                 // Update dbFriend extensions and send it (manual merging)
        //                                 dbFriend.extensions = friend.extensions;
        //                                 res.json(dbFriend);
        //                             }
        //                         });
        //                     }
        //                     else
        //                     {
        //                         res.json('No document found with this fb_id', 404);
        //                     }
        //                 }
        //             });
        //         }
        //         else
        //         {
        //             res.json("The document's fb_id doesn't match the requested url", 400);
        //         }
        //     }
        // });
    });

    /////////////////////////////////////////////
    // DELETE A FRIEND
    /////////////////////////////////////////////
    app.delete('/friends/:fb_id/extensions/:extension_id', api.check, function (req, res)
    {
        db.collection('friends').get(req.facebook.user_id, req.params.fb_id, function (err, dbFriend)
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
    });
}


