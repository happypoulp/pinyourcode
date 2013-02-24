(function()
{
    var moduleDependencies = [
            'jquery',
            'backbone',
            'facebook',
            'models/extension',
            '/js/modules/templates/extension-create.js'
        ],
        moduleName = 'views/create-extension';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function($, Backbone, Facebook, extensionModel, CreateExtensionTemplate)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var CreateExtensionView = Backbone.View.extend(
        {
            el: $("#pages"),
        
            events: {
                'submit form.add_extension_form': 'createExtension'
            },

            createExtension: function(ev)
            {
                var extension = new extensionModel({friend_id:$('.friend').data('uid')});

                extension.save(
                {
                    name: document.extension_form.extension_name.value,
                    type: document.extension_form.extension_type.value,
                    content: document.extension_form.extension_content.value
                });

                return false;
            },

            render: function(id)
            {
                $(this.el).append(CreateExtensionTemplate());
            }
        });

        return CreateExtensionView;
    });
})();