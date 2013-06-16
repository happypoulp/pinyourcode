(function()
{
    var moduleName = 'views/friend/detail-top',
        moduleDependencies = [
            'models/friend',
            'collections/extensions',
            'templates/friend/detail-top'
        ];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(
        FriendModel,
        ExtensionsCollection,
        DetailTemplate
    )
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var DetailTopView = Backbone.View.extend(
        {
            name: moduleName,

            render: function()
            {
                var renderDeferred = $.Deferred(),
                    that = this;

                log(moduleName, 'render');

                var DetailTopView = new DetailTopView({friend: that.model});

                var r1 = that.renderChild(DetailTopView);

                $.when(r1).then(function()
                {
                    renderDeferred.resolve();
                });

                return renderDeferred;
            },

            updateExtensionsCounter: function()
            {
                $('.extensions_count').html(this.model.get('extensions').length);
            },

            initialize: function(options)
            {
                friend.get('extensions').on('add', $.proxy(that.updateExtensionsCounter, this));
                friend.get('extensions').on('remove', $.proxy(that.updateExtensionsCounter, this));
            }
        });

        return DetailTopView;
    });
})();