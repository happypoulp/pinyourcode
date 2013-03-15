(function()
{
    var moduleDependencies = [
            'pubsub'
        ],
        moduleName = 'facebook';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(PubSub)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var Facebook = function() {};

        Facebook.prototype =
        {
            init: function(readyCallback)
            {
                this.readyCallback = readyCallback;
                window.fbAsyncInit = $.proxy(this.asyncInit, this);

                (function(d){
                    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
                    if (d.getElementById(id)) {return;}
                    js = d.createElement('script'); js.id = id; js.async = true;
                    js.src = "//connect.facebook.net/en_US/all.js";
                    ref.parentNode.insertBefore(js, ref);
                }(document));
            },
            initialized: function()
            {
                return this.FbInitialized;
            },
            asyncInit: function()
            {
                var that = this;

                FB.init(
                {
                    appId      : window.FB_APP_ID, // App ID
                    channelUrl : '//' + window.FB_APP_DOMAIN + '/channel.html', // Channel File
                    status     : false, // check login status
                    cookie     : true, // enable cookies to allow the server to access the session
                    xfbml      : false  // parse XFBML
                });

                this.FbInitialized = true;
                // console.log('FB initialized');

                FB.getLoginStatus(function(response)
                {
                    // console.log('FB.getLoginStatus', response);
                    if (response.status == 'unknown')
                    {
                        // console.log('login status unknown');
                        that.subscribeToStatusChange();
                    }

                    that.sendUpdateSignal(response.status);

                    that.readyCallback();
                });
            },
            toggleLoginStatus: function()
            {
                var that = this;

                FB.getLoginStatus(function(response)
                {
                    if (response.status === 'connected')
                    {
                        that.logout();
                    }
                    else
                    {
                        that.login();
                    }
                });
            },
            login: function()
            {
                // console.log('## FB Login');
                FB.login(function(response)
                {
                    PubSub.publish('facebook:status', response.status);
                });
            },
            logout: function()
            {
                // console.log('## FB Logout');
                FB.logout(function(response)
                {
                    PubSub.publish('facebook:status', response.status);
                });
            },
            sendUpdateSignal: function(status)
            {
                PubSub.publish('facebook:status', status);
            },
            subscribeToStatusChange: function()
            {
                if (arguments.callee.done) { return; }

                arguments.callee.done = true;
                FB.Event.subscribe
                (
                    'auth.statusChange',
                    $.proxy(this.onFbStatusChange, this)
                );
            },
            onFbStatusChange: function(response)
            {
                // console.log('auth.statusChange');
                this.sendUpdateSignal(response.status);
            },
            render: function(container)
            {
                FB.XFBML.parse(container);
            },
            searchFriend: function(friend_string, callback)
            {
                if (!friend_string)
                {
                    return callback(friend_string);
                }

                FB.api(
                    {
                        // method: 'friends.get'
                        method: 'fql.query',
                        query:
                            'SELECT uid, name ' +
                                'FROM user ' +
                                    'WHERE uid IN ' +
                                    '( ' +
                                        'SELECT uid2 FROM friend WHERE uid1 = me() ' +
                                    ') ' +
                                    'AND ' +
                                    '( ' +
                                        'strpos(lower(name),"' + friend_string.toLowerCase() + '") >= 0 ' +
                                    ')'
                    },
                    function(result)
                    {
                        callback(friend_string, result);
                    }
                );
            },
            getFriendsInfos: function(friend_list, callback)
            {
                FB.api(
                    {
                        method: 'fql.query',
                        query: 'SELECT uid, name FROM user WHERE uid IN (' + friend_list.join(',') + ')'
                    },
                    callback
                );
            }
        };

        return new Facebook();
    });
})();

