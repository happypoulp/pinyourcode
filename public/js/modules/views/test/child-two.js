(function()
{
    var moduleName = 'views/test/child-two';

    define([
            'pubsub',
            'views/test/child-two-a',
            'views/test/child-two-b'
        ], function(PubSub, ChildTwoAView, ChildTwoBView)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ChildTwoView = Backbone.View.extend(
        {
            name: moduleName,

            render: function()
            {
                var renderDeferred = $.Deferred()
                    , that = this;

                // simulate getting data for ChildTwoAView
                setTimeout(function()
                {
                    var r1 = that.renderChild(new ChildTwoAView());
                    var r2 = that.renderChild(new ChildTwoBView());
                    $.when(r1, r2).then(function()
                    {
                        renderDeferred.resolve();
                    })
                }, 100);

                return renderDeferred;
            }
        });

        return ChildTwoView;
    });
})();