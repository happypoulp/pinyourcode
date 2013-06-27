(function()
{
    var moduleName = 'views/candidate/item';

    define([
            'templates/candidate/item'
        ], function(CandidateTemplate)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var CandidateView = Backbone.View.extend({

            name: moduleName,

            tagName: 'li',
            className: 'fb_candidate list-item',

            events:
            {
                'click': 'add'
            },

            add: function(ev)
            {
                ev.stopPropagation();
                this.model.save(null, {
                    success: function()
                    {
                        document.location.hash = '/';
                    }
                });
            },

            render: function()
            {
                this.$el
                    .attr('data-uid', this.model.get('fb_id'))
                    .addClass(this.options.extraClass)
                    .html(CandidateTemplate({candidate: this.model.attributes}));

                return this;
            }
        });

        return CandidateView;
    });
})();