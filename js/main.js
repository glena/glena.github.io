var height,width,resume;
$(document).ready(function(){
    $('a').click(function(){
        
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
        ga('send', 'event', 'link', 'load', this.href);
        return false;
    });

    height = $(document).height();

    $('#about-me')
        .css('padding-top', function(e){
            return height/2 - $(this).height() / 2;
        })
        .css('padding-bottom', function(e){
            return height/2 - $(this).height() / 2;
        });

    width = $(document).width();
    var svgHeight = height * 0.8;

    if (width < 900) width = 900;
    
    if (svgHeight < 600) 
    {
        svgHeight = 600;
    }    
    else
    {
        $('#experience')
            .css('padding-top', function(e){
                return height/2 - svgHeight / 2;
            })
            .css('padding-bottom', function(e){
                return height/2 - svgHeight / 2;
            });
    }

    resume = new d3Resume({
      width: width,
      height: svgHeight,
      wrapperSelector: "#experience",
      dataUrl: '/data/resume.json'
    });

});


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