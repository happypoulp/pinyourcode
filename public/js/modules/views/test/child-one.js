(function()
{
    var moduleDependencies = [
            'pubsub',
            'views/test/child-one-a',
            'views/test/child-one-b'
        ],
        moduleName = 'views/test/child-one';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(PubSub, ChildOneAView, ChildOneBView)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ChildOneView = Backbone.View.extend(
        {
            name: moduleName,

            render: function()
            {
                var
                    that = this
                    , renderDeferred = $.Deferred();

                setTimeout(function()
                {
                    var r1 = that.renderChild(new ChildOneAView());
                    var r2 = that.renderChild(new ChildOneBView());

                    $.when(r1, r2).then(function()
                    {
                        renderDeferred.resolve();
                    });
                }, 200);

                return renderDeferred;
            }
        });

        return ChildOneView;
    });
})();