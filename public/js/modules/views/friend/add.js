(function()
{
    var moduleName = 'views/friend/add',
        pubsub = 'pubsub',
        facebook = 'facebook';

    define([
            pubsub,
            facebook,
            'models/friend',
            'views/friend/item',
            'views/candidate/results',
            'views/generic',
            'templates/friend/add'
        ], function(
        PubSub,
        Facebook,
        FriendModel,
        FriendView,
        ResultsView,
        GenericView,
        AddFriendTemplate
    )
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var AddFriendView = Backbone.View.extend(
        {
            name: moduleName,

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

            searchFriendCallback: function(search, results)
            {
                var isNew = false;

                if (!this.resultsView)
                {
                    isNew = true;
                    console.log('ResultsView', ResultsView);
                    this.resultsView = new ResultsView();
                }

                this.resultsView
                    .setSearch(search)
                    .setResults(results);

                if (isNew)
                {
                    this.renderChild(this.resultsView, {meth: 'after', target: '#friend_search'});
                }
                else
                {
                    this.resultsView.update();
                }
            },

            render: function()
            {
                PubSub.publish('header:any');

                this.renderChild(new GenericView({template: AddFriendTemplate}));
            },

            postRender: function()
            {
                this.$el.find('input[name="friend_name"]').focus();
            }
        });

        return AddFriendView;
    });
})();