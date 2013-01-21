var _ = require("underscore")._;
var ObjectID = require("mongodb").ObjectID;

function ExtensionBuilder(request)
{
    this.body = request.body;
    this.extension = {
        name: request.body.name,
        type: request.body.type,
        content: request.body.content
    };
}

ExtensionBuilder.prototype = {

    build : function (cb)
    {
        if (!this.extension._id)
        {
            this.extension._id = new ObjectID();
        }

        cb(null, this.extension);
    }

}

exports.build = function (request, cb) 
{
    return new ExtensionBuilder(request).build(cb);
}