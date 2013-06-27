(function()
{
    var moduleName = 'models/extension';

    define([], function()
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
            }
        });

        return ExtensionModel;
    });
})();