(function()
{
    var moduleName = 'views/create-extension',
        moduleDependencies = [
            'facebook',
            'models/extension',
            '/js/modules/templates/extension-create.js'
        ];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(Facebook, extensionModel, CreateExtensionTemplate)
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

                console.log('createExtension', this, this.options.friend_id);

                var extension = new extensionModel(
                    {
                        name: document.extension_form.extension_name.value,
                        tags: document.extension_form.extension_tags.value,
                        content: document.extension_form.extension_content.value
                    }
                );

                extension.friend_id = this.options.friend_id;

                extension.save(null, {
                    success: function()
                    {
                        // Ugly. Instead, add the extensions create to the list.
                        document.location.reload();
                    }
                });
            },

            render: function(id)
            {
                this
                    .$el
                    .attr('name', this.name)
                    .html(CreateExtensionTemplate());

                return this;
            }
        });

        return CreateExtensionView;
    });
})();