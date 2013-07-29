#!/usr/local/bin/node

var fs = require('fs'),
  file = __dirname + '/js-build-profile.js',
  path = require('path'),
  packsMapping;

fs.readFile('./build/ressource-mapping.json', 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
 
  packsMapping = JSON.parse(data);

  fs.readFile(file, 'utf8', function (err, data)
  {
    if (err)
    {
      console.log('Error: ' + err);
      return;
    }
   
    data = eval(data)['modules'];

    var packs = {};

    for (i in data)
    {
      packs[data[i].name] = packsMapping['public/gen/js/modules/' + data[i].name + '.js'].replace(/public/, '').replace('.js', '');
    }

    var pathsStr = "script.\n" +
      "  require['paths']=" + JSON.stringify(packs) + ";"

    fs.writeFileSync('views/includes/prod-require-paths.jade', pathsStr, 'utf8');
  });
});