(function()
{
    var moduleDependencies = [
            'backbone',
            'facebook',
            'views/friend',
            '/js/modules/templates/list.js'
        ],
        moduleName = 'views/list';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(Backbone, Facebook, FriendView, ListTemplate)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ListView = Backbone.View.extend({

            events: {},

            toHTML: function()
            {
                var htmlArray = [],
                    that = this;

                this.collection.each(function(model)
                {
                    htmlArray.push(new FriendView({model: model, el: that.$el}).toHTML());
                });

                return ListTemplate({listContent: htmlArray.join('')});
            },

            render: function()
            {
                this.$el.html(this.toHTML());
                Facebook.render(this.el);

                return this;
            }
        });

        return ListView;
    });
})();