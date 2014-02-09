var jd_rt="jade-runtime";define([jd_rt], function(jade) { return function(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),search = locals_.search;
buf.push("<center>No results for this search: <b>" + (jade.escape(null == (jade.interp = search) ? "" : jade.interp)) + "</b><br/><br/>Maybe this person is already in your extended contacts?\nOr you could you have possibly misspelled his or her name?</center>");;return buf.join("");
} });