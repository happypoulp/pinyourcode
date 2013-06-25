var env_error;

if (!process.env.FACEBOOK_APP_ID)
{
  env_error = true;
  console.log('FACEBOOK_APP_ID ENV variable not found');
}

if(!process.env.FACEBOOK_SECRET)
{
  env_error = true;
  console.log('FACEBOOK_SECRET ENV variable not found');
}

if (env_error)
{
  console.log('Exit with error: Missing ENV variables.');
  process.exit(1);
}
