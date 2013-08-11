(function()
{
    var moduleName = 'views/extension/create';

    define([
            'models/extension',
            'templates/extension/create',
            'templates/extension/form'
        ], function(ExtensionModel, CreateExtensionTemplate, FormExtensionTemplate)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var CreateExtensionView = Backbone.View.extend(
        {
            tagName: 'form',
            className: 'add_extension_form',
            name: 'extension_form',

            events: {
                'submit': 'createExtension'
            },

            createExtension: function(ev)
            {
                ev.preventDefault();

                var extension = new ExtensionModel(
                        {
                            name: document.extension_form.extension_name.value,
                            tags: document.extension_form.extension_tags.value,
                            content: document.extension_form.extension_content.value
                        }
                    ),
                    that = this;

                extension.friend_id = this.options.friend.id;

                extension.save(null, {
                    success: function(extension)
                    {
                        that.options.friend.addExtension(extension);
                        that.reset();
                    }
                });
            },

            reset: function()
            {
                this.el.reset();
                this.$el.find('input:first').focus();
            },

            render: function(id)
            {
                this
                    .$el
                    .attr('name', this.name)
                    .html(CreateExtensionTemplate())
                    .append(FormExtensionTemplate());

                return this;
            }
        });

        return CreateExtensionView;
    });
})();