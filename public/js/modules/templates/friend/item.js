var jd_rt="jade-runtime";define([jd_rt], function(jade) { return function(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),friend = locals_.friend;
var fb_id = friend.fb_id, extensions_count = friend.extensions.length
buf.push("<div class=\"profile_pic\"><img" + (jade.attr("src", "" + (friend.picture_small) + "", true, false)) + " width=\"50\" height=\"50\"/></div><span class=\"name\">" + (jade.escape(null == (jade.interp = friend.name) ? "" : jade.interp)) + "</span><div" + (jade.attr("title", "" + (extensions_count) + " extensions", true, false)) + " class=\"extensions_count\">" + (jade.escape(null == (jade.interp = extensions_count) ? "" : jade.interp)) + "</div><div class=\"tools\"><button class=\"button red js-remove_fb_friend\">Remove</button></div>");;return buf.join("");
} });