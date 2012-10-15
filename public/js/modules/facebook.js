// FACEBOOK MODULE

define(['jquery'], function($)
{
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
            });

            this.readyCallback();
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
                $(document).trigger('login_status_updated', [response.status]);
            });
        },
        logout: function()
        {
            // console.log('## FB Logout');
            FB.logout(function(response)
            {
                $(document).trigger('login_status_updated', [response.status]);
            });
        },
        sendUpdateSignal: function(status)
        {
            $(document).trigger('login_status_updated', [status]);
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
        conditionalCall: function(logged_callback, unlogged_callback)
        {
            FB.getLoginStatus(function(response)
            {
                if (response.status === 'connected')
                {
                    logged_callback();
                }
                else
                {
                    unlogged_callback();
                }
            });
        },
        searchFriend: function(friend_string, callback)
        {
            FB.api(
                {
                    // method: 'friends.get'
                    method: 'fql.query',
                    query: 'SELECT uid, name FROM user WHERE uid IN ' +
                        '(SELECT uid2 FROM friend WHERE uid1 = me()) AND ' +
                        'strpos(name,"' + friend_string + '") >= 0'
                },
                callback
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

    return Facebook;
});

