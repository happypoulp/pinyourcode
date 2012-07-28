(function() {
    return {
        name: 'Main',
        handlers:
        {
            click:
            {
                fb_button: function(handlerDatas)
                {
                    var button = handlerDatas.element;
                    console.log(handlerDatas, button);
                    console.log(this);
                    // $(handlerDatas.element).append('<span class="green">#done click# </span>');
                    return false;
                },
                done_no_prop: function(handlerDatas)
                {
                    // $(handlerDatas.element).append('<span class="green">#done_no_prop click# </span>');
                    return false;
                }
            }
        },
        updateFbButton: function(text)
        {
            var button = $('#auth_button').get(0);
            button.innerHTML = text;
        },
        initFbSdk: function()
        {
            FB.init(
            {
                appId      : window.FB_APP_ID, // App ID
                channelUrl : '//' + window.FB_APP_DOMAIN + '/channel.html', // Channel File
                status     : false, // check login status
                cookie     : true, // enable cookies to allow the server to access the session
                xfbml      : false  // parse XFBML
            });

            console.log('FB initialized');

            FB.getLoginStatus(function(response)
            {
                console.log('FB.getLoginStatus', response);
                if (response.status == 'unknown')
                {
                    console.log('login status unknown');
                    window.statusChangeSubscribed = true;
                    FB.Event.subscribe(
                        'auth.statusChange',
                        function(response)
                        {
                            console.log('auth.statusChange');
                            // updateButton(response);
                        });
                }
                // updateButton(response);
            });
        },

            // var profilePicsDiv = document.getElementById('profile_pics');

            // var updateButton = function(response)
            // {
            //     console.log('updateButton', response);
            //     var button = document.getElementById('auth_button');
            //     if (response.status === 'connected')
            //     {
            //         button.innerHTML = 'Logout';
            //         button.onclick = function()
            //         {
            //             if (!window.statusChangeSubscribed)
            //             {
            //                 window.statusChangeSubscribed = true;
            //                 FB.Event.subscribe(
            //                     'auth.statusChange',
            //                     function(response)
            //                     {
            //                         console.log('auth.statusChange');
            //                         updateButton(response);
            //                     }
            //                 );
            //             }
            //             console.log('## Button Logout click');
            //             FB.logout(function(response)
            //             {
            //                 console.log('FB.logout callback', response);
            //             });
            //         };
            //     }
            //     else
            //     {
            //         button.innerHTML = 'Login';
            //         button.onclick = function()
            //         {
            //             console.log('## Button Login click');
            //             FB.login(function(response)
            //             {
            //                 console.log('FB.login callback', response);
            //                 if (response.status === 'connected')
            //                 {
            //                     console.log('User is logged in');
            //                 }
            //                 else
            //                 {
            //                     console.log('User is logged out');
            //                 }
            //             });
            //         };
            //     }
            // };

            // FB.getLoginStatus(function(response)
            // {
            //     console.log(response);
            //     if (response.status != 'connected')
            //     {
            //         profilePicsDiv.innerHTML = '<em>You are not connected</em><div class="fb-login-button" data-show-faces="false" data-width="200" data-max-rows="1"></div>';
            //         //- FB.login(function(response) {
            //         //-   if (response.authResponse) {
            //         //-     console.log('Welcome!  Fetching your information.... ');
            //         //-     FB.api('/me', function(response) {
            //         //-       console.log('Good to see you, ' + response.name + '.');
            //         //-     });

            //         //-   } else {
            //         //-     console.log('User cancelled login or did not fully authorize.');
            //         //-   }
            //         //- });
            //         FB.XFBML.parse(profilePicsDiv);
            //         return;
            //     }

            //     FB.api({ method: 'friends.get' }, function(result)
            //     {
            //         console.log('friends.get response', result);
            //         var markup = '';
            //         var numFriends = result ? Math.min(500, result.length) : 0;
            //         if (numFriends > 0)
            //         {
            //             for (var i=0; i<numFriends; i++)
            //             {
            //                 markup += (
            //                     '<fb:profile-pic size="square" ' +
            //                     'uid="' + result[i] + '" ' +
            //                     'facebook-logo="true"' +
            //                     '></fb:profile-pic>'
            //                 );
            //             }
            //         }
            //         profilePicsDiv.innerHTML = markup;
            //         FB.XFBML.parse(profilePicsDiv);
            //     });
            // });
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