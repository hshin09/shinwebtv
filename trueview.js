
var init = true;
function play()
{
   if(init) {
      init = false;
      window.trueView.showMsg("msg:init");
      document.getElementsByClassName('vjs-custom-control-spacer vjs-spacer ')[0].addEventListener( "click", function()
      {
         window.trueView.showMsg("msg:click");
      }, true );
   }
   document.getElementsByClassName('vjs-big-play-button')[0].click();
}

window.onload = function()
{
}

