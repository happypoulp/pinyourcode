(function()
{
    var moduleDependencies = [
            'jquery',
            'backbone',
            'session',
            'pubsub'
        ],
        moduleName = 'views/header';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function($, Backbone, Session, PubSub)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var HeaderView = Backbone.View.extend(
        {
            initialized: false,
        
            events:
            {
                'click button.js-auth_button': 'onAuthClick'
            },

            onAuthClick: function(ev)
            {
                Session.toggleLoginStatus();
            },

            displayForLogin: function()
            {
                $('.js-back_button, .js-add_fb_friend').hide();
                var authButton = $('.js-auth_button');
                authButton.show().html(authButton.data('in'));
            },

            displayForAny: function()
            {
                $('.js-back_button, .js-add_fb_friend').show();
                var authButton = $('.js-auth_button');
                authButton.show().html(authButton.data('out'));
            },

            initialize: function()
            {
                PubSub
                    .subscribe('header:login', this.displayForLogin, this)
                    .subscribe('header:any', this.displayForAny, this);
            },

            render: function()
            {
                if (!this.initialized) this.initialize();
            }
        });

        return HeaderView;
    });
})();