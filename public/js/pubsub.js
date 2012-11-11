(function(w)
{
    var subscribers = {},
        DM_PubSub = function() {};

    DM_PubSub.prototype = {
        subscribe: function(message, handler, context)
        {
            (subscribers[message] = subscribers[message] || []).push([context || w, handler]);
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
        },
        publish: function(message)
        {
            for (var i = 0, l = (subscribers[message] || []).length ; i < l ; i++)
            {
                subscribers[message][i][1].apply(subscribers[message][i][0], Array.prototype.slice.call(arguments, 1));
            }
        }
    };

    // PubSub is a unique instance of DM_PubSub
    w.PubSub = w.PubSub || new DM_PubSub();
})(window);
