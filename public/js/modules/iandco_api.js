// IANDCO_API MODULE

define(['jquery'], function($)
{
    var IAndCoAPI = function()
    {
        this.baseURI = '/friends';
    };

    IAndCoAPI.prototype =
    {
        create: function(fbID, callback)
        {
            $.ajax
            (
                this.baseURI,
                {
                    data:
                    {
                        fb_id: fbID
                    },
                    type: 'post',
                    dataType: 'json'
                }
            )
            .done(function(data)
            {
                console.log('create - done.');
                callback(data);
            })
            .fail(function()
            {
                console.log('create - fail.');
            })
            .always(function()
            {
                console.log('create - always.');
            });
        },
        read: function(fbID, callback)
        {
            if (fbID)
            {
                // get user infos
                $.ajax
                (
                    this.baseURI + '/' + fbID,
                    {
                        data:
                        {
                            fb_id: fbID
                        },
                        type: 'get',
                        dataType: 'json'
                    }
                )
                .done(function(data)
                {
                    console.log('read - done.');
                    callback(data);
                })
                .fail(function()
                {
                    console.log('read - fail.');
                })
                .always(function()
                {
                    console.log('read - always.');
                });
            }
            else
            {
                // get user list
                $.ajax
                (
                    this.baseURI + '/',
                    {
                        data:
                        {
                            fb_id: fbID
                        },
                        type: 'get',
                        dataType: 'json'
                    }
                )
                .done(function(data)
                {
                    console.log('read - done.', data);
                    callback(data);
                })
                .fail(function()
                {
                    console.log('read - fail.');
                })
                .always(function()
                {
                    console.log('read - always.');
                });
            }
        },
        update: function(fbID, data, callback)
        {
            $.ajax
            (
                this.baseURI,
                {
                    data:
                    {
                        fb_id: fbID,
                        _method: 'put'
                    },
                    type: 'post',
                    dataType: 'json'
                }
            )
            .done(function(data)
            {
                console.log('update - done.');
                callback(data);
            })
            .fail(function()
            {
                console.log('update - fail.');
            })
            .always(function()
            {
                console.log('update - always.');
            });
        },
        delete: function(fbID, callback)
        {
            $.ajax
            (
                this.baseURI,
                {
                    data:
                    {
                        fb_id: fbID,
                        _method: 'delete'
                    },
                    type: 'post',
                    dataType: 'json'
                }
            )
            .done(function(data)
            {
                console.log('delete - done.');
                callback(data);
            })
            .fail(function()
            {
                console.log('delete - fail.');
            })
            .always(function()
            {
                console.log('delete - always.');
            });
        }
    };

    return IAndCoAPI;
});

