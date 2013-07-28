// debuglog(true);

log('main', 'require "application"');

Backbone.renderTreeUID = 0;

Backbone.Renderer = function()
{
    this.trees = {};
    this.postRenderer = new Backbone.postRenderer();
};
Backbone.Renderer.prototype =
{
    add: function(view, how)
    {
        log('Renderer', 'add', view.name, view.cid, 'with parent:', view.parent.name);
        // get a renderId
        var renderId = view.parent.renderId || ++Backbone.renderTreeUID, // get renderId from parent or a new one
            that = this;

        if (this.trees[renderId] && this.trees[renderId].rendered)
        {
            log('Renderer', 'parent renderTree has already been rendered, get a new one.');
            renderId = ++Backbone.renderTreeUID;
        }

        // This render tree does not exist
        if (!this.trees[renderId])
        {
            log('Renderer', 'No render tree for renderId', renderId, 'build new tree.');
            // Create a new one
            this.trees[renderId] = {
                rendered: false,
                fragment: document.createDocumentFragment(),
                initiatorCid: view.parent.cid
            }
        }

        // attach the renderId to the view
        view.renderId = renderId;

        // Register postRender if any
        if (view.postRender)
        {
            this.postRenderer.register(view);
        }

        log('Renderer', 'current renderId', renderId);

        var pPender = view.render();

        log('Renderer', 'render', view.name, 'called. return value:', pPender);

        if (!view.el.parentNode)
        {
            log('Renderer', view.name, 'element has no parentNode');
            if (view.parent.cid == this.trees[view.renderId].initiatorCid)
            {
                log('Renderer', '### TOP level child', view.name, '. Put', view.el, 'in a fragment for later appending');
                this.trees[view.renderId].fragment.appendChild(view.el);
            }
            else
            {
                log('Renderer', '### LOWER level child', view.name, '. Appending', view.el, 'to parent', view.parent);
                view.parent.$el.append(view.el);
            }

            $.when(pPender).then(function()
            {
                log('Renderer', '!!!!!!!!!!! promise fulfilled for', view.name, view.renderId);
                if (that.trees[view.renderId] && view.parent.cid == that.trees[view.renderId].initiatorCid)
                {
                    if (window.reloading) return;

                    log('Renderer', '**************************************', view.el);
                    if (how)
                    {
                        log('Renderer', '************************************** HOW', how);
                        $(how.target)[how.meth](that.trees[view.renderId].fragment);
                    }
                    else
                    {
                        view.parent.$el.append(that.trees[view.renderId].fragment);
                    }

                    that.postRenderer.run(view.renderId);

                    that.trees[view.renderId].rendered = true;
                    delete(that.trees[view.renderId].fragment);
                }
            });
        }
        else
        {
            log('Renderer', view.name, 'element is already attached');
        }

        return pPender;
    }
};

Backbone.postRenderer = function() {};
Backbone.postRenderer.prototype =
{
    postRenderRegistry: {},
    register: function(view)
    {
        if (!this.postRenderRegistry[view.renderId])
        {
            this.postRenderRegistry[view.renderId] = {};
        }
        this.postRenderRegistry[view.renderId][view.cid] = view;
    },
    remove: function(view)
    {
        if (this.postRenderRegistry[view.renderId] && this.postRenderRegistry[view.renderId][view.cid])
        {
            delete(this.postRenderRegistry[view.renderId][view.cid]);
        }
    },
    run: function(renderId)
    {
        if (!this.postRenderRegistry[renderId]) return;

        var v;
        for (viewCid in this.postRenderRegistry[renderId])
        {
            this.postRenderRegistry[renderId][viewCid].postRender();
        }
    }
};

window.renderer = new Backbone.Renderer();

// Extending Backbone View to handle child views (add and remove)
Backbone.View = Backbone.View.extend(
{
    renderChild: function(child, how)
    {
        log('Main', 'renderChild', child.cid, child.name);
        child.parent = this;

        var that = this;

        if (!this.children) this.children = [];

        this.children.push(child);

        return renderer.add(child, how);
    },
    beforeRemoveChildren: function()
    {
        log('Main', 'beforeRemoveChildren', this.cid, this.name);

        if (!this.children || !this.children.length)
        {
            log('Main', this.cid, 'no child to remove');
            return this;
        }

        for (var i = 0, l = this.children.length; i < l ; i++)
        {
            var child = this.children[i];

            if (child.permanent)
            {
                log('Main', child.cid, 'is permanent. Skip pre-remove process.');
                continue;
            }

            log('Main', this.cid, 'clean child', child.cid, child.name);
            child
                .beforeRemoveChildren()
                .beforeRemove()
                .undelegateEvents();
        }

        return this;
    },
    beforeRemove: function()
    {
        // override me for model + collection events cleaning
        return this;
    },
    clean: function()
    {
        log('Main', 'clean', this.cid, this.name);

        this.beforeRemoveChildren();
        delete(this.children);

        return this;
    },
    remove: (function()
    {
        var _remove = Backbone.View.prototype.remove;

        return function()
        {
            if (this.permanent)
            {
                log('Main', this.cid, 'is permanent. Cannot remove it.');
                return;
            }

            this.beforeRemoveChildren();

            if (this.parent && this.parent.children)
            {
                this.parent.children.splice(this.parent.children.indexOf(this), 1);
            }

            _remove.apply(this, arguments);

            return this;
        }

    })()
});

(function()
{
    var overwriter = function(classBase, property)
    {
        var _property = classBase.prototype[property];

        return function()
        {
            this.on('sync error', function()
            {
                if (app.needReload())
                {
                    window.reloading = true;
                    app.reload();
                }
            });

            _property.apply(this, arguments);

            return this;
        }
    };

    Backbone.Model = Backbone.Model.extend({
        initialize: overwriter(Backbone.Model, 'initialize')
    });

    Backbone.Collection = Backbone.Collection.extend({
        initialize: overwriter(Backbone.Collection, 'initialize')
    });
})();

require(['application'], function(Application)
{
    log('main', 'Application.initialize');
    Application.initialize();
});
