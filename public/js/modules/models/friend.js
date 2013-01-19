define([
    'backbone'
], function(Backbone)
{
    var FriendModel = Backbone.Model.extend({
        url: '/friends',
        defaults: {
            extensions: [],
        },

        add: function()
        {
            this.save();
        }
    });

    return FriendModel;
});