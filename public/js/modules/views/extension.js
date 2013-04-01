(function()
{
    var moduleName = 'views/extension',
        moduleDependencies = [
            '/js/modules/templates/extension.js'
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
                'click .js-remove_extension': 'remove'
            },

            remove: function(ev)
            {
                console.log(ev.target);

                ev.stopPropagation();

                if (confirm('Are you sure you want to delete this extension?'))
                {
                    this.model.destroy(
                    {
                        success: function()
                        {
                            $(ev.target).closest('.extension').remove();
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
                return ExtensionTemplate({extension: this.model.attributes});
            },

            render: function()
            {
                this.$el
                    .attr('data-id', this.model.id)
                    .html(this.toHTML());

                return this;
            }
        });

        return ExtensionView;
    });
})();