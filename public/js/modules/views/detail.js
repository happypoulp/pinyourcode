(function()
{
    var moduleDependencies = [
            'jquery',
            'backbone',
            'facebook',
            'models/friend',
            '/js/modules/templates/detail.js'
        ],
        moduleName = 'views/detail';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function($, Backbone, Facebook, FriendModel, DetailTemplate)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var DetailView = Backbone.View.extend(
        {
            el: $("#pages"),
        
            render: function(id)
            {
                console.log(id);
                var that = this,
                    friend = new FriendModel({id: id});

                friend.fetch(
                {
                    success: function(friend)
                    {
                        console.log(friend.toJSON());
                        $(that.el).append(
                            DetailTemplate(
                                {
                                  friend: friend
                                }
                            )
                        );
                        Facebook.render(that.el);

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