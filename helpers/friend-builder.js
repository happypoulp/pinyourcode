var _ = require("underscore")._;
var ObjectID = require("mongodb").ObjectID;

function FriendBuilder(request)
{
    this.body = request.body;
    this.friend = {
        user_id: request.facebook.user_id,
        fb_id: request.body.fb_id,
        extensions: request.body.extensions
    };
}

FriendBuilder.prototype = {

    build : function (cb)
    {
        if ( this.fb_id )
        {
            if ( this.extensions )
            {
                _.each(this.extensions, function (extension)
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