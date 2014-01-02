$(document).ready(function(){
	checkHash();

	$('a').click(function(){
		_gaq.push(['_trackEvent', 'link', 'click', this.href]);
	    //ga('send', 'event', 'link', 'click', this.href);
	});
});
function checkHash()
{
	var hash = window.location.hash;
	_gaq.push(['_trackEvent', 'link', 'click', hash]);
	//ga('send', 'event', 'link', 'click', hash);
    loadArticle(hash);
}
function showArticle(url)
{
    var hash = '#' + url.split('#').pop();
    loadArticle(hash);
}
function loadArticle(hash)
{
    var pages = {
        '#about-me':'.main',
        '#experience':'.resume',
    };
    var selector = pages[hash];
    if (selector != undefined)
    {
        $('article').hide();
        $(selector).show();
    }
}