(function()
{
    var moduleDependencies = [
            'jquery',
            'router',
            'facebook'
        ],
        moduleName = 'application';

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function($, Router, Facebook)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var Application = function() {};

        Application.prototype =
        {
            initialize: function()
            {
                log(moduleName, 'initialize');

                var that = this;

                $(function()
                {
                    log(moduleName, 'Facebook.init');
                    // that.initHandlers();
                    Facebook.init(function()
                    {
                        log(moduleName, 'Facebook.init - DONE');
                        log(moduleName, 'Router.initialize');
                        Router.initialize();
                    });

                });

            }
    //         initHandlers: function()
    //         {
    //             $(document)
    //                 .bind('login_status_updated', $.proxy(this.handlers.facebook.login_status_updated, this))
    //                 .on('click', 'button.js-add_fb_friend', $.proxy(this.handlers.click.add_friend, this))
    //                 .on('click', 'button.js-auth_button', $.proxy(this.handlers.click.fb_button, this))
    //                 .on('click', 'button.js-back_button', $.proxy(this.handlers.click.back_button, this))
    //                 .on('mouseup', 'div.fb_friend', $.proxy(this.handlers.click.select_friend, this))
    //                 .on('keyup', '#add_friend_form input[name="friend_name"]', $.proxy(this.handlers.keyup.friend_search, this))
    //                 .on('submit', 'form.add_extension_form', $.proxy(this.handlers.submit.add_extension, this))
    //                 .on('submit', '#add_friend_form', function(ev){ev.preventDefault()});
    //         },
    //         handlers:
    //         {
    //             click:
    //             {
    //                 fb_button: function(ev)
    //                 {
    //                     if (!this.facebook.initialized())
    //                     {
    //                         return;
    //                     }

    //                     this.facebook.toggleLoginStatus();
    //                 }
    //                 ,add_friend: function(ev)
    //                 {
    //                     $('#friends_list').toggle();
    //                     $('#add_friend_form').toggle().children('input').focus();
    //                 }
    //                 ,back_button: function(ev)
    //                 {
    //                     $('#pages').removeClass('show_friend_details');
    //                     $('button.js-back_button').hide();
    //                     $('button.js-add_fb_friend').show();
    //                 }
    //                 ,select_friend: function(ev)
    //                 {
    //                     var friend_source = $(ev.target).closest('.fb_friend'),
    //                         friend_id = friend_source.data('uid');
    //                     $('#friend_details_inner').html(friend_source.html()).parent().attr('data-uid', friend_id);
    //                     $('form.add_extension_form').attr('action', '/friends/' + friend_id);
    //                     $('#pages').addClass('show_friend_details');
    //                     $('button.js-back_button').show();
    //                     $('button.js-add_fb_friend').hide();
    //                     window.scrollTo(0,0);

    //                     for (var i = 0 , l = this.friends.length ; i < l ; i++)
    //                     {
    //                         if (this.friends[i].fb_id == friend_id)
    //                         {
    //                             $('#friend_details_inner').append(this.getExtensionsHtml(this.friends[i].extensions));
    //                             break;
    //                         }
    //                     }

    //                     if (friend_source.closest('#fb_search_results').length)
    //                     {
    //                         this.api.create(friend_id);
    //                     }

    //                     // if ($(ev.target).parent('form').length) return;

    //                     // var el = $(ev.target).closest('[data-uid]'),
    //                     //     uid = el.data('uid'),
    //                     //     that = this;

    //                     // if (!el.find('input.extended').prop('checked'))
    //                     // {
    //                     //     this.api.create(uid, function()
    //                     //     {
    //                     //         that.addFriendCallback(uid);
    //                     //     });
    //                     // }
    //                     // else
    //                     // {
    //                     //     // this.api.delete(uid, function()
    //                     //     // {
    //                     //     //     that.removeFriendCallback(uid);
    //                     //     // });
    //                     //     $('div.viewport_inner').toggleClass('show-right');
    //                     // }
    //                 }
    //             }
    //             ,keyup:
    //             {
    //                 friend_search: function(ev)
    //                 {
    //                     var that = this;
    //                     clearTimeout(this.inputTO);

    //                     that.inputTO = setTimeout($.proxy(function()
    //                     {
    //                         var search = $(ev.target).val();
    //                         console.log('search', search);
    //                         this.facebook.searchFriend(search, $.proxy(this.searchFriendCallback, this));
    //                     }, that), 150);
    //                 }
    //             }
    //             ,facebook:
    //             {
    //                 login_status_updated: function(ev, status)
    //                 {
    //                     var text = 'Login',
    //                         className = 'login';

    //                     if (status === 'connected')
    //                     {
    //                         text = 'Logout';
    //                         className = 'logout';
    //                         this.initPageContent();
    //                     }
    //                     else
    //                     {
    //                         this.clearPageContent();
    //                     }

    //                     this.getFbButton().removeClass('login logout').addClass(className).html(text).show();
    //                 }
    //             }
    //             ,submit:
    //             {
    //                 add_extension: function(ev)
    //                 {
    //                     ev.preventDefault();

    //                     var form = ev.target;

    //                     this.api.update(
    //                         form.action.replace(/.*\/friends\//, ''),
    //                         {
    //                             name: form.extension_name.value,
    //                             type: form.extension_type.value,
    //                             content: form.extension_content.value
    //                         },
    //                         $.proxy(this.updateFriendCallback, this)
    //                     );

    //                     return false;
    //                 }
    //             }
    //         },
    //         searchFriendCallback: function(search, result)
    //         {
    //             if (!search)
    //             {
    //                 return this.getFBFriendsContainer().html('');
    //             }

    //             console.log('friends.get response', result);
    //             var markupArray = [],
    //                 numFriends = result ? result.length : 0,
    //                 html = '';

    //             if (numFriends > 0)
    //             {
    //                 for (var i=0; i<numFriends; i++)
    //                 {
    //                     if (!$('#friends_list .fb_friend[data-uid="' + result[i].uid + '"]').length)
    //                     {
    //                         markupArray.push(
    //                             this.getFriendHtml(
    //                                 i,
    //                                 {
    //                                     fb_id: result[i].uid,
    //                                     name: result[i].name
    //                                 }
    //                             )
    //                         );
    //                     }
    //                 }
    //             }

    //             html = markupArray.join('')

    //             if (!html)
    //             {
    //                 html = '<center>No results for this search.'+
    //                     '<br /><br />Maybe this person is already in your extended contacts? '+
    //                     'Or you could you have possibly misspelled his or her name?</center>';
    //             }

    //             this.getFBFriendsContainer().html(html);

    //             if (markupArray.length)
    //             {
    //                 this.facebook.render(this.getFBFriendsContainer().get(0));
    //             }
    //         },
    //         updateFriendCallback: function(result)
    //         {
    //             console.log('updateFriendCallback', result);
    //         },
    //         getFriendsCallback: function(result)
    //         {
    //             this.friends = result;
    //             console.log(this.friends);
    //             console.log('getFriendsCallback', result);
    //             var friends_html = result.length ? '' : 'No friends yet...',
    //                 friends_ids = [];

    //             for (var i = result.length - 1; i >= 0; i--)
    //             {
    //                 result[i].name = '';
    //                 result[i].active = true;

    //                 friends_html += this.getFriendHtml(
    //                     i,
    //                     result[i]
    //                 );
    //                 friends_ids.push(result[i].fb_id);
    //             }

    //             // console.log(friends_ids);
    //             this.facebook.getFriendsInfos(friends_ids, $.proxy(this.getFriendsInfosCallback, this));

    //             this.getFriendsContainer().html(friends_html);

    //             this.facebook.render(this.getFriendsContainer().get(0));
    //         },
    //         getFriendsInfosCallback: function(result)
    //         {
    //             for (var i = result.length - 1; i >= 0; i--)
    //             {
    //                 var friend_element = $('div[data-uid="' + result[i].uid + '"]');
    //                 friend_element.find('span.name').html(result[i].name);
    //             }
    //         },
    //         addFriendCallback: function(uid)
    //         {
    //             $('div[data-uid="' + uid + '"] input.extended').prop('checked', true);
    //             console.log('addFriendCallback');
    //         },
    //         removeFriendCallback: function(uid)
    //         {
    //             $('div[data-uid="' + uid + '"] input.extended').prop('checked', false);
    //             console.log('removeFriendCallback');
    //         },
    //         //////////////////////////////////////////////// UTILITY FUNCTIONS
    //         updateLoginButton: function(connected)
    //         {
    //             var text = 'Login',
    //                 className = 'login';

    //             if (connected)
    //             {
    //                 text = 'Logout';
    //                 className = 'logout';
    //             }

    //             this.getFbButton().removeClass('login logout').addClass(className).html(text);
    //         },
    //         clearPageContent: function()
    //         {
    //             this.getFriendsContainer().html('<em>You are not authenticated!</em>');
    //             this.getFBFriendsContainer().html('');
    //         },
    //         initPageContent: function()
    //         {
    //             console.log('initPageContent', this);
    //             this.api.read(null, $.proxy(this.getFriendsCallback, this));
    //         },
    //         loadFbFriends: function()
    //         {
    //             var that = this;

    //             this.facebook.listFriends();
    //         },
    //         getFriendHtml: function(index, friend)
    //         {
    //             var extensionsCount = friend.extensions ? friend.extensions.length : 0;

    //             return '<div data-uid="' + friend.fb_id + '"class="fb_friend ' + (index%2 ? 'odd' : 'even') + '">'+
    //                         // '<span class="checkbox_container">'+
    //                         //     '<input class="extended" type="checkbox" ' + (friend.active ? 'checked="checked"' : '') + '/>'+
    //                         // '</span>'+
    //                         '<div class="profile_pic"><fb:profile-pic size="square" uid="' + friend.fb_id + '" facebook-logo="true"></fb:profile-pic></div>'+
    //                         '<span class="name">' + friend.name + '</span>' +
    //                         '<div class="extensions_count" title="' + extensionsCount + ' extensions">' + extensionsCount + '</div>' +
    //                     '</div>';
    //         },
    //         getExtensionsHtml: function(extensions)
    //         {
    //             var html = '';

    //             if (extensions && extensions.length)
    //             {
    //                 for (var i = 0, l = extensions.length; i < l ; i++)
    //                 {
    //                     html += '<div class="extension">';

    //                     if (extensions[i])
    //                     {
    //                         html += '<div><b>Type</b>: <span>' + extensions[i].type + '</span></div>';
    //                         html += '<div><b>Name</b>: <span>' + extensions[i].name + '</span></div>';
    //                         html += '<div><b>Content</b>: <span>' + extensions[i].content + '</span></div>';
    //                     }

    //                     html += '</div>';
    //                 }
    //                 return html;
    //             }

    //             return 'none';
    //         },
    //         //////////////////////// DOM ELEMENTS GETTERS
    //         getFbButton: function()
    //         {
    //             if (!this.fbButton)
    //             {
    //                 this.fbButton = $('button.js-auth_button');
    //             }
    //             return this.fbButton;
    //         },
    //         getFriendsContainer: function()
    //         {
    //             if (!this.friendsContainer)
    //             {
    //                 this.friendsContainer = $('#friends_list');
    //             }
    //             return this.friendsContainer;
    //         },
    //         getFBFriendsContainer: function()
    //         {
    //             if (!this.FBFriendsContainer)
    //             {
    //                 this.FBFriendsContainer = $('#fb_search_results');
    //             }
    //             return this.FBFriendsContainer;
    //         }
        };

        return new Application();
    });
})();