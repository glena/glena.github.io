var height,width,resume;

$(document).ready(function(){

	$('a').click(function(){
	    ga('send', 'event', 'link', 'load', this.href);
	});

    //$('body').scrollspy({ target: '.navbar-top' });

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

