(function()
{
    var moduleName = 'views/friend/detail-top',
        moduleDependencies = [
            'views/generic',
            'views/extension/count',
            'templates/friend/name-and-picture'
        ];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(
        GenericView,
        ExtensionCountView,
        NameAndPictureTemplate
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

                var nameAndPict = new GenericView({template: NameAndPictureTemplate, data:{friend: that.model}});
                var extensionCount = new ExtensionCountView({collection: that.model.get('extensions')});

                var r1 = that.renderChild(nameAndPict),
                    r2 = that.renderChild(extensionCount);

                $.when.apply([r1, r2]).then(function()
                {
                    renderDeferred.resolve();
                });

                return renderDeferred;
            }
        });

        return DetailTopView;
    });
})();