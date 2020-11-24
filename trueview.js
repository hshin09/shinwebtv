var init = true;

function play()
{
   if(init) {
      if(!isTouchScreenMode) {
         document.getElementsByClassName('vjs-big-play-button')[0].dispatchEvent(new MouseEvent('click'));
         document.getElementsByClassName('vjs-live-status vjs-live-status-live')[0].dispatchEvent(new MouseEvent('click'));
      }
      init = false;
      window.onkeydown = keychk;
      document.getElementsByClassName('vjs-custom-control-spacer vjs-spacer ')[0].addEventListener( "click", function()
      {
         document.getElementsByClassName('vjs-poster')[0].dispatchEvent(new MouseEvent('click'));
         window.trueView.showMsg("hideTrueView");
      }, true );
      document.getElementsByClassName('body')[0].addEventListener( "click", function()
      {
         document.getElementsByClassName('vjs-poster')[0].dispatchEvent(new MouseEvent('click'));
         window.trueView.showMsg("hideTrueView");
      }, true );
   }
   document.getElementsByClassName('vjs-big-play-button')[0].dispatchEvent(new MouseEvent('click'));
   document.getElementsByClassName('vjs-live-status vjs-live-status-live')[0].dispatchEvent(new MouseEvent('click'));
}

function keychk(e) {
   if(e.which >= 37 && e.which <= 40) {
      document.getElementsByClassName('vjs-poster')[0].dispatchEvent(new MouseEvent('click'));
      window.trueView.showMsg("hideTrueView");
      if(e.which ==37)
         window.trueView.showMsg("webView:onleft()");
      else if(e.which == 38)
         window.trueView.showMsg("webView:onup()");
      else if(e.which == 39)
         window.trueView.showMsg("webView:onright()");
      else if(e.which == 40)
         window.trueView.showMsg("webView:ondown()");
   } else if( e.which == 13) {
      document.getElementsByClassName('vjs-big-play-button')[0].dispatchEvent(new MouseEvent('click'));
      document.getElementsByClassName('vjs-live-status vjs-live-status-live')[0].dispatchEvent(new MouseEvent('click'));
   }
   e.preventDefault();
}

window.onload = function()
{
   document.getElementsByTagName('iframe')[1].parentNode.remove();
   setTimeout(function(){ play(); }, 500);
   document.getElementsByClassName('vjs-big-play-button')[0].dispatchEvent(new MouseEvent('click'));
   document.getElementsByClassName('vjs-poster')[0].dispatchEvent(new MouseEvent('click'));
}
