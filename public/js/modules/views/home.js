(function()
{
    var moduleDependencies = [
            'pubsub',
            'facebook',
            'collections/friends',
            'views/list'
        ],
        moduleName = 'views/home';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(PubSub, Facebook, FriendsCollection, ListView)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var HomeView = Backbone.View.extend(
        {
            events: {
                'click li.fb_friend': 'showFriendDetails'
            },

            showFriendDetails: function(ev)
            {
                document.location.hash = '/friend/' + $(ev.currentTarget).data('uid');
            },

            render: function()
            {
                PubSub.publish('header:any');

                log(moduleName, 'render');

                var friends = new FriendsCollection();

                friends.fetch(
                {
                    success: function(friends)
                    {
                        var friends_ids = [],
                            idToFriend = {};

                        for (var i = friends.models.length - 1; i >= 0; i--)
                        {
                            var fb_id = friends.models[i].get('fb_id');
                            friends_ids.push(fb_id);
                            idToFriend[fb_id] = friends.models[i];
                        }

                        Facebook.getFriendsInfos(
                            friends_ids,
                            function(result)
                            {
                                for (var i = result.length - 1; i >= 0; i--)
                                {
                                    idToFriend[result[i].uid].set('name', result[i].name);
                                }

                                new ListView({collection: friends, el: $('#pages')}).render();
                            }
                        );
                    }
                });
            }
        });

        return HomeView;
    });
})();