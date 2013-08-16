module.exports = function(app)
{
  var fs = require('fs'),
    locals =
    {
      // env: 'production',
      env: app.get('env'),
      title : 'I & Co',
      FB_APP_ID : process.env.FACEBOOK_APP_ID,
      FB_APP_DOMAIN : 'localhost:3000',
      version: fs.readFileSync('build/version', {encoding: 'utf8'}).replace(/[^0-9]/, ''),
      cdnBaseUrl: ''
    };

  if (locals.env == 'production')
  {
    locals.FB_APP_DOMAIN = 'iandco.beardsonwheels.com';
    locals.cdnBaseUrl = 'http://d2tj71e6lmjccb.cloudfront.net';
  }

  app.locals(locals);
}