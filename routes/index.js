
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
            title: 'Express JS Demo'
        }
    );
};

exports.zob = function(req, res)
{
    res.render(
        'zob',
        {
            title: 'Arrête de péter STP!!'
        }
    );
};