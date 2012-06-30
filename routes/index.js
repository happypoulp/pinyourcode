
/*
 * GET home page.
 */

exports.index = function(req, res)
{
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