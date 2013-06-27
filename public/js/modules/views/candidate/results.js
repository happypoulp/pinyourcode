(function()
{
    var moduleName = 'views/candidate/results';

    define([
            'facebook',
            'models/friend',
            'views/candidate/item',
            'views/candidate/empty'
        ], function(Facebook, FriendModel, CandidateView, EmptyResultsView)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var ResultsView = Backbone.View.extend({

            name: moduleName,

            tagName: 'ul',
            id: 'fb_search_results',

            search: '',
            UIDs: [],
            results: [],

            events: {},

            setSearch: function(search)
            {
                this.search = search;

                return this;
            },

            setResults: function(results)
            {
                this.results = results;

                return this;
            },

            empty: function()
            {
                this.$el.empty();
                this.UIDs = [];
                this.results = [];
            },

            update: function()
            {
                log(moduleName, 'result', this.results, 'search', this.search);

                if (!this.search)
                {
                    this.clean();
                    this.empty();
                    return;
                }

                this.needFBRendering = true;

                var hasNewResults = false,
                    that = this,
                    resultUIDs = _.map(this.results, function(candidate){ return candidate.uid; });

                log(moduleName, 'resultUIDs', resultUIDs);

                if (!this.results.length)
                {
                    log(moduleName, 'results empty');

                    this.clean()
                        .renderChild(new EmptyResultsView({search: this.search}), {meth: 'html', target: this.$el});

                    this.needFBRendering = false;
                }
                else
                {
                    log(moduleName, 'has results');

                    var newUIDs = [],
                        removeChildren = [],
                        alreadyPresentUIDs = [];

                    log(moduleName, 'current UIDS', this.UIDs);

                    // current page has no result, remove potential "empty message"
                    if (!this.UIDs.length)
                    {
                        log(moduleName, 'CLEAR current result content.');
                        this.clean()
                            .$el.empty();
                    }
                    else
                    {
                        log(moduleName, 'children', this.children.length, 'resultUIDs', resultUIDs);
                        _.each(this.children, function(child)
                        {
                            log(moduleName, 'child', child, child.model);
                            if (child.model)
                            {
                                var UID = child.model.get('fb_id');
                                log(moduleName, 'UID', UID, resultUIDs.indexOf(UID));
                                if (resultUIDs.indexOf(UID) == -1)
                                {
                                    log(moduleName, child.model.get('name'), 'not present in results, remove it');
                                    removeChildren.push(child);
                                    that.UIDs.splice(that.UIDs.indexOf(UID), 1)
                                }
                                else
                                {
                                    log(moduleName, child.model.get('name'), 'already present');
                                    alreadyPresentUIDs.push(UID);
                                }
                            }
                        });
                    }

                    _.each(removeChildren, function(child)
                    {
                        child.remove();
                    });

                    var newUIDs = _.difference(resultUIDs, alreadyPresentUIDs);

                    if (newUIDs.length)
                    {
                        _.each(this.results, function(result)
                        {
                            if (newUIDs.indexOf(result.uid) == -1) return;

                            log(moduleName, 'add child', result);

                            that.renderChild
                            (
                                new CandidateView(
                                    {
                                        model: new FriendModel(
                                            {
                                                fb_id: result.uid,
                                                name: result.name,
                                                picture: result.pic_big,
                                                picture_small: result.pic_square
                                            }
                                        )
                                    }
                                )
                            , {meth: 'prepend', target: that.$el});
                        });

                        this.needFBRendering = true;
                    }
                }
                this.UIDs = resultUIDs;
            },

            render: function()
            {
                var that = this,
                    renderDeferred = $.Deferred(),
                    childPromises = [];

                if (!this.results.length)
                {
                    log(moduleName, 'results empty');

                    childPromises.push(this.renderChild(new EmptyResultsView({search: this.search})));
                    this.needFBRendering = false;
                }
                else
                {
                    var resultUIDs = _.map(this.results, function(candidate){ return candidate.uid; });

                    _.each(this.results, function(result)
                    {
                        childPromises.push(
                            that.renderChild
                            (
                                new CandidateView(
                                    {
                                        model: new FriendModel(
                                            {
                                                fb_id: result.uid,
                                                name: result.name,
                                                picture: result.pic_big,
                                                picture_small: result.pic_square
                                            }
                                        )
                                    }
                                )
                            )
                        );
                    });

                    this.UIDs = resultUIDs;

                    this.needFBRendering = true;
                }


                $.when.apply($, childPromises).then(function()
                {
                    renderDeferred.resolve();
                });

                return renderDeferred;
            }
        });

        return ResultsView;
    });
})();