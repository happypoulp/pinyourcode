(function()
{
    var moduleDependencies = [
            'pubsub',
            'views/test/child-one',
            'views/test/child-two',
            'views/test/child-three'
        ],
        moduleName = 'views/test/page';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(PubSub, ChildOneView, ChildTwoView, ChildThreeView)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var TestPageView = Backbone.View.extend(
        {
            name: moduleName,

            render: function()
            {
                PubSub.publish('header:login');

                var
                    renderDeferred = $.Deferred()
                    // , renderChildPromises = []
                    , that = this;

                // simulate getting data for ChildTwoView
                setTimeout(function()
                {
                    var r1 = that.renderChild(new ChildOneView());
                    var r2 = that.renderChild(new ChildTwoView());
                    var r3 = that.renderChild(new ChildThreeView());

                    $.when(r1, r2, r3).then(function()
                    {
                        renderDeferred.resolve();
                    });
                }, 100);

                return renderDeferred;
            }
        });

        return TestPageView;
    });
})();