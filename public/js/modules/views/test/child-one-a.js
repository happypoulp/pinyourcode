(function()
{
    var moduleName = 'views/test/child-one-a';

    define([
            'pubsub'
        ], function(PubSub)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ChildOneAView = Backbone.View.extend(
        {
            name: moduleName,

            render: function()
            {
                this.$el.html('child one a');
            }
        });

        return ChildOneAView;
    });
})();