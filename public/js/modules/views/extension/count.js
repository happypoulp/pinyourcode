(function()
{
    var moduleName = 'views/friend/extension-count';

    define([
            'templates/extension/count'
        ], function(
        CountTemplate
    )
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ExtensionCountView = Backbone.View.extend(
        {
            name: moduleName,

            render: function()
            {
                this.$el.html(CountTemplate({extensions: this.collection}));
            },

            beforeRemove: function(options)
            {
                this.collection.off('add remove', this.getRenderProxy());

                return this;
            },

            getRenderProxy: function()
            {
                return this.renderProxy || (this.renderProxy = $.proxy(this.render, this));
            },

            initialize: function(options)
            {
                this.collection.on('add remove', this.getRenderProxy());
            }
        });

        return ExtensionCountView;
    });
})();