(function()
{
    var moduleName = 'models/friend',
        moduleDependencies = [];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function()
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var FriendModel = Backbone.Model.extend({

            idAttribute: '_id',

            urlRoot: '/api/friends',

            defaults: {
                extensions: [],
                fb_id: null,
                user_id: null,
                name: null,
                picture: null
            },

            add: function()
            {
                this.save();
            }

        });

        return FriendModel;
    });
})();