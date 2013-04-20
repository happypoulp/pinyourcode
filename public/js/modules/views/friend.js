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

            tagName: 'li',
            className: 'fb_friend list-item',

            events:
            {
                'click .js-remove_fb_friend': 'remove'
            },

            remove: function(ev)
            {
                ev.stopPropagation();

                if (confirm('Are you sure you want to delete this friend and all his extensions?'))
                {
                    this.model.destroy(
                    {
                        success: function()
                        {
                            $(ev.target).closest('.fb_friend').remove();
                        },
                        error: function()
                        {
                            console.log('ERROR!');
                        }
                    });
                }
            },

            toHTML: function()
            {
                return FriendTemplate({friend: this.model.attributes});
            },

            render: function()
            {
                this.$el
                    .attr('data-uid', this.model.get('fb_id'))
                    .attr('data-id', this.model.id)
                    .addClass(this.options.extraClass)
                    .html(this.toHTML());

                return this;
            },

            initialize: function()
            {
                this.model.on('change', $.proxy(this.render, this));
            }
        });

        return FriendView;
    });
})();