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

    if (width < 900) width = 900;
    if (height < 600) height = 600;

    resume = new d3Resume({
      width: width,
      height: height,
      wrapperSelector: "#experience",
      dataUrl: '/data/resume.json'
    });

});

