(function()
{
    var moduleDependencies = [
            'views/header'
        ],
        moduleName = 'views/start';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(HeaderView)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var StartView = Backbone.View.extend(
        {
            render: function()
            {
                new HeaderView({el: $('header')}).render();
            }
        });

        return StartView;
    });
})();