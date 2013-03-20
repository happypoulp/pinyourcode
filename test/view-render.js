var v = Backbone.View.extend({
    render: function()
    {
        this.$el.html('<div class="item"></div>');
        return this;
    }
});

console.log(new v().render().el);