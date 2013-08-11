(function()
{
    var moduleName = 'views/extension/edit';

    define([
            'models/extension',
            'templates/extension/form'
        ], function(ExtensionModel, FormExtensionTemplate)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var EditExtensionView = Backbone.View.extend(
        {
            tagName: 'form',
            className: 'edit_extension_form list-item',
            name: 'extension_form',

            events: {
                'submit': 'editExtension'
            },

            editExtension: function(ev)
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
                    }
                });
            },

            render: function(id)
            {
                this
                    .$el
                    .attr('name', this.name)
                    .html(FormExtensionTemplate());

                return this;
            }
        });

        return EditExtensionView;
    });
})();