define([
    'jquery',
    'backbone',
    'views/HomeView',
    'views/DetailView',
    'views/CreateExtensionView',
], function($, Backbone, HomeView, DetailView, CreateExtensionView)
{
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
            var homeView = new HomeView();
            homeView.render();
        });

        app_router.on('route:getFriend', function (id)
        {
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