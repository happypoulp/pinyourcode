(function(w)
{
    var moduleDependencies = [],
        moduleName = 'pubsub';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(function()
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var subscribers = {},
            instance = null,
            PubSub = function() {};

        PubSub.prototype = {
            subscribe: function(message, handler, context)
            {
                (subscribers[message] = subscribers[message] || []).push([context || w, handler]);

                return this;
            },
            unsubscribe: function(message, handler)
            {
                for (var l = (subscribers[message] || []).length, i = l - 1 ; i >= 0 ; i--)
                {
                    if (handler === subscribers[message][i][1])
                    {
                        subscribers[message].splice(i, 1);
                    }
                }

                return this;
            },
            publish: function(message)
            {
                for (var i = 0, l = (subscribers[message] || []).length ; i < l ; i++)
                {
                    subscribers[message][i][1].apply(subscribers[message][i][0], Array.prototype.slice.call(arguments, 1));
                }

                return this;
            }
        };

        return new PubSub();
    });
})(window);
