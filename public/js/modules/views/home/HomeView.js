define([
  'jquery',
  'backbone',
  'facebook',
  'collections/friends',
  '/js/modules/templates/list.js'
], function($, Backbone, Facebook, FriendsCollection, ListTemplate)
{
    var HomeView = Backbone.View.extend(
    {
        el: $("#friends_list"),
    
        render: function()
        {
            var that = this,
                friends = new FriendsCollection();

            friends.fetch(
            {
                success: function(friends)
                {
                    $(that.el).html(
                        ListTemplate(
                            {
                              friends: friends.models
                            }
                        )
                    );
                    Facebook.render(that.el);

                    var friends_ids = [];
                    for (var i = friends.models.length - 1; i >= 0; i--)
                    {
                        friends_ids.push(friends.models[i].get('fb_id'));
                    }
                    Facebook.getFriendsInfos(
                        friends_ids,
                        function(result)
                        {
                            for (var i = result.length - 1; i >= 0; i--)
                            {
                                var friend_element = $('li[data-uid="' + result[i].uid + '"]');
                                friend_element.find('span.name').html(result[i].name);
                            }
                        }
                    );
                }
            });
        }
    });

    return HomeView;
  
});