(function()
{
    var moduleName = 'views/friend/detail',
        moduleDependencies = [
            'pubsub',
            'facebook',
            'models/friend',
            'collections/extensions',
            'views/extension/list',
            'views/extension/create',
            'views/generic',
            'templates/friend/detail'
        ];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(
        PubSub,
        Facebook,
        FriendModel,
        ExtensionsCollection,
        ListExtensionView,
        CreateExtensionView,
        GenericView,
        DetailTemplate
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
                    var DetailView = new GenericView({template: DetailTemplate, data: {friend: that.model}}),
                        createView = new CreateExtensionView({friend: that.model}),
                        listExtensionView = new ListExtensionView({collection: that.model.get('extensions')});

                    var r1 = that.renderChild(DetailView);
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

            updateExtensionsCounter: function()
            {
                $('.extensions_count').html(this.model.get('extensions').length);
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
                        friend.get('extensions').on('add', $.proxy(that.updateExtensionsCounter, that));
                        friend.get('extensions').on('remove', $.proxy(that.updateExtensionsCounter, that));
                    }
                });
            }
        });

        return DetailView;
    });
})();