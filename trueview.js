var init = true;

function changeUrl(url)
{
   location.href = url;
}

function play()
{
   if(init) {
      init = false;
      window.onkeydown = keychk;
      document.getElementsByClassName('vjs-custom-control-spacer vjs-spacer ')[0].addEventListener( "click", function()
      {
         window.trueView.showMsg("hideTrueView");
      }, true );
      document.getElementsByClassName('body')[0].addEventListener( "click", function()
      {
         window.trueView.showMsg("hideTrueView");
      }, true );
   }
   document.getElementsByClassName('vjs-poster')[0].dispatchEvent(new MouseEvent('click'));
   //document.getElementsByClassName('vjs-live-status vjs-live-status-live')[0].click();
}

function keychk(e) {
   if(e.which == 38 ) {
      window.trueView.showMsg("hideTrueView");
   } else if( e.which == 13) {
      document.getElementsByClassName('vjs-poster')[0].dispatchEvent(new MouseEvent('click'));
      //document.getElementsByClassName('vjs-live-status vjs-live-status-live')[0].click()
   }
   e.preventDefault();
}

window.onload = function()
{
   //window.trueView.showMsg("msg:onload function");
   setTimeout(function(){ play(); }, 500);
   //document.getElementsByTagName('iframe')[1].parentNode.remove();
   //document.getElementsByClassName('vjs-poster')[0].dispatchEvent(new MouseEvent('click'));
}

