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
   alert('play');
   setTimeout(function(){ document.getElementsByClassName('vjs-big-play-button')[0].click(); },500 );
   setTimeout(function(){ document.getElementsByClassName('vjs-live-status vjs-live-status-live')[0].click(); },500 );
}

function keychk(e) {
   if(e.which == 38 || e.which == 48 || e.which == 13) {
      window.trueView.showMsg("hideTrueView");
   }
   e.preventDefault();
}

window.onload = function()
{
}

