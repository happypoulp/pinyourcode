(function()
{
    var moduleDependencies = [
            'pubsub'
        ],
        moduleName = 'views/test/child-two-a';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(PubSub)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ChildTwoAView = Backbone.View.extend(
        {
            name: moduleName,

            render: function()
            {
                this.$el.html('child two a');
            }
        });

        return ChildTwoAView;
    });
})();