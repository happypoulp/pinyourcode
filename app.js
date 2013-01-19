var express = require('express')
  , app = module.exports = express();

require('./config/locals.js')(app);
require('./config/environment.js')(app);
require('./config/templates.js')(app);
require('./config/db.js')(app);
require('./routes')(app);
// console.log(app.routes);

var server_port = process.env.PORT || 3000;

// Starting the server
app.listen(server_port, function()
{
  console.log("Express server listening on port %d in %s mode", server_port, app.settings.env);
});
