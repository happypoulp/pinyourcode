(function(w)
{
    var logs = [],
        debug = {},
        DM_Log = function() {},
        print = function()
        {
            try
            {
                console.log.apply(console, arguments);
            }
            catch(e)
            {
                try
                {
                    opera.postError.apply(opera, arguments);
                }
                catch(e)
                {
                    alert(Array.prototype.join.call( arguments, " " ));
                }
            }
        };

    DM_Log.prototype = {
        show: function(context)
        {
            for (var i = 0, l = logs.length; i < l; i++)
            {
                if (!context)
                {
                    print.apply(w, logs[i]);
                    continue;
                }
                if (context && logs[i][1] == context)
                {
                    print.apply(w, logs[i]);
                }
            }
        },
        setDebug: function(bool, context)
        {
            debug[context || '---'] = bool;
        },
        // Arguments : context, log1, log2, ...
        log: function(context)
        {
            var _context = context,
                argsIndex = 1;

            // If there is only one argument or less, we suppose that no context has been given
            if (arguments.length <= 1)
            {
                _context = arguments.length <= 1 ? '---' : context;
                argsIndex = 0;
            }

            var log = [new Date(), _context].concat(Array.prototype.slice.call(arguments, argsIndex));

            if (debug[_context] || debug['---']) print.apply(w, log);

            return logs.push(log);
        }
    };

    if (w.log)
    {
        return;
    }
    dmlog = new DM_Log();
    w.log = dmlog.log;
    w.showlog = dmlog.show;
    w.debuglog = dmlog.setDebug;
})(window);

