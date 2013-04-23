(function()
{
    var moduleDependencies = [
            'pubsub',
            'views/test/child-three-a',
            'views/test/child-three-b'
        ],
        moduleName = 'views/test/child-three';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(PubSub, ChildThreeAView, ChildThreeBView)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ChildThreeView = Backbone.View.extend(
        {
            name: moduleName,

            render: function()
            {
                var renderDeferred = $.Deferred(),
                    that = this;

                setTimeout(function()
                {
                    var r1 = that.renderChild(new ChildThreeAView());
                    var r2 = that.renderChild(new ChildThreeBView());

                    $.when(r1, r2).then(function()
                    {
                        renderDeferred.resolve();
                    });
                }, 300);

                return renderDeferred;
            }
        });

        return ChildThreeView;
    });
})();