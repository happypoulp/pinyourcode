// test Controller

function TestController() { }
TestController.prototype =
{
  templating: function(req, res)
  {
    res.render(
      'templating',
      {}
    );
  },
  authenticated: function(req, res)
  {
    var data = {};

    data.authenticated = req.authenticated;

    res.render(
      'authenticated',
      data
    );
  },
};

exports.class = TestController;