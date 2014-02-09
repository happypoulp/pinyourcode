var jd_rt="jade-runtime";define([jd_rt], function(jade) { return function(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),friend = locals_.friend;
var fb_id = friend.get('fb_id')
buf.push("<div" + (jade.attr("data-uid", "" + (fb_id) + "", true, false)) + (jade.attr("data-id", "" + (friend.id) + "", true, false)) + " class=\"friend\"><div class=\"big_pic\"><img" + (jade.attr("src", "" + (friend.get('picture')) + "", true, false)) + "/></div><h2 class=\"name\">" + (jade.escape(null == (jade.interp = friend.get('name')) ? "" : jade.interp)) + "</h2></div>");;return buf.join("");
} });