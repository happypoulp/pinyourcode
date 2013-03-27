require(
    ['views/friend'],
    function(FriendView)
    {
        var v = new FriendView({el: $('li[data-uid="641511137"]')});
        console.log(v.el);
    }
);