(function(){var e="collections/extensions";define(["models/extension"],function(t){log(e,"Dependencies loaded","Build module");var n=Backbone.Collection.extend({model:t,url:function(){return console.log("COLLECTION URL called",this.options,this.options.friend_id),"/api/friends/"+this.options.friend_id+"/extensions"},initialize:function(e,t){this.friend=t.friend}});return n})})();