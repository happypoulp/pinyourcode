(function()
{
    var moduleDependencies = [],
        moduleName = 'models/friend';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define([
        'backbone'
    ], function(Backbone)
    {
        log(moduleName, "Dependencies loaded", "Build module");

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
})();