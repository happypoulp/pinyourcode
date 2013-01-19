define(["jade-runtime"], function() { return function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
// iterate friends
;(function(){
  if ('number' == typeof friends.length) {

    for (var $index = 0, $$l = friends.length; $index < $$l; $index++) {
      var friend = friends[$index];

 var fb_id = friend.get('fb_id'), extensions_count = friend.get('extensions').length
buf.push('<li');
buf.push(attrs({ 'data-uid':("" + (fb_id) + ""), "class": ("fb_friend") }, {"data-uid":true,"class":true}));
buf.push('><div class="profile_pic"><fb:profile-pic');
buf.push(attrs({ 'size':("square"), 'uid':("" + (fb_id) + ""), 'facebook-logo':("true") }, {"size":true,"uid":true,"facebook-logo":true}));
buf.push('></fb:profile-pic></div><span class="name">');
var __val__ = friend.get('name')
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span><div');
buf.push(attrs({ 'title':("" + (extensions_count) + " extensions"), "class": ('extensions_count') }, {"title":true}));
buf.push('>');
var __val__ = extensions_count
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div></li>');
    }

  } else {
    var $$l = 0;
    for (var $index in friends) {
      $$l++;      var friend = friends[$index];

 var fb_id = friend.get('fb_id'), extensions_count = friend.get('extensions').length
buf.push('<li');
buf.push(attrs({ 'data-uid':("" + (fb_id) + ""), "class": ("fb_friend") }, {"data-uid":true,"class":true}));
buf.push('><div class="profile_pic"><fb:profile-pic');
buf.push(attrs({ 'size':("square"), 'uid':("" + (fb_id) + ""), 'facebook-logo':("true") }, {"size":true,"uid":true,"facebook-logo":true}));
buf.push('></fb:profile-pic></div><span class="name">');
var __val__ = friend.get('name')
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span><div');
buf.push(attrs({ 'title':("" + (extensions_count) + " extensions"), "class": ('extensions_count') }, {"title":true}));
buf.push('>');
var __val__ = extensions_count
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div></li>');
    }

  }
}).call(this);

}
return buf.join("");
} });