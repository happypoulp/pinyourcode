(function()
{
    var moduleDependencies = [
            'jquery',
            'backbone',
            'facebook',
            'models/friend',
            '/js/modules/templates/detail.js',
            'views/create-extension',
            'pubsub'
        ],
        moduleName = 'views/detail';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function($, Backbone, Facebook, FriendModel, DetailTemplate, CreateExtensionView, PubSub)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var DetailView = Backbone.View.extend(
        {
            render: function(id)
            {
                PubSub.publish('header:any');

                log(moduleName, 'render', id);

                var that = this,
                    friend = new FriendModel({id: id});

                friend.fetch(
                {
                    success: function(friend)
                    {
                        console.log(friend.toJSON());
                        that.$el.html(
                            DetailTemplate(
                                {
                                  friend: friend
                                }
                            )
                        );
                        Facebook.render(that.el);

                        new CreateExtensionView({el: $('#pages')}).render();
                        
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