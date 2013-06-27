(function()
{
    var moduleName = 'views/test/child-three-a';

    define([
            'pubsub'
        ], function(PubSub)
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