$(document).ready(function(){
	checkHash();

	$('a').click(function(){
	    ga('send', 'event', 'link', 'load', this.href);
	});
});
function checkHash()
{
	var hash = window.location.hash;
	ga('send', 'event', 'link', 'click', hash);
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
        '#about-me':{
            selector:'.main'
        },
        '#experience':{
            selector:'.resume'
        }
    };
    var page = pages[hash];
    if (page != undefined)
    {
        $('article').hide();
        $(page.selector).show();
    }
}