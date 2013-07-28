// application Controller

var staticHelper = require('../helpers/statics-helper');

function ApplicationController() { }
ApplicationController.prototype =
{
  index: function(req, res)
  {
    res.render(
      'index',
      {
        ressources:
        {
          css:
          {
            index: staticHelper.cssPath('index')
          },
          js:
          {
            core: staticHelper.jsPath('log-require-jq-_-bckbn-ckie')
          }
        }
      }
    );
  }
};

exports.class = ApplicationController;