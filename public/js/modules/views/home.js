(function()
{
    var moduleName = 'views/home';

    define([
            'pubsub',
            'facebook',
            'collections/friends',
            'views/friend/list'
        ], function(PubSub, Facebook, FriendsCollection, ListView)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var HomeView = Backbone.View.extend(
        {
            name: moduleName,

            events: {
                'click li.fb_friend': 'showFriendDetails'
            },

            showFriendDetails: function(ev)
            {
                app.navigate('/friend/' + $(ev.currentTarget).data('id'), {trigger: true});
            },

            render: function()
            {
                PubSub.publish('header:any');

                log(moduleName, 'render');

                var that = this,
                    renderDeferred = $.Deferred();

                this.dataPromise.done(function()
                {
                    log(moduleName, 'data promise fulfilled');
                    var friends_ids = [],
                        idToFriend = {};

                    for (var i = that.collection.models.length - 1; i >= 0; i--)
                    {
                        var fb_id = that.collection.models[i].get('fb_id');
                        friends_ids.push(fb_id);
                        idToFriend[fb_id] = that.collection.models[i];
                    }

                    Facebook.getFriendsInfos(
                        friends_ids,
                        function(result)
                        {
                            for (var i = result.length - 1; i >= 0; i--)
                            {
                                idToFriend[result[i].uid].set('name', result[i].name);
                            }

                            window.listV = new ListView({collection: that.collection});

                            $.when(that.renderChild(listV)).then(function()
                            {
                                renderDeferred.resolve();
                            });
                        }
                    );
                });

                return renderDeferred;
            },

            initialize: function()
            {
                var that = this;

                this.dataPromise = new FriendsCollection().fetch(
                {
                    success: function(friends)
                    {
                        log(moduleName, 'success fetching friends');
                        that.collection = friends;
                    }
                });
            }
        });

        return HomeView;
    });
})();