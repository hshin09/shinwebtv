function play()
{
   var a=document.getElementsByClassName('vjs-big-play-button')[0];
   alert(a);
   a.click();
}

﻿window.onload = function(){
   alert('start');
   play();
} 
