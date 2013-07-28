var jd_rt="jade-runtime";define([jd_rt], function() { return function(locals) {
var buf = [];
var locals_ = (locals || {}),candidate = locals_.candidate;var fb_id = candidate.fb_id || candidate.id
buf.push("<div class=\"profile_pic\"><img" + (jade.attrs({ 'src':("" + (candidate.picture_small) + ""), 'width':("50"), 'height':("50") }, {"src":true,"width":true,"height":true})) + "/></div><span class=\"name\">" + (jade.escape(null == (jade.interp = candidate.name) ? "" : jade.interp)) + "</span>");;return buf.join("");
} });