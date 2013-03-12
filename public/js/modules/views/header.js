(function()
{
    var moduleDependencies = [
            'jquery',
            'backbone',
            'facebook'
        ],
        moduleName = 'views/header';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function($, Backbone, Facebook)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var HeaderView = Backbone.View.extend(
        {
            // el: $('header'),
        
            // events: {
            //     'click li.fb_friend': 'showFriendDetails'
            // },

            initialize: function()
            {
                PubSub.subscribe('facebook:status', function(status)
                {
                    log(moduleName, "facebook:status", status);
                });
            },

            render: function()
            {

            }
        });

        return HeaderView;
    });
})();