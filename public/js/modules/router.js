(function()
{
    var moduleDependencies = [
            'jquery',
            'backbone',
            'views/home',
            'views/detail',
            'views/create-extension',
        ],
        moduleName = 'router';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function($, Backbone, HomeView, DetailView, CreateExtensionView)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var AppRouter = Backbone.Router.extend(
        {
            routes: {
              'friend/:id': "getFriend",
              '*actions': 'defaultAction'
            }
        });
      
        var initialize = function()
        {
            var app_router = new AppRouter;
            
            app_router.on('route:defaultAction', function (actions)
            {
                log(moduleName, 'route:defaultAction');
                var homeView = new HomeView();
                homeView.render();
            });

            app_router.on('route:getFriend', function (id)
            {
                log(moduleName, 'route:getFriend');
                $('#pages').html('');

                var detailView = new DetailView(),
                    createExtensionView = new CreateExtensionView();

                detailView.render(id);
                createExtensionView.render();
            });
        
            Backbone.history.start();
        };

        return { 
          initialize: initialize
        };
    });
})();