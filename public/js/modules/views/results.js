(function()
{
    var moduleName = 'views/results',
        moduleDependencies = [
            'backbone',
            'facebook',
            'views/friend'
        ];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(Backbone, Facebook, FriendView)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ResultsView = Backbone.View.extend({

            tagName: 'ul',
            id: 'fb_search_results',

            events: {},

            getHTML: function()
            {
                var frag = document.createDocumentFragment();

                this.results.each(function(result)
                {
                    frag.appendChild(new CandidateView({candidate: result}).render().el);
                });

                return frag;
            },

            render: function()
            {
                this.el.appendChild(this.getHTML());

                return this;
            },

            postRender: function()
            {
                Facebook.render(this.el);
            }
        });

        return ResultsView;
    });
})();