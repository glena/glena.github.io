var prevScrollPos = null;
(function() {
    $( window ).scroll(function(e) {
        var scrollPos = $( window ).scrollTop();

        if (scrollPos > prevScrollPos)
        {
            $('#btt').addClass('slide-reset').removeClass('slide-down');
        }
        else if (scrollPos < prevScrollPos)
        {
            $('#btt').addClass('slide-down').removeClass('slide-reset');
        }

        prevScrollPos = scrollPos;
    });
}());