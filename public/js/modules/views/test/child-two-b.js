(function()
{
    var moduleName = 'views/test/child-two-b';

    define([
            'pubsub'
        ], function(PubSub)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ChildTwoBView = Backbone.View.extend(
        {
            name: moduleName,

            render: function()
            {
                this.$el.html('child two b');
            }
        });

        return ChildTwoBView;
    });
})();