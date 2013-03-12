(function()
{
    var moduleDependencies = [
            'backbone',
            '/js/modules/templates/login.js',
            'pubsub'
        ],
        moduleName = 'views/login';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(Backbone, LoginTemplate, PubSub)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var LoginView = Backbone.View.extend(
        {
            render: function()
            {
                PubSub.publish('header:login');

                this.$el.html(LoginTemplate());
            }
        });

        return LoginView;
    });
})();