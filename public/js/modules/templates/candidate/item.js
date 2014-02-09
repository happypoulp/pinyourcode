var jd_rt="jade-runtime";define([jd_rt], function(jade) { return function(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),candidate = locals_.candidate;
var fb_id = candidate.fb_id || candidate.id
buf.push("<div class=\"profile_pic\"><img" + (jade.attr("src", "" + (candidate.picture_small) + "", true, false)) + " width=\"50\" height=\"50\"/></div><span class=\"name\">" + (jade.escape(null == (jade.interp = candidate.name) ? "" : jade.interp)) + "</span>");;return buf.join("");
} });