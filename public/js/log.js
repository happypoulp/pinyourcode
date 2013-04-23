(function(w)
{
    var logs = [],
        debug = {},
        Logger = function() {},
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
        },
        clearLogInterval = 1000*60*60*2, // 2 hours
        clear = function()
        {
            logs = [];
            log('Logger', '##### Cleared logs #####')
        };

    Logger.prototype = {
        show: function(context)
        {
            var contextRe = new RegExp(context || '');

            for (var i = 0, l = logs.length; i < l; i++)
            {
                if (context && contextRe.test(logs[i][1])) print.apply(w, logs[i]);
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
    var logger = new Logger();
    w.log = logger.log;
    w.showlog = logger.show;
    w.debuglog = logger.setDebug;
    // Security to avoid logging until browser runs out of memory: We clear logs every 2 hours
    setInterval(clear, clearLogInterval);
})(window);

