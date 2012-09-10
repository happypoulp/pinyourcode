(function() {
    var Connection = function(){};

    return {
        name: 'Main',
        handlers:
        {
            click:
            {
                fb_button: function(handlerDatas)
                {
                    if (!this.FbInitialized)
                    {
                        return;
                    }

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
                ,get_friends: function(handlerDatas)
                {
                    var that = this;

                    Nj.Ajax.call({
                        href: '/friends',
                        method: 'get',
                        callback: {
                            module: that,
                            method: 'getFriendsCallback'
                        }
                    });
                }
                ,select_friend: function(handlerDatas)
                {
                    var el = $(handlerDatas.element),
                        uid = el.data('uid'),
                        input = el.find('input'),
                        that = this,
                        add_friend = true;

                    if (input.attr('checked'))
                    {
                        input.attr('checked', null);
                        add_friend = false;
                    }
                    else
                    {
                        input.attr('checked', 'checked');
                    }

                    if (add_friend)
                    {
                        Nj.Ajax.call({
                            href: '/friends',
                            method: 'post',
                            callback: {
                                module: that,
                                method: 'addFriendCallback'
                            },
                            params: {
                                fb_id: uid
                            }
                        });
                    }
                    else
                    {
                        Nj.Ajax.call({
                            href: '/friends/' + uid,
                            method: 'post',
                            callback: {
                                module: that,
                                method: 'removeFriendCallback'
                            },
                            params: {
                                _method: 'delete'
                            }
                        });
                    }

                    return false;
                }
                // ,get_fb_friends: function(handlerDatas)
                // {
                //     if (!this.FbInitialized)
                //     {
                //         return;
                //     }

                //     this.buildFbFriendList();

                //     return false;
                // }
            }
        },
        getFriendsCallback: function(result, datas)
        {
            console.log(result);

            var friends_html = 'No friends yet';

            if (result.length)
            {
                friends_html = '';
            }
            else
            {
                $('#add_friend_container').show();
                this.buildFbFriendList();
            }

            for (var i = result.length - 1; i >= 0; i--)
            {
                var className = i%2 ? 'odd' : 'even';
                friends_html += 
                    '<div data-click="Main.select_friend" data-uid="' + result[i].fb_id + '"class="fb_friend ' + className + '">'+
                        '<span class="checkbox_container">'+
                            '<input type="checkbox" checked="checked" />'+
                        '</span>'+
                        '<fb:profile-pic size="square" uid="' + result[i].fb_id + '" facebook-logo="true"></fb:profile-pic>'+
                    '</div>';
            }

            $('#friends_list').html(friends_html);
            FB.XFBML.parse($('#friends_list').get(0));
        },
        addFriendCallback: function(result, datas)
        {
            console.log('addFriendCallback');
        },
        removeFriendCallback: function(result, datas)
        {
            console.log('removeFriendCallback');
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
                this.friendsContainer = $('#fb_friends_list');
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
                $.proxy(this.onFbStatusChange, this)
            );
        },
        onFbStatusChange: function(response)
        {
            // console.log('auth.statusChange');
            this.updateFbButton(response.status);
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

                that.updateFbButton(response.status);
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
                    var markupArray = [],
                        numFriends = result ? result.length : 0;

                    if (numFriends > 0)
                    {
                        for (var i=0; i<numFriends; i++)
                        {
                            var className = i%2 ? 'odd' : 'even';
                            markupArray.push(
                                '<div data-click="Main.select_friend" data-uid="' + result[i] + '"class="fb_friend ' + className + '">'+
                                    '<span class="checkbox_container">'+
                                        '<input type="checkbox" />'+
                                    '</span>'+
                                    '<fb:profile-pic size="square" uid="' + result[i] + '" facebook-logo="true"></fb:profile-pic>'+
                                '</div>'
                            );
                        }
                    }

                    that.getFriendsContainer().html(markupArray.join(''));

                    FB.XFBML.parse(that.getFriendsContainer().get(0));
                }
            );
        },
        buildFbFriendList: function()
        {
            console.log('buildFbFriendList');
            if (!this.FbInitialized)
            {
                return;
            }
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