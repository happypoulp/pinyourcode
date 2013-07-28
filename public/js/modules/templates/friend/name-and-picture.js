var jd_rt="jade-runtime";define([jd_rt], function() { return function(locals) {
var buf = [];
var locals_ = (locals || {}),friend = locals_.friend;var fb_id = friend.get('fb_id')
buf.push("<div" + (jade.attrs({ 'data-uid':("" + (fb_id) + ""), 'data-id':("" + (friend.id) + ""), "class": [('friend')] }, {"data-uid":true,"data-id":true})) + "><div class=\"big_pic\"><img" + (jade.attrs({ 'src':("" + (friend.get('picture')) + "") }, {"src":true})) + "/></div><h2 class=\"name\">" + (jade.escape(null == (jade.interp = friend.get('name')) ? "" : jade.interp)) + "</h2></div>");;return buf.join("");
} });