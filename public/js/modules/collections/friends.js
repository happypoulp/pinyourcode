(function()
{
    var moduleDependencies = [
            'jquery', 
            'backbone',
            'models/friend'
        ],
        moduleName = 'collections/friends';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function($, Backbone, FriendModel)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var FriendsCollection = Backbone.Collection.extend(
        {
            model: FriendModel,
            url: '/api/friends'
        });

        return FriendsCollection;
    });
})();
