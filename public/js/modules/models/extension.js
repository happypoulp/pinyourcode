define([
    'backbone'
], function(Backbone)
{
    var ExtensionModel = Backbone.Model.extend({

        initialize: function(options)
        {
            this.friend_id = options.friend_id;
        },

        urlRoot: function()
        {
            return '/api/friends/' + this.friend_id + '/extensions';
        },

        defaults: {
            name: '',
            type: '',
            content: ''
        }
    });

    return ExtensionModel;
});