require(
    ['models/friend'],
    function(FriendModel)
    {
        var m = new FriendModel({fb_id: 100002482411192});
        m.fetch({
            success: function(res)
            {
                console.log(res);
            }
        });
        // console.log(m.destroy());
    }
);