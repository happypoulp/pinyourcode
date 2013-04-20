(function()
{
    var moduleName = 'views/start',
        moduleDependencies = [
            'views/header'
        ];

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