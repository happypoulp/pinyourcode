
/*
 * GET home page.
 */

exports.index = function(req, res)
{
    // var doc = {toto: 'toto value'};

    // var coll = db.collection('test_insert');
    // coll.insert(
    //     doc,
    //     function (err, collection)
    //     {
    //         console.log(err);
    //         console.log(collection);
    //     }
    // );

    res.render(
        'index',
        {
            title: 'Express JS Demo',
            FB_APP_ID: '397068970352801',
            domain: 'localhost:3000'
        }
    );
};

exports.zob = function(req, res)
{
    res.render(
        'zob',
        {
            title: 'Arrête de péter STP!!',
            FB_APP_ID: '397068970352801',
            domain: '127.0.0.1:3000'
        }
    );
};