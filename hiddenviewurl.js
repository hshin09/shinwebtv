var tvplayer;

function loadTV(ch)
{ 
   tvplayer.setAttribute('src',ch); 
}

function make()
{ 
   tvplayer=document.createElement('iframe');
   tvplayer.setAttribute('id','player');
   document.body.appendChild(tvplayer); 
}

make();
