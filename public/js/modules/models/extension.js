(function()
{
    var moduleName = 'models/extension',
        moduleDependencies = [];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function()
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ExtensionModel = Backbone.Model.extend({

            idAttribute: '_id',

            urlRoot: function()
            {
                return '/api/friends/' + this.friend_id + '/extensions';
            },

            defaults: {
                name: '',
                tags: [],
                content: ''
            },

            initialize: function(options)
            {
                this.friend_id = options.friend_id;
            }

        });

        return ExtensionModel;
    });
})();