(function()
{
    var moduleName = 'views/extension/list',
        facebook = 'facebook';

    define([
            facebook,
            'views/extension/item'
        ], function(Facebook, ExtensionView)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ListExtensionView = Backbone.View.extend({

            tagName: 'ul',
            className: 'extensions',

            events: {},

            render: function()
            {
                var that = this
                    , renderDeferred = $.Deferred()
                    , friend = this.collection.friend
                    , renderPromises = [];

                this.collection.each(function(model)
                {
                    model.friend_id = friend.id;
                    renderPromises.push(that.renderChild(new ExtensionView({model: model, friend: friend})));
                });

                $.when.apply($, renderPromises).then(function()
                {
                    renderDeferred.resolve();
                });

                return renderDeferred;
            },

            add: function(extension)
            {
                log(moduleName, 'Update extension list', extension);
                this.renderChild(new ExtensionView({model: extension, friend: this.collection.friend}), {meth: 'append', target: '.extensions'});
            },

            beforeRemove: function(options)
            {
                this.collection.off('add', this.getAddProxy());

                return this;
            },

            getAddProxy: function()
            {
                return this.addProxy || (this.addProxy = $.proxy(this.add, this));
            },

            initialize: function()
            {
                this.collection.on('add', this.getAddProxy());
            }
        });

        return ListExtensionView;
    });
})();