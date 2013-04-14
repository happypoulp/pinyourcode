(function()
{
    var moduleDependencies = [
            'facebook',
            'models/friend',
            'collections/extensions',
            '/js/modules/templates/detail.js',
            'views/list-extension',
            'views/create-extension',
            'pubsub'
        ],
        moduleName = 'views/detail';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(
        Facebook,
        FriendModel,
        ExtensionsCollection,
        DetailTemplate,
        ListExtensionView,
        CreateExtensionView,
        PubSub
    )
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var DetailView = Backbone.View.extend(
        {
            render: function(id)
            {
                PubSub.publish('header:any');

                log(moduleName, 'render', id);

                var that = this,
                    friend = new FriendModel({_id: id});

                friend.fetch(
                {
                    success: function(friend)
                    {
                        that.$el.html(
                            DetailTemplate(
                                {
                                  friend: friend
                                }
                            )
                        );

                        Facebook.render(that.el);

                        var c = new CreateExtensionView().render();

                        that.$el.append(
                            [
                                new ListExtensionView(
                                    {
                                        collection: new ExtensionsCollection(friend.get('extensions')),
                                        friend_id: friend.id
                                    }
                                ).render().el,
                                c.el
                            ]
                        );
                        
                        Facebook.getFriendsInfos(
                            [id],
                            function(result)
                            {
                                for (var i = result.length - 1; i >= 0; i--)
                                {
                                    var friend_element = $('div[data-uid="' + result[i].uid + '"]');
                                    friend_element.find('span.name').html(result[i].name);
                                }
                            }
                        );
                    }
                });
            }
        });

        return DetailView;
    });
})();