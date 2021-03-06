(function()
{
    var moduleName = 'views/friend/item';

    define([
            'templates/friend/item'
        ], function(FriendTemplate)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var FriendView = Backbone.View.extend({

            name: moduleName,

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

            render: function()
            {
                log(moduleName, '==== render', this.cid);
                this.$el
                    .attr('data-uid', this.model.get('fb_id'))
                    .attr('data-id', this.model.id)
                    .addClass(this.options.extraClass)
                    .html(FriendTemplate({friend: this.model.attributes}));
            },

            beforeRemove: function(options)
            {
                this.model.off('change', this.getRenderProxy());

                return this;
            },

            getRenderProxy: function()
            {
                return this.renderProxy || (this.renderProxy = $.proxy(this.render, this));
            },

            initialize: function()
            {
                this.model.on('change', this.getRenderProxy());
            }
        });

        return FriendView;
    });
})();