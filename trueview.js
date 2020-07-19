
var init = true;
function play()
{
   if(init) {
      init = false;
      window.trueView.showMsg("trueView:init");
      document.getElementsByClassName('vjs-tech')[0].addEventListener( "dbclick", function()
      {
         window.trueView.showMsg("hideTrueView");
      } );
   }
   document.getElementsByClassName('vjs-big-play-button')[0].click();
}

window.onload = function()
{
}

