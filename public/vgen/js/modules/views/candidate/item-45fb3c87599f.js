(function(){var e="views/candidate/item";define(["templates/candidate/item"],function(t){log(e,"Dependencies loaded","Build module");var n=Backbone.View.extend({name:e,tagName:"li",className:"fb_candidate list-item",events:{click:"add"},add:function(e){e.stopPropagation(),this.model.save(null,{success:function(){document.location.hash="/"}})},render:function(){return this.$el.attr("data-uid",this.model.get("fb_id")).addClass(this.options.extraClass).html(t({candidate:this.model.attributes})),this}});return n})})();