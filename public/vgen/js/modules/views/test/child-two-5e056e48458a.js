(function(){var e="views/test/child-two";define(["pubsub","views/test/child-two-a","views/test/child-two-b"],function(t,n,r){log(e,"Dependencies loaded","Build module");var i=Backbone.View.extend({name:e,render:function(){var e=$.Deferred(),t=this;return setTimeout(function(){var i=t.renderChild(new n),s=t.renderChild(new r);$.when(i,s).then(function(){e.resolve()})},100),e}});return i})})();