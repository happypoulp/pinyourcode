(function()
{
    var moduleName = 'views/results',
        moduleDependencies = [
            'backbone',
            'facebook',
            'models/friend',
            'views/candidate',
            'views/emptyresults'
        ];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(Backbone, Facebook, FriendModel, CandidateView, EmptyResultsView)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ResultsView = Backbone.View.extend({

            tagName: 'ul',
            id: 'fb_search_results',

            search: '',
            results: [],

            events: {},

            getHTML: function()
            {
                var frag = document.createDocumentFragment();

                _.each(this.results, function(result)
                {
                    console.log(result);
                    frag.appendChild(
                        new CandidateView(
                            {
                                model: new FriendModel(
                                    {
                                        fb_id: result.uid,
                                        name: result.name
                                    }
                                )
                            }
                        ).render().el
                    );
                });

                return frag;
            },

            empty: function()
            {
                this.$el.empty();
            },

            update: function(search, results)
            {
                this.search = search;
                this.results = results;

                log(moduleName, 'results', results);

                var frag = document.createDocumentFragment(),
                    needFBRendering = true;

                if (!results.length)
                {
                    frag.appendChild(new EmptyResultsView({search: search}).render().el)
                    needFBRendering = false;
                }
                else
                {
                    for (var i = 0, l = results.length; i < l; i++)
                    {
                        var found = this.$('.fb_candidate[data-uid="' + results[i].uid + '"]');

                        if (!found.length)
                        {
                            frag.appendChild(
                                new CandidateView(
                                {
                                    model: new FriendModel(
                                    {
                                        fb_id: results[i].uid,
                                        name: results[i].name
                                    }),
                                    extraClass: 'keep'
                                }).render().el
                            );
                        }
                        else
                        {
                            found.addClass('keep');
                        }
                    }
                }

                if (frag.firstChild)
                {
                    console.log(frag);
                    if (!this.$('.fb_candidate').length) this.$el.empty();
                    this.$el.prepend(frag);
                }

                this.$('.fb_candidate').each(function()
                {
                    $el = $(this);
                    if ($el.hasClass('keep'))
                        $el.removeClass('keep');
                    else
                        $el.remove();
                });

                if (needFBRendering) this.postRender();
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