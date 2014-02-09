var jd_rt="jade-runtime";define([jd_rt], function(jade) { return function(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),extension = locals_.extension;
buf.push("<div class=\"extension_name\">Name: " + (jade.escape((jade.interp = extension.name) == null ? '' : jade.interp)) + "</div><div class=\"extension_tags\">Tags: " + (jade.escape((jade.interp = extension.tags) == null ? '' : jade.interp)) + "</div><div class=\"extension_content\">Content: " + (jade.escape((jade.interp = extension.content) == null ? '' : jade.interp)) + "</div><div class=\"tools\"><button class=\"button red js-remove_extension\">Remove</button></div>");;return buf.join("");
} });