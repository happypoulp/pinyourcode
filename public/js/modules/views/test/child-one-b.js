(function()
{
    var moduleName = 'views/test/child-one-b';

    define([
            'pubsub'
        ], function(PubSub)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ChildOneBView = Backbone.View.extend(
        {
            name: moduleName,

            render: function()
            {
                this.$el.html('child one b');
            }
        });

        return ChildOneBView;
    });
})();