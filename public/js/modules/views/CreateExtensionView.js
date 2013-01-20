define([
  'jquery',
  'backbone',
  'facebook',
  'models/extension',
  '/js/modules/templates/extension-create.js'
], function($, Backbone, Facebook, extensionModel, CreateExtensionTemplate)
{
    var CreateExtensionView = Backbone.View.extend(
    {
        el: $("#pages"),
    
        events: {
            'submit form.add_extension_form': 'createExtension'
        },

        createExtension: function(ev)
        {
            var extension = new extensionModel({userId:$('.friend').data('uid')});

            extension.save(
            {
                extension: {
                    name: document.extension_form.extension_name.value,
                    type: document.extension_form.extension_type.value,
                    content: document.extension_form.extension_content.value
                }
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