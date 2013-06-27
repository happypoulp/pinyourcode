(function()
{
    var moduleName = 'views/candidate/empty';

    define([
            'templates/candidate/empty'
        ], function(EmptyResultsTemplate)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var EmptyResultsView = Backbone.View.extend({

            className: 'emptyresults',

            render: function()
            {
                this.$el.html(EmptyResultsTemplate({search: this.options.search}));
            }
        });

        return EmptyResultsView;
    });
})();