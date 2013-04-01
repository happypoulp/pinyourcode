(function()
{
    var moduleDependencies = [
            'facebook',
            'views/extension'
        ],
        moduleName = 'views/list-extension';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(Facebook, ExtensionView)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ListExtensionView = Backbone.View.extend({

            tagName: 'ul',
            className: 'extensions',

            events: {},

            getHTML: function()
            {
                var frag = document.createDocumentFragment();

                this.collection.each(function(model)
                {
                    frag.appendChild(new ExtensionView({model: model}).render().el);
                });

                return frag;
            },

            render: function()
            {
                this.el.appendChild(this.getHTML());

                return this;
            },
        });

        return ListExtensionView;
    });
})();