/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".post-content").fitVids();

        // Calculates Reading Time
        $('.post-content').readingTime({
            readingTimeTarget: '.post-reading-time',
            wordCountTarget: '.post-word-count',
        });

        // Creates Captions from Alt tags
        $(".post-content img").each(function() {
            // Let's put a caption if there is one
            if($(this).attr("alt"))
              $(this).wrap('<figure class="image"></figure>')
              .after('<figcaption>'+$(this).attr("alt")+'</figcaption>');
        });

    });

}(jQuery));

function sha1Hash (str) {
  return CryptoJS.SHA1(str).toString(CryptoJS.enc.Hex);
}

function hex (x, n) {
  var leadingZeroes = Array(n).join('0');
  return (leadingZeroes + x.toString(16)).substr(-n);
}

function getItemFillCollor (element) {
  var hex6 = hex(sha1Hash(element.title), 6);
  return '#' + hex6.split("").reverse().join("");
}
