(function(){var e="views/generic";define([],function(){log(e,"Dependencies loaded","Build module");var t=Backbone.View.extend({name:e,render:function(){this.$el.html(this.options.template(this.options.data))}});return t})})();