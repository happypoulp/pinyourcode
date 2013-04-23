(function()
{
    var moduleName = 'views/extension/item',
        moduleDependencies = [
            'templates/extension/item'
        ];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(ExtensionTemplate)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ExtensionView = Backbone.View.extend({

            tagName: 'li',
            className: 'extension list-item',

            events:
            {
                'click .js-remove_extension': 'delete'
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