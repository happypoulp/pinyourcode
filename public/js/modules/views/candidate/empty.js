(function()
{
    var moduleName = 'views/candidate/empty',
        moduleDependencies = [
            'templates/candidate/empty'
        ];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(EmptyResultsTemplate)
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