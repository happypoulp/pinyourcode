(function()
{
    var moduleName = 'views/app',
        moduleDependencies = [
            'session',
            'views/header'
        ];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(Session, HeaderView)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var AppView = Backbone.View.extend(
        {
            initialized: false,

            name: moduleName,

            render: function()
            {
                log(moduleName, "render AppView");

                if (!this.initialized)
                {
                    this.initialized = true;
                    this.renderChild(new HeaderView({el: $('header')}));
                }

                var that = this,
                    pageArgs = Array.prototype.slice.call(this.pageArgs),
                    pageName = pageArgs[0];

                log(moduleName, "render Page", pageName);

                require([pageName], function(Page)
                {
                    that.renderChild(new Page(
                        {
                            routeParameters: pageArgs.slice(1)
                        }
                    ), {meth: 'html', target: '#pages'});
                });
            },

            renderPage: function()
            {
                this.pageArgs = arguments;

                this.clean();
                this.render();
            },

            renderAuthPage: function()
            {
                var that = this,
                    args = arguments;

                Session.requireAuth(function()
                {
                    that.renderPage.apply(that, args);
                });
            }
        });

        return AppView;
    });
})();