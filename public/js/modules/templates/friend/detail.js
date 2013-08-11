define(["jade-runtime"], function() { return function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
 var fb_id = friend.get('fb_id')
 var extensions_count = friend.get('extensions').length
 var extension_0 = 'no extensions yet'
 var extension_1 = '<span class="extensions_count">1</span> extension'
 var extension_many = '<span class="extensions_count"></span> extensions'
buf.push('<div');
buf.push(attrs({ 'data-uid':("" + (fb_id) + ""), 'data-id':("" + (friend.id) + ""), "class": ('friend') }, {"data-uid":true,"data-id":true}));
buf.push('><div class="big_pic"><img');
buf.push(attrs({ 'src':("" + (friend.get('picture')) + "") }, {"src":true}));
buf.push('/></div><h2 class="name">');
var __val__ = friend.get('name')
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</h2><div class="fgd2 small it extensions_sum">');
switch (extensions_count){
case 0:
buf.push('- ' + escape((interp = extension_0) == null ? '' : interp) + ' -');
  break;
case 1:
buf.push('- ' + escape((interp = extension_1) == null ? '' : interp) + ' -');
  break;
default:
buf.push('- ' + escape((interp = extension_many) == null ? '' : interp) + ' -');
  break;
}
buf.push('</div></div>');
}
return buf.join("");
} });