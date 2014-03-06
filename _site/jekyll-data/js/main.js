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

$(document).ready(function(){
    var height,width;
    
    $('a').click(function(){
        
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
        ga('send', 'event', 'link', 'load', this.href);
        return false;
    });
});