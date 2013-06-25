module.exports = function(app)
{
  var locals =
  {
    title : 'I & Co',
    FB_APP_ID : process.env.FACEBOOK_APP_ID,
    FB_APP_DOMAIN : ''
  };

  if (app.settings.env == 'development')
  {
    locals.FB_APP_DOMAIN = 'localhost:3000';
  }

  app.locals(locals);
}