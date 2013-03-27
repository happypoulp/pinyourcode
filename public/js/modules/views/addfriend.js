(function()
{
    var moduleName = 'views/addfriend',
        moduleDependencies = [
            'pubsub',
            'facebook',
            '/js/modules/templates/addfriend.js',
            'models/friend',
            'views/friend',
            'views/results'
        ];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(
        PubSub,
        Facebook,
        AddFriendTemplate,
        FriendModel,
        FriendView,
        ResultsView
    )
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var AddFriendView = Backbone.View.extend(
        {
            events: {
                'keyup input[name="friend_name"]': 'onInputKeyUp',
                'submit #add_friend_form': 'onFormSubmit'
            },

            results: [],

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
                if (!this.resultsView)
                {
                    this.resultsView = new ResultsView();
                    this.el.appendChild(this.resultsView.render().el);
                }

                if (!search) return this.resultsView.empty();

                this.resultsView.update(search, result);
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