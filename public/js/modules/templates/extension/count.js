var jd_rt="jade-runtime";define([jd_rt], function(jade) { return function(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),extensions = locals_.extensions;
var extensions_count = extensions.length
buf.push("<div class=\"fgd2 small it extensions_sum\">");
switch (extensions_count){
case 0:
buf.push("- no extensions yet -");
  break;
case 1:
buf.push("- <span class=\"extensions_count\">1</span> extension -");
  break;
default:
buf.push("- <span class=\"extensions_count\">" + (jade.escape((jade.interp = extensions_count) == null ? '' : jade.interp)) + "</span> extensions -");
  break;
}
buf.push("</div>");;return buf.join("");
} });