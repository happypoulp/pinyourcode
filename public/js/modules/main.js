(function() {

    /////////////////////////////////////////// FACEBOOK CLASS

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
        sendUpdateSignal: function(status)
        {
            $(document).trigger('update_login_button', [status]);
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
            that.sendUpdateSignal(response.status);
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

    /////////////////////////////////////////// EXTENSION API CLASS

    var ExtensionAPI = function()
    {
        this.baseURI = '/friends';
    };

    ExtensionAPI.prototype =
    {
        create: function(fb_id, callback)
        {
            Nj.Ajax.call({
                href: this.baseURI,
                method: 'post',
                callback: callback,
                params: {
                    fb_id: fb_id
                }
            });
        },
        read: function(fb_id, callback)
        {
            if (fb_id)
            {
                // get user infos
                Nj.Ajax.call({
                    href: this.baseURI + '/' + fb_id,
                    method: 'get',
                    callback: callback
                });
            }
            else
            {
                // get user list

                Nj.Ajax.call({
                    href: this.baseURI,
                    method: 'get',
                    callback: callback
                });
            }
        },
        update: function(fb_id, data, callback)
        {
            Nj.Ajax.call({
                href: this.baseURI + '/' + fb_id,
                method: 'post',
                callback: callback,
                params: {
                    _method: 'put'
                }
            });
        },
        delete: function(fb_id, callback)
        {
            Nj.Ajax.call({
                href: this.baseURI + '/' + fb_id,
                method: 'post',
                callback: callback,
                params: {
                    _method: 'delete'
                }
            });
        }
    };

    ///////////////////////////////////////////////////////// MAIN MODULE

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
                ,add_friend: function(handlerDatas)
                {
                    $('#add_friend_container').toggle();
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
                        this.api.create(
                            uid,
                            {
                                module: 'Main',
                                method: 'addFriendCallback'
                            }
                        );
                    }
                    else
                    {
                        this.api.delete(
                            uid,
                            {
                                module: 'Main',
                                method: 'removeFriendCallback'
                            }
                        );
                    }

                    return false;
                }
            },
            keyup:
            {
                friend_search: function(handlerDatas)
                {
                    clearTimeout(this.inputTO);

                    this.inputTO = setTimeout($.proxy(function()
                    {
                        console.log('search', $(handlerDatas.element).val());
                        this.facebook.searchFriend($(handlerDatas.element).val(), $.proxy(this.searchFriendCallback, this));
                    }, this), 150);

                    return false;
                }
            },
            facebook:
            {
                update_login_button: function(event, status)
                {
                    var text = 'Login',
                        className = 'login';

                    if (status === 'connected')
                    {
                        text = 'Logout';
                        className = 'logout';
                    }

                    this.getFbButton().removeClass('login logout').addClass(className).html(text);
                }
            }
        },
        ////////////////////////////////////////////////////// CALLBACKS
        searchFriendCallback: function(result)
        {
            console.log('friends.get response', result);
            var markupArray = [],
                numFriends = result ? result.length : 0;

            if (numFriends > 0)
            {
                for (var i=0; i<numFriends; i++)
                {
                    markupArray.push(this.getFriendHtml(i, result[i].uid, result[i].name));
                }
            }

            this.getFriendsContainer().html(markupArray.join(''));

            this.facebook.render(this.getFriendsContainer().get(0));
        },
        getFriendsCallback: function(result, datas)
        {
            console.log('getFriendsCallback', result);
            var friends_html = result.length ? '' : 'No friends yet...',
                friends_ids = [];

            for (var i = result.length - 1; i >= 0; i--)
            {
                friends_html += this.getFriendHtml(i, result[i].fb_id, '', true);
                friends_ids.push(result[i].fb_id);
            }

            // console.log(friends_ids);
            this.facebook.getFriendsInfos(friends_ids, $.proxy(this.getFriendsInfosCallback, this));

            $('#friends_list').html(friends_html);

            this.facebook.render($('#friends_list').get(0));
        },
        getFriendsInfosCallback: function(result)
        {
            for (var i = result.length - 1; i >= 0; i--)
            {
                var friend_element = $('div[data-uid="' + result[i].uid + '"]');
                friend_element.find('span.name').html(result[i].name);
            }
        },
        addFriendCallback: function(result, datas)
        {
            console.log('addFriendCallback');
        },
        removeFriendCallback: function(result, datas)
        {
            console.log('removeFriendCallback');
        },
        //////////////////////////////////////////////// UTILITY FUNCTIONS
        printUnloggedMessage: function()
        {
            this.getFriendsContainer().html('<em>You are not connected</em>');
        },
        loadFbFriends: function()
        {
            var that = this;

            this.facebook.listFriends();
        },
        getFriendHtml: function(index, fb_id, name, active)
        {
            return '<div data-click="Main.select_friend" data-uid="' + fb_id + '"class="fb_friend ' + (index%2 ? 'odd' : 'even') + '">'+
                        '<span class="checkbox_container">'+
                            '<input type="checkbox" ' + (active ? 'checked="checked"' : '') + '/>'+
                        '</span>'+
                        '<div class="profile_pic"><fb:profile-pic size="square" uid="' + fb_id + '" facebook-logo="true"></fb:profile-pic></div>'+
                            '<span class="name">' + name + '</span>' +
                    '</div>';
        },
        //////////////////////// DOM ELEMENTS GETTERS
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
        //////////////////////////////////////////////////// INIT
        init: function()
        {
            Nj.Modules.register(this);

            $(document).bind('update_login_button', $.proxy(this.handlers.facebook.update_login_button, this));

            var that = this;

            this.facebook = new Facebook();
            this.facebook.init(function()
            {
                that.api = new ExtensionAPI();
                that.api.read(
                    null,
                    {
                        module: 'Main',
                        method: 'getFriendsCallback'
                    }
                );
            });
        }
    }.init();
})();