require(
    ['collections/friends'],
    function(FriendCollection)
    {
        var c = new FriendCollection();
        c.fetch({
            success: function(res)
            {
                console.log(res);
                res.each(function(m)
                {
                    console.log(m, m.isNew());
                });
            }
        });
    }
);