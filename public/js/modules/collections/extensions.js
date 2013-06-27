(function()
{
    var moduleName = 'collections/extensions';

    define([
            'models/extension'
        ], function(ExtensionModel)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ExtensionsCollection = Backbone.Collection.extend(
        {
            model: ExtensionModel,

            url: function()
            {
                console.log('COLLECTION URL called', this.options, this.options.friend_id);
                return '/api/friends/' + this.options.friend_id + '/extensions';
            },

            initialize: function(models, options)
            {
                this.friend = options.friend;
            }
        });

        return ExtensionsCollection;
    });
})();
