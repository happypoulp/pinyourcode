define([
    'backbone'
], function(Backbone)
{
    var ExtensionModel = Backbone.Model.extend({

        urlRoot: function()
        {
            return '/api/friends/' + this.get('userId') + '/extensions';
        },

        defaults: {
            name: '',
            type: '',
            content: ''
        }
    });

    return ExtensionModel;
});