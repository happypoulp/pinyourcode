(function()
{
    var moduleName = 'views/start';

    define([
            'views/header'
        ], function(HeaderView)
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