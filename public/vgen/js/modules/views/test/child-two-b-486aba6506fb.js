(function(){var e="views/test/child-two-b";define(["pubsub"],function(t){log(e,"Dependencies loaded","Build module");var n=Backbone.View.extend({name:e,render:function(){this.$el.html("child two b")}});return n})})();