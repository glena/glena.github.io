function pad(b,d){for(var c=b+"";c.length<d;)c="0"+c;return c}
function shuffle(b){for(var d=b.length,c,e;d--;)e=Math.random()*d|0,c=b[d],b[d]=b[e],b[e]=c;return b}
for(var images=[],a=1;17>=a;a++)images.push("../img/image"+pad(a,3)+".jpg");
images=shuffle(images);
$.backstretch(images,{duration:4000,fade:750});