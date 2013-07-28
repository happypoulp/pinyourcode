(function()
{
    var moduleName = 'views/login',
        pubsub = 'pubsub';

    define([
            pubsub,
            'views/generic',
            'templates/login'
        ], function(PubSub, GenericView, LoginTemplate)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var LoginView = Backbone.View.extend(
        {
            name: moduleName,

            render: function()
            {
                PubSub.publish('header:login');

                this.renderChild(
                    new GenericView(
                        {
                            template: LoginTemplate,
                            data: null,
                            tagName: 'center'
                        }
                    )
                );
            }
        });

        return LoginView;
    });
})();