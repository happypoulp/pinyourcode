(function()
{
    var moduleName = 'views/list-extension',
        moduleDependencies = [
            'facebook',
            'views/extension'
        ];

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
                var frag = document.createDocumentFragment(),
                    that = this;

                console.log(that);

                this.collection.each(function(model)
                {
                    model.friend_id = that.options.friend_id;

                    frag.appendChild(new ExtensionView({model: model, friend_id: that.options.friend_id}).render().el);
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