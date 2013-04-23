(function()
{
    var moduleDependencies = [
            'pubsub'
        ],
        moduleName = 'views/test/child-two-b';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(PubSub)
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