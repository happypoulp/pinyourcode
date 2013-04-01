(function()
{
    var moduleName = 'collections/extensions',
        moduleDependencies = [
            'models/extension'
        ];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(ExtensionModel)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ExtensionsCollection = Backbone.Collection.extend(
        {
            model: ExtensionModel,
            url: function()
            {
                return '/api/friends/' + this.friend_id + '/extensions';
            }
        });

        return ExtensionsCollection;
    });
})();
