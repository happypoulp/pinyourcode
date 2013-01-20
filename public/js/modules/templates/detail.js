define(["jade-runtime"], function() { return function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
 var fb_id = friend.get('fb_id'), extensions_count = friend.get('extensions').length
buf.push('<div');
buf.push(attrs({ 'data-uid':("" + (fb_id) + ""), "class": ('friend') }, {"data-uid":true}));
buf.push('><div class="profile_pic"><fb:profile-pic');
buf.push(attrs({ 'size':("square"), 'uid':("" + (fb_id) + ""), 'facebook-logo':("true") }, {"size":true,"uid":true,"facebook-logo":true}));
buf.push('></fb:profile-pic></div><span class="name">');
var __val__ = friend.get('name')
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span><div>has ' + escape((interp = extensions_count) == null ? '' : interp) + ' extensions.</div><ul class="extensions">');
// iterate friend.get('extensions')
;(function(){
  if ('number' == typeof friend.get('extensions').length) {

    for (var $index = 0, $$l = friend.get('extensions').length; $index < $$l; $index++) {
      var extension = friend.get('extensions')[$index];

if ( extension)
{
buf.push('<li class="extension"><div>');
var __val__ = extension.name
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div><div>');
var __val__ = extension.type
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div><div>');
var __val__ = extension.content
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div></li>');
}
    }

  } else {
    var $$l = 0;
    for (var $index in friend.get('extensions')) {
      $$l++;      var extension = friend.get('extensions')[$index];

if ( extension)
{
buf.push('<li class="extension"><div>');
var __val__ = extension.name
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div><div>');
var __val__ = extension.type
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div><div>');
var __val__ = extension.content
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div></li>');
}
    }

  }
}).call(this);

buf.push('</ul></div>');
}
return buf.join("");
} });