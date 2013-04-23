module.exports = function(app)
{
  // requirejs(['lib/jade-compile'], function(jadeCompile) {
    //compile all public templates from 'views/templates' to client-ready javascript functions in 'public/templates'
  var templatesPath = __dirname + '/../views/client-templates'
    , out = __dirname + '/../public/js/modules/templates'
    , templateExtensionRe = /\.jade$/
    , options = {
      client: true,
      compileDebug: false
    }
    , fs = require('fs')
    , _path = require('path')
    , mkdirp = require('mkdirp')
    , jade = require('jade')
    , basename = _path.basename
    , dirname = _path.dirname
    , resolve = _path.resolve
    , join = _path.join;

    // filename
    if (out) options.filename = out;

    if (!(templatesPath instanceof Array)) templatesPath = [templatesPath];

    // left-over args are file paths
    var files = templatesPath;

    // compile files
    for (var i = 0; i < files.length; i++) processPath(files[i]);

    function processDirectory(dirPath)
    {
      fs.readdir(dirPath, function(err, files)
      {
        if (err) throw err;
        var dirfiles = files.map(function(filename)
        {
          return dirPath + '/' + filename;
        });
        for (var i = 0; i < dirfiles.length; i++)
          processPath(dirfiles[i]);
      });
    }

    function processPath(path)
    {
      fs.lstat(path, function(err, stat)
      {
        if (err) throw err;
        // Found jade file
        if (stat.isFile() && templateExtensionRe.test(path))
        {
          renderFile(path);
        }
        // Found directory
        else if (stat.isDirectory())
        {
          processDirectory(path);
        }
      });
    }

    /**
     * Process the given path, compiling the jade files found.
     * Always walk the subdirectories.
     */
    function renderFile(filePath)
    {
      fs.readFile(filePath, 'utf8', function(err, str)
      {
        // console.log('filePath:', filePath);
        if (err) throw err;
        options.filename = filePath;
        var fn = jade.compile(str, options).toString().substring(18);
        filePath = filePath.replace(templateExtensionRe, '.js');
        if (out) filePath = join(out, filePath.replace(templatesPath, ''));
        // Original code below. BUGGY: does not reproduce subdirectories structure to compiled folder
        // if (out) filePath = join(out, basename(filePath));
        var dir = resolve(dirname(filePath));
        mkdirp(dir, 0755, function(err)
        {
          if (err) throw err;
          fs.writeFile(filePath, 'define(["jade-runtime"], function() { return function' + fn + ' });', function(err)
          {
            if (err) throw err;
            console.log('  \33[90mrendered \33[36m%s\33[0m', filePath);
          });
        });
      });
    }
}