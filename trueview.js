var init = true;

function play()
{
   if(init) {
      init = false;
      window.onkeydown = keychk;
      document.getElementsByClassName('vjs-custom-control-spacer vjs-spacer ')[0].addEventListener( "click", function()
      {
         window.trueView.showMsg("hideTrueView");
      }, true );
   }
   document.getElementsByClassName('vjs-big-play-button')[0].click();
}

function keychk(e) {
   if(e.which == 13 ) {
      window.trueView.showMsg("hideTrueView");
   }
   e.preventDefault();
}

window.onload = function()
{
}

