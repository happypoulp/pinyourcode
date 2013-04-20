debuglog(true);

require.config({
    paths: {
        underscore: '/js/libs/underscore-min',
        backbone: '/js/libs/backbone-dev'
        // backbone: '/js/libs/backbone-min'
    },
    shim: {
        'backbone': {
            deps: ['underscore'],
            exports: 'Backbone'
        }
    }
});

log('main', 'require "application" and "backbone"');

require(['backbone'], function()
{
    // Extending Backbone View to handle child view (add and remove)
    Backbone.View = Backbone.View.extend(
    {
        children: {},
        add: function(child)
        {
            this.children[child.cid] = child;

            return this;
        },
        remove: (function()
        {
            var _remove = Backbone.View.prototype.remove;

            return function()
            {
                for (child in children)
                {
                    child.remove();
                }

                _remove.apply(this, arguments);

                return this;
            }

        })()
    });

    require(['application'], function(Application)
    {
        log('main', 'Application.initialize');
        Application.initialize();
    });
});