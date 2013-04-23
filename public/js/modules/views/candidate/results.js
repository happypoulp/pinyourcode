(function()
{
    var moduleName = 'views/candidate/results',
        moduleDependencies = [
            'backbone',
            'facebook',
            'models/friend',
            'views/candidate/item',
            'views/candidate/empty'
        ];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(Backbone, Facebook, FriendModel, CandidateView, EmptyResultsView)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ResultsView = Backbone.View.extend({

            name: moduleName,

            tagName: 'ul',
            id: 'fb_search_results',

            search: '',
            result: [],

            events: {},

            getHTML: function()
            {
                var frag = document.createDocumentFragment();

                _.each(this.result, function(result)
                {
                    frag.appendChild(
                        new CandidateView(
                            {
                                model: new FriendModel(
                                    {
                                        fb_id: result.uid,
                                        name: result.name,
                                        picture: result.pic_big
                                    }
                                )
                            }
                        ).render().el
                    );
                });

                return frag;
            },

            setSearch: function(search)
            {
                this.search = search;

                return this;
            },

            setResult: function(result)
            {
                this.result = result;

                return this;
            },

            empty: function()
            {
                this.$el.empty();
            },

            update: function()
            {
                log(moduleName, 'result', this.result, 'search', this.search);

                if (!this.search) return this.empty();

                var frag = document.createDocumentFragment(),
                    needFBRendering = true;

                if (!this.result.length)
                {
                    log(moduleName, 'results empty');
                    frag.appendChild(new EmptyResultsView({search: this.search}).render().el)
                    needFBRendering = false;
                }
                else
                {
                    log(moduleName, 'has results');
                    for (var i = 0, l = this.result.length; i < l; i++)
                    {
                        log(moduleName, this.result[i]);
                        var found = this.$('.fb_candidate[data-uid="' + this.result[i].uid + '"]');
                        log(moduleName, found);

                        if (!found.length)
                        {
                            log(moduleName, 'is new');
                            frag.appendChild(
                                new CandidateView(
                                {
                                    model: new FriendModel(
                                    {
                                        fb_id: this.result[i].uid,
                                        name: this.result[i].name,
                                        picture: this.result[i].pic_big
                                    }),
                                    extraClass: 'keep'
                                }).render().el
                            );
                        }
                        else
                        {
                            log(moduleName, 'is already here');
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

                // if (needFBRendering) this.postRender();
            },

            render: function()
            {
                this.$el.html(this.getHTML());

                return this;
            },

            postRender: function()
            {
                log(moduleName, 'postRender ...');
                Facebook.render(this.el);
            }
        });

        return ResultsView;
    });
})();