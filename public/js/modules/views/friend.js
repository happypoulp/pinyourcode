(function()
{
    var moduleDependencies = [
            'backbone',
            '/js/modules/templates/friend.js'
        ],
        moduleName = 'views/friend';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(Backbone, FriendTemplate)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var FriendView = Backbone.View.extend({

            events: {},

            toHTML: function()
            {
                return FriendTemplate({friend: this.model, extraClass: this.options.extraClass});
            },

            render: function()
            {
                this.$el.html(this.toHTML());
                return this;
            }
        });

        return FriendView;
    });
})();