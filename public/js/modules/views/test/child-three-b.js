(function()
{
    var moduleDependencies = [
            'pubsub'
        ],
        moduleName = 'views/test/child-three-b';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(PubSub)
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