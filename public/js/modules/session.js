(function(w)
{
    var moduleDependencies = [
            'pubsub',
            'facebook'
        ],
        moduleName = 'session';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(PubSub, Facebook)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var Session = function()
            {
                PubSub.subscribe('facebook:status', this.onFacebookStatus, this);
            },
            _logged = false; // private

        Session.prototype =
        {
            logged: function()
            {
                return _logged;
            },

            requireAuth: function(successCallback)
            {
                if (_logged) successCallback();
                else PubSub.publish('session:status', _logged);
            },

            toggleLoginStatus: function(status)
            {
                Facebook.toggleLoginStatus();
            },

            onFacebookStatus: function(status)
            {
                _logged = status == 'connected';
                PubSub.publish('session:status', _logged);
                log(moduleName, "onFacebookStatus - reader is logged?", _logged)
            }
        };

        return new Session();
    });
})(window);
