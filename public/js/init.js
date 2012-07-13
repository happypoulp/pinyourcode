initFB = function(appID, domain)
{
    console.log('window.fbAsyncInit');
    FB.init(
    {
        appId      : appID, // App ID
        channelUrl : '//' + domain + '/channel.html', // Channel File
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : false  // parse XFBML
    });

    var profilePicsDiv = document.getElementById('profile_pics');

    FB.Event.subscribe('auth.statusChange', function(response)
    {
        console.log(response);
        // do something with response
    });

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
};

// Load the SDK Asynchronously
(function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
 }(document));


(function(a){
    function b(){}
    for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());)
    {
        a[d]=a[d]||b;
    }
})