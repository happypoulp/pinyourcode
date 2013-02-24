(function(w)
{
    define(function()
    {
        var subscribers = {},
            instance = null,
            DM_PubSub = function() {};

        DM_PubSub.prototype = {
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

        return new DM_PubSub();
    });
})(window);
