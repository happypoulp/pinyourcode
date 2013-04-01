(function()
{
    var moduleDependencies = [
            'facebook',
            'models/extension',
            '/js/modules/templates/extension-create.js'
        ],
        moduleName = 'views/create-extension';

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

                var extension = new extensionModel(
                    {
                        friend_id:$('.friend').data('id'),
                        name: document.extension_form.extension_name.value,
                        tags: document.extension_form.extension_tags.value,
                        content: document.extension_form.extension_content.value
                    }
                );

                extension.save();
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