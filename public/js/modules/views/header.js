(function()
{
    var moduleName = 'views/header',
        moduleDependencies = [
            'session',
            'pubsub'
        ];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(Session, PubSub)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var HeaderView = Backbone.View.extend(
        {
            name: moduleName,

            permanent: true,

            currentDisplayMode: 'hidden',
        
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
                if (this.currentDisplayMode != 'login')
                {
                    $('.js-back_button, .js-add_fb_friend').hide();
                    var authButton = $('.js-auth_button');
                    authButton.show().html(authButton.data('in'));
                }
            },

            displayForAny: function()
            {
                if (this.currentDisplayMode != 'any')
                {
                    $('.js-back_button, .js-add_fb_friend').show();
                    var authButton = $('.js-auth_button');
                    authButton.show().html(authButton.data('out'));
                }
            },

            initialize: function()
            {
                PubSub
                    .subscribe('header:login', this.displayForLogin, this)
                    .subscribe('header:any', this.displayForAny, this);
            }
        });

        return HeaderView;
    });
})();