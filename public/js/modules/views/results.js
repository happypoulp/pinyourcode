(function()
{
    var moduleName = 'views/results',
        moduleDependencies = [
            'backbone',
            'facebook',
            'models/friend',
            'views/candidate',
            '/js/modules/templates/emptyresults.js',
        ];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(Backbone, Facebook, FriendModel, CandidateView, EmptyResultsTemplate)
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

                log(moduleName, 'result', result);

                var frag = document.createDocumentFragment(),
                    needFBRendering = true;

                for (var i = 0, l = result.length; i < l; i++)
                {
                    var found = this.$('.fb_friend[data-uid="' + result[i].uid + '"]');

                    if (!found.length)
                    {
                        frag.appendChild(
                            new CandidateView(
                            {
                                model: new FriendModel(
                                {
                                    fb_id: result[i].uid,
                                    name: result[i].name
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

                if (!result.length)
                {
                    frag.appendChild(new EmptyResultsView({search: search}).render().el)
                //     markupArray.push(EmptyResultsTemplate({search: search}));
                    needFBRendering = false;
                }

                if (frag.firstChild)
                {
                    console.log(frag);
                    if (!this.$('.fb_friend').length) this.$el.empty();
                    this.$el.prepend(frag);
                }

                $this.$('.fb_friend').each(function()
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