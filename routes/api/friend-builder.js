var _ = require("underscore")._;

function FriendBuilder(user_id, body)
{
    this.user_id = user_id;
    this.body = body;
    this.fb_id = body.fb_id;
    this.extensions = [];
}

FriendBuilder.prototype = {

    build : function (cb)
    {
        if ( this.fb_id )
        {
            if ( this.body.extensions )
            {
                _.each(this.body.extensions, function (extension)
                {
                    if ( extension.name && extension.type )
                    {
                        this.extensions.push(
                        {
                            name : extension.name,
                            type : extension.type,
                            content : extension.content
                        });
                    }
                  }
                ,this);
            }
    
            cb(
                null,
                {
                    user_id : this.user_id,
                    fb_id : this.fb_id,
                    extensions : this.extensions
                }
            );
        }
        else
        {
            cb('fb_id is mandatory', null);
        }
    }

}

exports.build = function (user_id, body, cb) 
{
    return new FriendBuilder(user_id, body).build(cb);
}