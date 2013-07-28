#! /usr/bin/env ruby

require 'json'
require 'pathname'

ressourceMapping = Hash.new

ARGV.each do|filePath|
  md5 = `md5 -q #{filePath}`.strip[0..11]
  pn = Pathname.new(filePath)
  vgenFilePath = nil
  if pn.extname == '.js'
    vgenFilePath = filePath.sub(/\/gen\//, '/vgen/')
  elsif pn.extname == '.css'
    vgenFilePath = filePath.sub(/\/gen\//, '/vgen/')
  end
  vgenFilePath = vgenFilePath.sub(/\.(js|css)/, '-' + md5 + '.\1')
  ressourceMapping[filePath] = vgenFilePath
  dirname=File::dirname(vgenFilePath)
  cmd="mkdir -p #{dirname};\ncp #{filePath} #{vgenFilePath}"
  puts cmd
  `#{cmd}`
end

File.open('build/ressource-mapping.json', 'w') {|f| f.write(ressourceMapping.to_json.gsub(/",/, "\",\n")) }