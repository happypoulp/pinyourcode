var routes = {};

// Friends & extensions api routes
routes['api'] =
{
  'get':
  {
    'friend_list': '/api/friends',
    'friend_show': '/api/friends/:fb_id',
    'extension_list': '/api/friends/:fb_id/extensions',
    'extension_show': '/api/friends/:fb_id/extensions/:extension_id'
  },
  'post':
  {
    'friend_create': '/api/friends',
    'extension_create': '/api/friends/:fb_id/extensions'
  },
  'put':
  {
    'friend_update': '/api/friends/:fb_id',
    'extension_update': '/api/friends/:fb_id/extensions/:extension_id'
  },
  'delete':
  {
    'friend_delete': '/api/friends/:fb_id',
    'extension_delete': '/api/friends/:fb_id/extensions/:extension_id'
  }
};

// Tests routes
routes['test'] =
{
  'get':
  {
    'templating': '/templating',
    'authenticated': '/authenticated'
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
        app[method].call(app, route, controllerInstance[action]);
      }
    }
  }
}
