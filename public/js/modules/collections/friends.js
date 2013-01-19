define([
    'jquery', 
    'backbone',
    'models/friend'
], function($, Backbone, FriendModel)
{
    var FriendsCollection = Backbone.Collection.extend(
    {
        model: FriendModel,
        url: '/friends'
    });

    return FriendsCollection;
});