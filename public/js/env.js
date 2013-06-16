(function(w)
{
    w.DM_ENV = {};

    // Get window.DM_ENVS[key] with key split on "."
    // Ex: getEnv('Sd_Test.key') returns window.DM_ENVS['Sd_Test']['key']
    // !!! Use this instead of importEnvs for future scripts !!!
    w.getEnv = function(key)
    {
        var key_dimensions = (key || '').split('.'),
            env = w.DM_ENV[key_dimensions[0]];

        for (var i = 1, l = key_dimensions.length; i < l && env; i++)
        {
            env = env[key_dimensions[i]];
        }

        return env;
    }
})(window);