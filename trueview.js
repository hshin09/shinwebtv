
var init = true;
function play()
{
   if(init) {
      init = false;
      window.trueView.showMsg("msg:init2");
      document.getElementsByTagName('body')[0].addEventListener( "click", function()
      {
         window.trueView.showMsg("msg:click");
      }, true );
   }
   document.getElementsByClassName('vjs-big-play-button')[0].click();
}

window.onload = function()
{
}

