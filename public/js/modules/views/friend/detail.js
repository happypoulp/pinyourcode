(function()
{
    var moduleName = 'views/friend/detail',
        moduleDependencies = [
            'pubsub',
            'facebook',
            'models/friend',
            'views/extension/list',
            'views/extension/create',
            'views/friend/detail-top'
        ];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(
        PubSub,
        Facebook,
        FriendModel,
        ListExtensionView,
        CreateExtensionView,
        DetailTopView
    )
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var DetailView = Backbone.View.extend(
        {
            name: moduleName,

            render: function()
            {
                PubSub.publish('header:any');

                var renderDeferred = $.Deferred(),
                    that = this;

                log(moduleName, 'render');

                this.dataPromise.done(function()
                {
                    var detailTopView = new DetailTopView({model: that.model}),
                        createView = new CreateExtensionView({friend: that.model}),
                        listExtensionView = new ListExtensionView({collection: that.model.get('extensions')});

                    var r1 = that.renderChild(detailTopView);
                    var r2 = that.renderChild(listExtensionView);
                    var r3 = that.renderChild(createView);

                    Facebook.getFriendsInfos(
                        [that.model.get('fb_id')],
                        function(result)
                        {
                            for (var i = result.length - 1; i >= 0; i--)
                            {
                                var friend_element = $('div[data-uid="' + result[i].uid + '"]');
                                friend_element.find('span.name').html(result[i].name);

                                $.when(r1, r2, r3).then(function()
                                {
                                    renderDeferred.resolve();
                                });
                            }
                        }
                    );
                });


                return renderDeferred;
            },

            initialize: function(options)
            {
                var id = options.routeParameters[0],
                    that = this;

                this.dataPromise = (new FriendModel({_id: id})).fetch(
                {
                    success: function(friend)
                    {
                        that.model = friend;
                    }
                });
            }
        });

        return DetailView;
    });
})();