(function() {
    return {
        name: 'Main',
        handlers:
        {
            click:
            {
                fb_button: function(handlerDatas)
                {
                    var button = $(handlerDatas.element),
                        that = this;

                    if (button.hasClass('logout'))
                    {
                        // console.log('## Button Logout click');
                        FB.logout(function(response)
                        {
                            that.updateFbButton(response.status);
                        });
                    }
                    else
                    {
                        // console.log('## Button Login click');
                        FB.login(function(response)
                        {
                            // console.log('FB.login callback', response);
                            that.updateFbButton(response.status);
                        });
                    }

                    return false;
                }
            }
        },
        getFbButton: function()
        {
            if (!this.fbButton)
            {
                this.fbButton = $('#auth_button');
            }
            return this.fbButton;
        },
        getFriendsContainer: function()
        {
            if (!this.friendsContainer)
            {
                this.friendsContainer = $('#profile_pics');
            }
            return this.friendsContainer;
        },
        updateFbButton: function(status)
        {
            var text = 'Login',
                className = 'login';

            if (status === 'connected')
            {
                text = 'Logout';
                className = 'logout';
            }

            this.getFbButton().removeClass('login logout').addClass(className).html(text);
        },
        subscribeToStatusChange: function()
        {
            if (arguments.callee.done)
            {
                return;
            }

            arguments.callee.done = true;
            FB.Event.subscribe
            (
                'auth.statusChange',
                this.onFbStatusChange
            );
        },
        onFbStatusChange: function(respoonse)
        {
            // console.log('auth.statusChange');
            that.updateFbButton(response.status);
        },
        initFbSdk: function()
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

            // console.log('FB initialized');

            FB.getLoginStatus(function(response)
            {
                // console.log('FB.getLoginStatus', response);
                if (response.status == 'unknown')
                {
                    // console.log('login status unknown');
                    that.subscribeToStatusChange();
                }

                that.updateFbButton(response.status);
                that.buildFbFriendList();
            });
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
        printUnloggedMessage: function()
        {
            this.getFriendsContainer().html('<em>You are not connected</em>');
        },
        loadFbFriends: function()
        {
            var that = this;

            FB.api({ method: 'friends.get' }, function(result)
                {
                    console.log('friends.get response', result);
                    var markup = '';
                    var numFriends = result ? Math.min(500, result.length) : 0;
                    if (numFriends > 0)
                    {
                        for (var i=0; i<numFriends; i++)
                        {
                            markup += (
                                '<fb:profile-pic size="square" ' +
                                'uid="' + result[i] + '" ' +
                                'facebook-logo="true"' +
                                '></fb:profile-pic>'
                            );
                        }
                    }

                    that.getFriendsContainer().html(markup);

                    FB.XFBML.parse(that.getFriendsContainer().get(0));
                }
            );
        },
        buildFbFriendList: function()
        {
            this.conditionalCall($.proxy(this.loadFbFriends, this), $.proxy(this.printUnloggedMessage, this));
        },
        loadFbSdk: function()
        {
            window.fbAsyncInit = $.proxy(this.initFbSdk, this);

            (function(d){
                var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement('script'); js.id = id; js.async = true;
                js.src = "//connect.facebook.net/en_US/all.js";
                ref.parentNode.insertBefore(js, ref);
            }(document));
        },
        init: function()
        {
            Nj.Modules.register(this);

            this.loadFbSdk();
        }
    }.init();
})();