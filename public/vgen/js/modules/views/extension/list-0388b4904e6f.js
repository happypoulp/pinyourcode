(function(){var e="views/extension/list",t="facebook";define([t,"views/extension/item"],function(t,n){log(e,"Dependencies loaded","Build module");var r=Backbone.View.extend({tagName:"ul",className:"extensions",events:{},render:function(){var e=this,t=$.Deferred(),r=this.collection.friend,i=[];return this.collection.each(function(t){t.friend_id=r.id,i.push(e.renderChild(new n({model:t,friend:r})))}),$.when.apply($,i).then(function(){t.resolve()}),t},add:function(t){log(e,"Update extension list",t),this.renderChild(new n({model:t,friend:this.collection.friend}),{meth:"append",target:".extensions"})},beforeRemove:function(e){return this.collection.off("add",this.getAddProxy()),this},getAddProxy:function(){return this.addProxy||(this.addProxy=$.proxy(this.add,this))},initialize:function(){this.collection.on("add",this.getAddProxy())}});return r})})();