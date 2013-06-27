(function()
{
    var moduleName = 'views/test/child-two-a';

    define([
            'pubsub'
        ], function(PubSub)
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