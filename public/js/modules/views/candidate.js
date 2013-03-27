(function()
{
    var moduleName = 'views/candidate',
        moduleDependencies = [
            'backbone',
            '/js/modules/templates/candidate.js'
        ];

    log(moduleName, "define - Dependencies: ", moduleDependencies.join(', '));

    define(moduleDependencies, function(Backbone, CandidateTemplate)
    {
        log(moduleName, "Dependencies loaded", "Build module");

        var CandidateView = Backbone.View.extend({

            tagName: 'li',
            className: 'fb_candidate',

            events:
            {
                'click': 'add'
            },

            add: function(ev)
            {
                ev.stopPropagation();
                console.log('add logged');
                this.model.save();
                // console.log(this.model.destroy(
                // {
                //     success: function()
                //     {
                //         $(ev.target).closest('.fb_friend').remove();
                //     },
                //     error: function()
                //     {
                //         console.log('ERROR!');
                //     }
                // }));
            },

            toHTML: function()
            {
                return CandidateTemplate({candidate: this.model.attributes});
            },

            render: function()
            {
                this.$el
                    .attr('data-uid', this.model.get('fb_id'))
                    .html(this.toHTML());

                return this;
            }
        });

        return CandidateView;
    });
})();