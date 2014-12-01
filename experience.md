---
layout: page
title:  Experience &amp; Studies
permalink: /experience/
---

<script type="text/javascript" src="{{ "/assets/js/min/sha1.js" | prepend: site.baseurl  }}"></script>
<script type="text/javascript" src="{{ "/assets/js/min/d3.v3.min.js" | prepend: site.baseurl  }}"></script>
<script type="text/javascript" src="{{ "/assets/js/min/d3resume.all.min.js" | prepend: site.baseurl  }}"></script>

<div id="experience"></div>

<script>
$(document).ready(function(){
    var height = $(window).height();
    var width = $(window).width();
    var svgHeight = 700;
    var container = $('#experience');

    if (width < 900) width = 900;

    container
        .css('left', function(e){
          return (-1 * (width - container.parent().width()) / 2) + 'px';
        });

    var resume = new d3Resume({
      width: width,
      height: svgHeight,
      wrapperSelector: "#experience",
      dataUrl: '/assets/data/resume.json',
      getItemFillCollor: getItemFillCollor
    });
});
</script>
