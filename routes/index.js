var routes = {};

// Friends & extensions api routes
routes['api'] =
{
  'get':
  {
    'friend_list': '/api/friends',
    'friend_show': '/api/friends/:friend_id',
    'extension_list': '/api/friends/:friend_id/extensions',
    'extension_show': '/api/friends/:friend_id/extensions/:extension_id'
  },
  'post':
  {
    'friend_create': '/api/friends',
    'extension_create': '/api/friends/:friend_id/extensions'
  },
  'put':
  {
    'friend_update': '/api/friends/:friend_id',
    'extension_update': '/api/friends/:friend_id/extensions/:extension_id'
  },
  'delete':
  {
    'friend_delete': '/api/friends/:friend_id',
    'extension_delete': '/api/friends/:friend_id/extensions/:extension_id'
  }
};

// Tests routes
routes['test'] =
{
  'get':
  {
    'templating': '/test/templating',
    'authenticated': '/test/authenticated'
  }
};

// Main application routes
routes['application'] = 
{
  'get':
  {
    'index': '/'
  }
};

module.exports = function(app)
{
  for (routesGroupName in routes)
  {
    var controller = require('../controllers/' + routesGroupName)
      , methodGroupedRoutes = routes[routesGroupName];

    controllerInstance = new controller.class();

    if (controller.setup)
    {
      controller.setup(app, routes[routesGroupName]);
    }

    for (method in methodGroupedRoutes)
    {
      var methodRoutes = methodGroupedRoutes[method];

      for (action in methodRoutes)
      {
        var route = methodRoutes[action];
        app[method].call(app, route, (function(controllerInstance, action)
        {
          return function(req, res)
          {
            res.cookie('iacv', app.locals.version, { maxAge: 1000*60*60*24*365 });
            controllerInstance[action].apply(app, arguments);
          }
        })(controllerInstance, action));
      }
    }
  }
}
