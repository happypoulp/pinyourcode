(function(){var e="views/test/child-one-a";define(["pubsub"],function(t){log(e,"Dependencies loaded","Build module");var n=Backbone.View.extend({name:e,render:function(){this.$el.html("child one a")}});return n})})();