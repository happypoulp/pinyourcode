(function(){var e="views/header",t="pubsub",n="session";define([n,t],function(t,n){log(e,"Dependencies loaded","Build module");var r=Backbone.View.extend({name:e,permanent:!0,currentDisplayMode:"hidden",events:{"click button.js-auth_button":"onAuthClick"},onAuthClick:function(e){t.toggleLoginStatus()},displayForLogin:function(){if(this.currentDisplayMode!="login"){$(".js-back_button, .js-add_fb_friend").hide();var e=$(".js-auth_button");e.show().html(e.data("in"))}},displayForAny:function(){if(this.currentDisplayMode!="any"){$(".js-back_button, .js-add_fb_friend").show();var e=$(".js-auth_button");e.show().html(e.data("out"))}},initialize:function(){n.subscribe("header:login",this.displayForLogin,this).subscribe("header:any",this.displayForAny,this)}});return r})})();