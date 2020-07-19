
var init = true;
function play()
{
   if(init) {
      init = false;
      window.trueView.showMsg("msg:init");
      document.getElementsByClassName('vjs-tech')[0].addEventListener( "click", function()
      {
         window.trueView.showMsg("msg:dbclick");
      }, true );
   }
   document.getElementsByClassName('vjs-big-play-button')[0].click();
}

window.onload = function()
{
}

