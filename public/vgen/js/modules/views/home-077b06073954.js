(function(){var e="models/extension";define("models/extension",[],function(){log(e,"Dependencies loaded","Build module");var t=Backbone.Model.extend({idAttribute:"_id",urlRoot:function(){return"/api/friends/"+this.friend_id+"/extensions"},defaults:{name:"",tags:[],content:""}});return t})})(),function(){var e="collections/extensions";define("collections/extensions",["models/extension"],function(t){log(e,"Dependencies loaded","Build module");var n=Backbone.Collection.extend({model:t,url:function(){return console.log("COLLECTION URL called",this.options,this.options.friend_id),"/api/friends/"+this.options.friend_id+"/extensions"},initialize:function(e,t){this.friend=t.friend}});return n})}(),function(){var e="models/friend";define("models/friend",["collections/extensions"],function(t){log(e,"Dependencies loaded","Build module");var n=Backbone.Model.extend({idAttribute:"_id",urlRoot:"/api/friends",defaults:{extensions:[],fb_id:null,user_id:null,name:null,picture:null,picture_small:null},parse:function(e){return e.extensions=new t(e.extensions,{friend:this}),e},addExtension:function(e){this.get("extensions").add(e)}});return n})}(),function(){var e="collections/friends";define("collections/friends",["models/friend"],function(t){log(e,"Dependencies loaded","Build module");var n=Backbone.Collection.extend({model:t,url:"/api/friends"});return n})}();var jd_rt="jade-runtime";define("templates/friend/item",[jd_rt],function(e){return function(t){var n=[],r={},i=t||{},s=i.friend,o=s.fb_id,u=s.extensions.length;return n.push('<div class="profile_pic"><img'+e.attr("src",""+s.picture_small+"",!0,!1)+' width="50" height="50"/></div><span class="name">'+e.escape(null==(e.interp=s.name)?"":e.interp)+"</span><div"+e.attr("title",""+u+" extensions",!0,!1)+' class="extensions_count">'+e.escape(null==(e.interp=u)?"":e.interp)+'</div><div class="tools"><button class="button red js-remove_fb_friend">Remove</button></div>'),n.join("")}}),function(){var e="views/friend/item";define("views/friend/item",["templates/friend/item"],function(t){log(e,"Dependencies loaded","Build module");var n=Backbone.View.extend({name:e,tagName:"li",className:"fb_friend list-item",events:{"click .js-remove_fb_friend":"remove"},remove:function(e){e.stopPropagation(),confirm("Are you sure you want to delete this friend and all his extensions?")&&this.model.destroy({success:function(){$(e.target).closest(".fb_friend").remove()},error:function(){console.log("ERROR!")}})},render:function(){log(e,"==== render",this.cid),this.$el.attr("data-uid",this.model.get("fb_id")).attr("data-id",this.model.id).addClass(this.options.extraClass).html(t({friend:this.model.attributes}))},beforeRemove:function(e){return this.model.off("change",this.getRenderProxy()),this},getRenderProxy:function(){return this.renderProxy||(this.renderProxy=$.proxy(this.render,this))},initialize:function(){this.model.on("change",this.getRenderProxy())}});return n})}(),function(){var e="views/friend/list",t="facebook";define("views/friend/list",[t,"views/friend/item"],function(t,n){log(e,"Dependencies loaded","Build module");var r=Backbone.View.extend({name:e,tagName:"ul",className:"friends_list",events:{},render:function(){var e=this,t=$.Deferred(),r=[];return this.collection.each(function(t){r.push(e.renderChild(new n({model:t})))}),$.when.apply($,r).then(function(){t.resolve()}),t}});return r})}(),function(){var e="views/home",t="pubsub",n="facebook";define("views/home",[t,n,"collections/friends","views/friend/list"],function(t,n,r,i){log(e,"Dependencies loaded","Build module");var s=Backbone.View.extend({name:e,events:{"click li.fb_friend":"showFriendDetails"},showFriendDetails:function(e){app.navigate("/friend/"+$(e.currentTarget).data("id"),{trigger:!0})},render:function(){t.publish("header:any"),log(e,"render");var r=this,s=$.Deferred();return this.dataPromise.done(function(){log(e,"data promise fulfilled");var t=[],o={};for(var u=r.collection.models.length-1;u>=0;u--){var a=r.collection.models[u].get("fb_id");t.push(a),o[a]=r.collection.models[u]}n.getFriendsInfos(t,function(e){for(var t=e.length-1;t>=0;t--)o[e[t].uid].set("name",e[t].name);window.listV=new i({collection:r.collection}),$.when(r.renderChild(listV)).then(function(){s.resolve()})})}),s},initialize:function(){var t=this;this.dataPromise=(new r).fetch({success:function(n){log(e,"success fetching friends"),t.collection=n}})}});return s})}();