(function(){var e="views/app";define(["session","views/header"],function(t,n){log(e,"Dependencies loaded","Build module");var r=Backbone.View.extend({initialized:!1,name:e,render:function(){log(e,"render AppView"),this.initialized||(this.initialized=!0,this.renderChild(new n({el:$("header")})));var t=this,r=Array.prototype.slice.call(this.pageArgs),i=r[0];log(e,"render Page",i),require([i],function(e){t.renderChild(new e({routeParameters:r.slice(1)}),{meth:"html",target:"#pages"})})},renderPage:function(){this.pageArgs=arguments,this.clean(),this.render()},renderAuthPage:function(){var e=this,n=arguments;t.requireAuth(function(){e.renderPage.apply(e,n)})}});return r})})();