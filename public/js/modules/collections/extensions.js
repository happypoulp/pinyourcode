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
                console.log('COLLECTION URL called', this.options, this.options.friend_id);
                return '/api/friends/' + this.options.friend_id + '/extensions';
            }
        });

        return ExtensionsCollection;
    });
})();
