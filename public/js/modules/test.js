require(['jquery'], function($)
{
    $(function()
    {
        $('.cube div').click(function()
        {
            $(this.parentNode).toggleClass('show-right');
        })
    });
});