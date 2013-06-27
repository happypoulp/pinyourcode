(function()
{
    var moduleName = 'views/test/child-three-b';

    define([
            'pubsub'
        ], function(PubSub)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ChildThreeBView = Backbone.View.extend(
        {
            name: moduleName,

            render: function()
            {
                this.$el.html('child three b');
            }
        });

        return ChildThreeBView;
    });
})();