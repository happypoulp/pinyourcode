var facebookSession = require('../../middlewares/facebook-session.js');

routes = function(app) {
  require('./friends')(app)
}

module.exports = {
  routes: routes,
  check: facebookSession.check
}