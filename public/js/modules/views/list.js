(function()
{
    var moduleDependencies = [
            'backbone',
            'facebook',
            'views/friend'
        ],
        moduleName = 'views/list';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(Backbone, Facebook, FriendView)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ListView = Backbone.View.extend({

            tagName: 'ul',
            className: 'friends_list',

            events: {},

            getHTML: function()
            {
                var frag = document.createDocumentFragment();

                this.collection.each(function(model)
                {
                    frag.appendChild(new FriendView({model: model}).render().el);
                });

                return frag;
            },

            render: function()
            {
                this.el.appendChild(this.getHTML());

                return this;
            },

            postRender: function()
            {
                Facebook.render(this.el);
            }
        });

        return ListView;
    });
})();