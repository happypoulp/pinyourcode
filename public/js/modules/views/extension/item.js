(function()
{
    var moduleName = 'views/extension/item';

    define([
            'templates/extension/item',
            'views/extension/edit'
        ], function(ExtensionTemplate, EditExtensionView)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ExtensionView = Backbone.View.extend({

            tagName: 'li',
            className: 'extension list-item',

            events:
            {
                'click .js-remove_extension': 'delete',
                'click .js-edit_extension': 'edit'
            },

            delete: function(ev)
            {
                var that = this;

                ev.stopPropagation();

                if (confirm('Are you sure you want to delete this extension?'))
                {
                    this.model.destroy(
                    {
                        success: function()
                        {
                            that.remove();
                        },
                        error: function()
                        {
                            console.log('ERROR!');
                        }
                    });
                }
            },

            edit: function(ev)
            {
                var that = this;

                ev.stopPropagation();

                console.log('edit');
                this.replaceWith(new EditExtensionView({extension: that.model}));
            },

            render: function()
            {
                this.$el
                    .attr('data-id', this.model.id)
                    .html(ExtensionTemplate({extension: this.model.attributes}));

                return this;
            }
        });

        return ExtensionView;
    });
})();