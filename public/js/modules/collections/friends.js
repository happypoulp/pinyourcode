(function()
{
    var moduleDependencies = [
            'models/friend'
        ],
        moduleName = 'collections/friends';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(FriendModel)
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
