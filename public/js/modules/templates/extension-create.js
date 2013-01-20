define(["jade-runtime"], function() { return function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<form action="/api/friends" name="extension_form" class="add_extension_form"><h3>Add an extension</h3><div><input type="text" name="extension_name" placeholder="name"/></div><div><input type="text" name="extension_type" placeholder="type"/></div><div><input type="text" name="extension_content" placeholder="content"/></div><div><input type="submit"/></div></form>');
}
return buf.join("");
} });