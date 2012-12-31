// application Controller

function ApplicationController() { }
ApplicationController.prototype =
{
  index: function(req, res)
  {
    res.render(
      'index',
      {}
    );
  }
};

exports.class = ApplicationController;