(function()
{
    var moduleDependencies = [
            'pubsub'
        ],
        moduleName = 'views/test/child-three-a';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(PubSub)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ChildThreeAView = Backbone.View.extend(
        {
            name: moduleName,

            render: function()
            {
                var renderDeferred = $.Deferred(),
                    that = this;

                setTimeout(function()
                {
                    that.$el.html('child three a');
                    renderDeferred.resolve();
                }, 400);

                return renderDeferred;
            }
        });

        return ChildThreeAView;
    });
})();