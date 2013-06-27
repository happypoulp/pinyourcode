(function()
{
    var moduleName = 'router';

    define([
            'session',
            'pubsub',
            'views/app'
        ], function(Session, PubSub, AppView)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var AppRouter = Backbone.Router.extend(
        {
            routes: {
              'friend/:id': "getFriend",
              'login': "login",
              'add': "add",
              'test-renderer': "testRenderer",
              '*actions': 'any'
            }
        });
      
        var initialize = function()
        {
            var appView = new AppView({el: $('#pages')}),
                appRouter = new AppRouter();

            window.app = appRouter;

            PubSub.subscribe('session:status', function(logged)
            {
                if (!logged)
                    appRouter.navigate("login", {trigger: true});
                else
                    appRouter.navigate("/", {trigger: true});
            });
            
            appRouter.on('route:any', function ()
            {
                appView.renderAuthPage('views/home');
            });            

            appRouter.on('route:add', function (actions)
            {
                appView.renderAuthPage('views/friend/add');
            });

            appRouter.on('route:login', function ()
            {
                if (Session.logged()) return appRouter.navigate("/", {trigger: true});

                appView.renderPage('views/login');
            });

            appRouter.on('route:getFriend', function (id)
            {
                appView.renderAuthPage('views/friend/detail', id);
            });

            appRouter.on('route:testRenderer', function ()
            {
                appView.renderPage('views/test/page');
            });
        
            Backbone.history.start();
        };

        return { 
          initialize: initialize
        };
    });
})();