var _ = require("underscore")._,
    ObjectID = require("mongodb").ObjectID;

function FriendBuilder(request)
{
    this.body = request.body;

    this.friend = {
        user_id: request.facebook.user_id,
        fb_id: request.body.fb_id,
        name: request.body.name,
        picture: request.body.picture,
        extensions: request.body.extensions
    };
}

FriendBuilder.prototype = {

    build : function (cb)
    {
        if ( this.friend.fb_id )
        {
            if ( this.friend.extensions )
            {
                _.each(this.friend.extensions, function (extension)
                {
                    if (!extension._id)
                    {
                        extension._id = new ObjectID();
                    }
                }
                ,this);
            }
    
            cb(null, this.friend);
        }
        else
        {
            cb('fb_id is mandatory', null);
        }
    }

}

exports.build = function (request, cb) 
{
    return new FriendBuilder(request).build(cb);
}