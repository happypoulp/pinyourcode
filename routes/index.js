var routes = {};

// Main application routes
routes['application'] = 
{
  'get':
  {
    'index': '/'
  }
};

// Friends & extensions api routes
routes['api'] =
{
  'get':
  {
    'friend_list': '/friends',
    'friend_show': '/friends/:fb_id',
    'extension_list': '/friends/:fb_id/extensions',
    'extension_show': '/friends/:fb_id/extensions/:extension_id'
  },
  'post':
  {
    'friend_create': '/friends',
    'extension_create': '/friends/:fb_id/extensions'
  },
  'put':
  {
    'friend_update': '/friends/:fb_id',
    'extension_update': '/friends/:fb_id/extensions/:extension_id'
  },
  'delete':
  {
    'friend_delete': '/friends/:fb_id',
    'extension_delete': '/friends/:fb_id/extensions/:extension_id'
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
