(function()
{
    var moduleDependencies = [
            'pubsub'
        ],
        moduleName = 'views/test/child-one-b';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(PubSub)
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