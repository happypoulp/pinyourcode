(function()
{
    var moduleName = 'views/generic';

    define([], function()
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var GenericView = Backbone.View.extend(
        {
            name: moduleName,

            render: function()
            {
                this.$el.html(this.options.template(this.options.data));
            }
        });

        return GenericView;
    });
})();