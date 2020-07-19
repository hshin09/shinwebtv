function play()
{
   window.trueView.showMsg("msg:play");
   document.getElementsByClassName('vjs-big-play-button')[0].click();
}

window.onload = function(){
   play();
   window.trueView.showMsg("showTrueView()");
}


