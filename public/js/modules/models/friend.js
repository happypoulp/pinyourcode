define([
    'backbone'
], function(Backbone)
{
    var FriendModel = Backbone.Model.extend({

        urlRoot: '/api/friends',

        defaults: {
            extensions: [],
            fb_id: null,
            user_id: null
        },

        add: function()
        {
            this.save();
        }
    });

    return FriendModel;
});