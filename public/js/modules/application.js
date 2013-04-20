(function()
{
    var moduleName = 'application',
        moduleDependencies = [
            'router',
            'facebook'
        ];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));


    define(moduleDependencies, function(Router, Facebook)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var Application = function() {};

        Application.prototype =
        {
            initialize: function()
            {
                log(moduleName, 'initialize');

                var that = this;

                $(function()
                {
                    log(moduleName, 'Facebook.init');
                    // that.initHandlers();
                    Facebook.init(function()
                    {
                        log(moduleName, 'Facebook.init - DONE');
                        log(moduleName, 'Router.initialize');
                        Router.initialize();
                    });
                });
            }
        };

        return new Application();
    });
})();