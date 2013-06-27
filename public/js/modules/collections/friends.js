(function()
{
    var moduleName = 'collections/friends';

    define([
            'models/friend'
        ], function(FriendModel)
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
