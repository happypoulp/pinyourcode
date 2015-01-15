var Router = require('router');
var Facebook = require('facebook');

var Application = function()
{
    Facebook.init(function()
    {
        log('Facebook.init - DONE');
        log('Router.initialize');
        Router.initialize();
    });
};

Application();