(function()
{
    var moduleDependencies = [
            'backbone',
            '/js/modules/templates/addfriend.js',
            'pubsub',
            'facebook'
        ],
        moduleName = 'views/addfriend';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(Backbone, AddFriendTemplate, PubSub, Facebook)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var AddFriendView = Backbone.View.extend(
        {
            events: {
                'keyup input[name="friend_name"]': 'onInputKeyUp',
                'submit #add_friend_form': 'onFormSubmit'
            },

            onInputKeyUp: function(ev)
            {
                console.log(this);
                var that = this;
                clearTimeout(this.inputTO);

                that.inputTO = setTimeout(function()
                {
                    var search = $(ev.target).val();
                    console.log('search', search);
                    Facebook.searchFriend(search, $.proxy(that.searchFriendCallback, that));
                }, 150);
            },

            onFormSubmit: function(ev)
            {
                ev.preventDefault();
            },

            searchFriendCallback: function(search, result)
            {
                var friendsContainer = $('#fb_search_results');

                if (!search) return friendsContainer.empty();

                console.log('friends.get response', result);
                var markupArray = [],
                    numFriends = result ? result.length : 0,
                    html = '';

                if (numFriends > 0)
                {
                    for (var i=0; i<numFriends; i++)
                    {
                        if (!$('#fb_search_results .fb_friend[data-uid="' + result[i].uid + '"]').length)
                        {
                            markupArray.push(
                                this.getFriendHtml(
                                    i,
                                    {
                                        fb_id: result[i].uid,
                                        name: result[i].name
                                    }
                                )
                            );
                        }
                    }
                }

                html = markupArray.join('')

                if (!html)
                {
                    html = '<center>No results for this search.'+
                        '<br /><br />Maybe this person is already in your extended contacts? '+
                        'Or you could you have possibly misspelled his or her name?</center>';
                }

                friendsContainer.html(html);

                if (markupArray.length) Facebook.render(friendsContainer.get(0));
            },

            getFriendHtml: function(index, friend)
            {
                var extensionsCount = friend.extensions ? friend.extensions.length : 0;

                return '<div data-uid="' + friend.fb_id + '"class="fb_friend ' + (index%2 ? 'odd' : 'even') + '">'+
                            // '<span class="checkbox_container">'+
                            //     '<input class="extended" type="checkbox" ' + (friend.active ? 'checked="checked"' : '') + '/>'+
                            // '</span>'+
                            '<div class="profile_pic"><fb:profile-pic size="square" uid="' + friend.fb_id + '" facebook-logo="true"></fb:profile-pic></div>'+
                            '<span class="name">' + friend.name + '</span>' +
                            '<div class="extensions_count" title="' + extensionsCount + ' extensions">' + extensionsCount + '</div>' +
                        '</div>';
            },

            render: function()
            {
                PubSub.publish('header:any');

                this.$el
                    .html(AddFriendTemplate())
                    .find('input[name="friend_name"]').focus();
            }
        });

        return AddFriendView;
    });
})();