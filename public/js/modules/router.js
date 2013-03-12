(function()
{
    var moduleDependencies = [
            'jquery',
            'backbone',
            'session',
            'pubsub',
            'views/start'
        ],
        moduleName = 'router';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(
        $,
        Backbone,
        Session,
        PubSub,
        StartView
    )
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var AppRouter = Backbone.Router.extend(
        {
            routes: {
              'friend/:id': "getFriend",
              'login': "login",
              '*actions': 'any'
            }
        });
      
        var initialize = function()
        {
            new StartView().render();

            var app_router = new AppRouter,
                mainContainer = $('#pages');

            PubSub.subscribe('session:status', function(logged)
            {
                if (!logged)
                    app_router.navigate("login", {trigger: true});
                else
                    app_router.navigate("/", {trigger: true});
            });
            
            app_router.on('route:any', function (actions)
            {
                Session.requireAuth(function()
                {
                    require(['views/home'], function(HomeView)
                    {
                        new HomeView({el: mainContainer}).render();
                    });
                });
            });

            app_router.on('route:login', function ()
            {
                if (Session.logged()) return app_router.navigate("/", {trigger: true});

                require(['views/login'], function(LoginView)
                {
                    new LoginView({el: mainContainer}).render();
                });
            });

            app_router.on('route:getFriend', function (id)
            {
                Session.requireAuth(function()
                {
                    require(['views/detail'], function(DetailView)
                    {
                        new DetailView({el: mainContainer}).render(id);
                    });
                });

            });
        
            Backbone.history.start();
        };

        return { 
          initialize: initialize
        };
    });
})();