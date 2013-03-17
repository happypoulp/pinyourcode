(function()
{
    var moduleDependencies = [
            'pubsub',
            'facebook',
            '/js/modules/templates/addfriend.js',
            '/js/modules/templates/emptyresults.js',
            'models/friend',
            'views/friend'
        ],
        moduleName = 'views/addfriend';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(
        PubSub,
        Facebook,
        AddFriendTemplate,
        EmptyResultsTemplate,
        FriendModel,
        FriendView
    )
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
                var that = this;
                clearTimeout(this.inputTO);

                this.inputTO = setTimeout(function()
                {
                    var search = $.trim($(ev.target).val());

                    if (that.lastSearch === search) return;

                    console.log('search', search);
                    Facebook.searchFriend(search, $.proxy(that.searchFriendCallback, that));
                    that.lastSearch = search;
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
                    needFBRendering = true;

                for (var i = 0, l = result.length; i < l; i++)
                {
                    var found = $('#fb_search_results .fb_friend[data-uid="' + result[i].uid + '"]');

                    if (!found.length)
                    {
                        markupArray.push(
                            new FriendView(
                            {
                                model: new FriendModel(
                                {
                                    fb_id: result[i].uid,
                                    name: result[i].name
                                }),
                                extraClass: 'keep'
                            }).toHTML()
                        );
                    }
                    else
                    {
                        found.addClass('keep');
                    }
                }

                if (!result.length)
                {
                    markupArray.push(EmptyResultsTemplate({search: search}));
                    needFBRendering = false;
                }

                if (markupArray.length)
                {
                    console.log(markupArray);
                    if (!friendsContainer.find('.fb_friend').length) friendsContainer.empty();
                    friendsContainer.prepend(markupArray.join(''));
                }

                $('#fb_search_results .fb_friend').each(function()
                {
                    $el = $(this);
                    if ($el.hasClass('keep'))
                        $el.removeClass('keep');
                    else
                        $el.remove();
                });

                if (needFBRendering) Facebook.render(friendsContainer.get(0));
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