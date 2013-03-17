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

            className: 'fb_friend',

            events: function()
            {
                var events = {};
                events['click .' + this.className + '[data-uid="' + this.model.get('fb_id') + '"] .js-remove_fb_friend'] = 'remove';
                return events;
            },

            remove: function(ev)
            {
                ev.stopPropagation();

                console.log(this.model.destroy(
                {
                    success: function()
                    {
                        $(ev.target).closest('.fb_friend').remove();
                    },
                    error: function()
                    {
                        console.log('ERROR!');
                    }
                }));
            },

            toHTML: function()
            {
                return FriendTemplate({friend: this.model.attributes, extraClass: this.options.extraClass});
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