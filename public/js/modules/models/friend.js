(function()
{
    var moduleName = 'models/friend',
        moduleDependencies = ['collections/extensions'];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(ExtensionsCollection)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var FriendModel = Backbone.Model.extend({

            idAttribute: '_id',

            urlRoot: '/api/friends',

            defaults: {
                extensions: null,
                fb_id: null,
                user_id: null,
                name: null,
                picture: null
            },

            parse: function(rawFriend)
            {
                rawFriend.extensions = new ExtensionsCollection(rawFriend.extensions, { friend: this });

                return rawFriend;
            },

            addExtension: function(extension)
            {
                this.get('extensions').add(extension);
            }

        });

        return FriendModel;
    });
})();