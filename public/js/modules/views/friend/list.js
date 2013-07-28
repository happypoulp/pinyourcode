(function()
{
    var moduleName = 'views/friend/list',
        facebook = 'facebook';

    define([
            facebook,
            'views/friend/item'
        ], function(Facebook, FriendView)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ListView = Backbone.View.extend({

            name: moduleName,

            tagName: 'ul',
            className: 'friends_list',

            events: {},

            render: function()
            {
                var that = this,
                    renderDeferred = $.Deferred(),
                    renderPromises = [];

                this.collection.each(function(model)
                {
                    renderPromises.push(that.renderChild(new FriendView({model: model})));
                });

                $.when.apply($, renderPromises).then(function()
                {
                    renderDeferred.resolve();
                });

                return renderDeferred;
            }
        });

        return ListView;
    });
})();