(function(){var e="collections/friends";define(["models/friend"],function(t){log(e,"Dependencies loaded","Build module");var n=Backbone.Collection.extend({model:t,url:"/api/friends"});return n})})();