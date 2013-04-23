(function()
{
    var moduleDependencies = [
            'pubsub'
        ],
        moduleName = 'views/test/child-one-a';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(PubSub)
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