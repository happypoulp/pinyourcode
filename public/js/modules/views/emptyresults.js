(function()
{
    var moduleName = 'views/emptyresults',
        moduleDependencies = [
            'backbone',
            '/js/modules/templates/emptyresults.js'
        ];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(Backbone, EmptyResultsTemplate)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var EmptyResultsView = Backbone.View.extend({

            className: 'emptyresults',

            toHTML: function()
            {
                return EmptyResultsTemplate({search: this.options.search});
            },

            render: function()
            {
                this.$el.html(this.toHTML());

                return this;
            }
        });

        return EmptyResultsView;
    });
})();