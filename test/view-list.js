require(
    ['views/list'],
    function(ListView)
    {
        var v = new ListView({el: $('#fb_search_results')});
        console.log(v.el);
    }
);